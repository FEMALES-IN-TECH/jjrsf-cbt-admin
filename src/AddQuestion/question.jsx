import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./question.css";
import { CreateExamQuestion } from "../Hooks/hooks";

const AddQuestion = () => {
  const { id } = useParams(); // Exam ID from URL
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [examId, setExamId] = useState(null);
  const [mark, setMark] = useState("");
  const [isSaved, setIsSaved] = useState(false); // Track if the question was saved
  console.log("id", examId)

  const { mutate, isPending } = CreateExamQuestion();
   

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !mark.trim()) {
      alert("Please fill in all fields");
      return;
    }

    mutate(
      { examId: id, question: question, mark: mark }, // Send data to mutation
      {
        onSuccess: (data) => {
          alert("Question added successfully!");
          setExamId(data.id)
          setIsSaved(true); // Mark as saved
        },
        onError: (error) => {
          alert(`Error: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="add-question-container">
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question:</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Mark:</label>
          <input
            type="number"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
            placeholder="Enter mark"
            required
          />
        </div>
        {isSaved ? (
          <button 
            type="button" 
            className="submit-btn" 
            onClick={() => navigate(`/Home/options/${examId}`)}
          >
            Next Page
          </button>
        ) : (
          <button type="submit" className="submit-btn" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddQuestion;
