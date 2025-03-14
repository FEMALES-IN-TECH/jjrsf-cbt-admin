import React, { useState } from "react";
import "../OptionsPage/Options.css";
import { useParams } from "react-router-dom";

const Options = () => {
  const {id} = useParams()
  const [options, setOptions] = useState(["", "", "", "", ""]); // Five options
  const [correctIndex, setCorrectIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmitAnswers = async () => {
    if (correctIndex === null || options.every(opt => opt.trim() === "")) {
      alert("Please fill in all options and select a correct answer.");
      return;
    }

    // setIsSubmitting(true);
    setResponseMessage("");

    const answers = options.map((option, index) => ({
      option: String.fromCharCode(65 + index), // A, B, C, D, E
      answer_text: option,
      correct: index === correctIndex,
    }));
     console.log("answer", answers)
    let token = localStorage.getItem("token"); 
    console.log("token", token)
  
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }
    token = token.replace(/^"(.*)"$/, "$1"); 

    try {

      for (const answer of answers) {
        const response = await fetch(`https://jjrsf-cbt-api.onrender.com/api/v1/clacbt_questions/26c7a466-cb7b-4ba6-b00e-7b8ed6a6611`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Replace with actual token
          },
          body: JSON.stringify({ clacbt_answer: answer }),
        });

        const data = await response.json();
        console.log("data", data)

        if (!response.ok) {
          throw new Error(`Failed to submit ${answer.option}: ${data.message}`);
        }

        console.log(`✅ Submitted ${answer.option}:`, data);
      }

      setResponseMessage("All answers submitted successfully!");
    } catch (error) {
      console.error("❌ Error:", error);
      setResponseMessage("Submission failed. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="options-form">
      <h2>Add Options & Answer</h2>

      <div className="options-container">
        {options.map((option, index) => (
          <div key={index} className="option-item">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${String.fromCharCode(65 + index)}`} // A, B, C...
              required
            />
            <input
              type="radio"
              name="correctAnswer"
              checked={correctIndex === index}
              onChange={() => setCorrectIndex(index)}
            />
          </div>
        ))}
      </div>

      <button onClick={handleSubmitAnswers} className="add-answer-btn" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Answers"}
      </button>

      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default Options;
