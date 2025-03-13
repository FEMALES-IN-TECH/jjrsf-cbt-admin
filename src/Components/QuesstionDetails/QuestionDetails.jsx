import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Data from "../../Data/Data";
import "../QuesstionDetails/QuestionDetails.css";

const QuestionDetails = () => {
  const { id } = useParams();
  const questionData = Data.find((item) => item.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(questionData.question);
  const [editedOptions, setEditedOptions] = useState([...questionData.options]);
  const [selectedAnswer, setSelectedAnswer] = useState(questionData.answer);

  const handleQuestionChange = (e) => {
    setEditedQuestion(e.target.value);
  };

  const handleOptionChange = (index, newValue) => {
    const updatedOptions = [...editedOptions];
    updatedOptions[index] = newValue;
    setEditedOptions(updatedOptions);
  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSaveClick = () => {
    questionData.question = editedQuestion;
    questionData.options = editedOptions;
    questionData.answer = selectedAnswer;
    setIsEditing(false);
  };

  if (!questionData) {
    return <div className="question-not-found">Question not found.</div>;
  }

  return (
    <div className="question-details-container">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedQuestion}
            onChange={handleQuestionChange}
            className="question-input"
          />
          <ul className="question-options">
          {editedOptions.map((option, index) => (
            <li key={index} className="option-item">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="option-input"
            />
              </li>
            ))}
          </ul>

          <div className="correct-answer-section">
            <label className="correct-answer-label">Pick Correct Answer:</label>
            <div className="correct-answer-options">
              {editedOptions.map((option, index) => (
                <label key={index} className="answer-option">
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={handleAnswerChange}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="correct-answer-btn">
            Correct Answer is: {selectedAnswer}
          </button>
        </>
      ) : (
        <>
          <h2 className="question-title">{questionData.question}</h2>
          <ul className="question-options">
            {questionData.options.map((option, index) => (
              <li
                key={index}
                className={`option-item ${
                  option === questionData.answer
                    ? "correct-answer-highlight"
                    : ""
                }`}
              >
                {option}
              </li>
            ))}
            <p className="correct-answer">
              <strong>Correct Answer:</strong> {questionData.answer}
            </p>
          </ul>
        </>
      )}

      <div className="edit-buttons">
        {isEditing ? (
          <button className="save-btn" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionDetails;
