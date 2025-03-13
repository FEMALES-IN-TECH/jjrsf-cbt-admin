import React from "react";
import "./ExamList.css"; // Import the CSS file
import { Link } from "react-router-dom";
import { FetchExams} from "../../Hooks/hooks";

const ExamList = () => {
  const { data: exams, error, isPending } = FetchExams();

  if (isPending) {
    return (
      <div className="spinner-containers">
        <div className="spinners"></div>
        <p className="loading-texts">Loading...</p>
      </div>
    );
  }

  if (error) return <p>Error loading exams: {error.message}</p>;

  // Ensure exams is an array before mapping
  const examList = Array.isArray(exams) ? exams : [];

  return (
    <div className="exam-list-container">
      <h1>Exams</h1>
      <table className="exam-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Exam Code</th>
            <th>Duration</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {examList.length > 0 ? (
            examList.map(({ id, name, exam_code, duration, start_time, end_time }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{exam_code}</td>
                <td>{duration} min</td>
                <td>{new Date(start_time).toLocaleString()}</td>
                <td>{new Date(end_time).toLocaleString()}</td>
                <td>
                  <button className="view-btn">
                    <Link to={`/Home/question/${id}`}>View</Link>
                  </button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No exams available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExamList;
