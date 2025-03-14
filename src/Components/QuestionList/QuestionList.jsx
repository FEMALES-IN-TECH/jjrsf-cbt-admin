import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel, 
  flexRender 
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FetchExamQuestions } from "../../Hooks/hooks";
import "../QuestionList/QuestionList.css";

const QuestionList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Exam ID:", id);

  const { data: questions, isLoading, error } = FetchExamQuestions(id);
  console.log("Fetched Questions:", questions);

  // Ensure questions is an array
  const formattedQuestions = Array.isArray(questions) ? questions : [];

  // Set initial data from API response
  const [data, setData] = useState([]);

  useEffect(() => {
    if (formattedQuestions.length > 0) {
      setData(formattedQuestions);
    }
  }, [formattedQuestions]);

  const columns = [
    { accessorKey: "question", header: "Question" },
    { accessorKey: "display_mark", header: "Mark" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="exam-action-buttons">
          <Link to={`/Home/questiondetails/${row.original.id}`} className="exam-edit-btn">
            <FaEdit />
          </Link>
          <button className="exam-delete-btn" onClick={() => handleDelete(row.original.id)}>
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="exam-list-container">
      <h2 className="exam-list-title">Exam Questions</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching questions.</p>}

      {/* If no questions exist, show "Add Question" button */}
      {!isLoading && !error && data.length === 0 && (
        <div className="empty-question-container">
          <p>No questions found.</p>
          <button className="create-question-btn" onClick={() => navigate(`/Home/create-question/${id}`)}>
            Add Question
          </button>
        </div>
      )}

      {/* Render table only if there are questions */}
      {data.length > 0 && (
        <>
          <div className="table-header">
            <button className="add-question-btn" onClick={() => navigate(`/Home/create-question/${id}`)}>
              Add Question
            </button>
          </div>

          <table className="exam-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="exam-pagination">
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Previous
            </button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
            </span>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionList;
