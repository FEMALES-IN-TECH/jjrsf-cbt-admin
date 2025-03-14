import React, { useState } from "react";
import "../OptionsPage/Options.css"; // Import CSS file
import { useParams } from "react-router-dom";

const Options = () => {
  const {id} = useParams()
  const [option, setOption] = useState("");
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (option.trim() === "" || answer.trim() === "") {
      return alert("Option and Answer cannot be empty!");
    }

    let token = localStorage.getItem("token");
    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }
    token = token.replace(/^"(.*)"$/, "$1");

    try {
      console.log(option, answer, isCorrect, "info"); // Debugging

      const response = await fetch(
        `https://jjrsf-cbt-api.onrender.com/api/v1/clacbt_questions/${id}/clacbt_answers?question_id=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body:JSON.stringify({
            clacbt_answer: {
              clacbt_answer: {
                option: option.trim(), 
                answer_text: answer.trim(),
                correct: isCorrect,
              },
            },
          }),
        }
      );

      const result = await response.json();
      console.log("Response:", result);
      alert("Answer submitted successfully!");
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Submission failed!");
    }
  };

  return (
    <div className="options-container">
      <h2 className="title">Add Answer</h2>

      <form onSubmit={handleSubmit}>
        <label className="label">Option:</label>
        <input
          type="text"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          placeholder="Enter option (e.g., A, 1, True)"
          className="input-box"
        />

        <label className="label">Answer:</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter answer"
          className="input-box"
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isCorrect}
            onChange={() => setIsCorrect(!isCorrect)}
            className="checkbox"
          />
          Correct Answer
        </label>

        <button type="submit" className="submit-btn">Submit Answer</button>
      </form>
    </div>
  );
};

export default Options;
