import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Exam/CreateExam.css";
import { CreateExams} from "../../Hooks/hooks"
import toast from "react-hot-toast";

const CreateExam = () => {
  const [name, setQuestion] = useState("");
  const [duration, setDuration] = useState(60); // Default 60 mins
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
   const {mutate, isPending} =  CreateExams()

    const handleSave = () => {
    const formattedStartTime = startTime.toISOString(); // Formats to "YYYY-MM-DDTHH:mm:ssZ"
    const formattedEndTime = endTime.toISOString(); 
  
    console.log("Saved Exam Details:", {
      name:name,
      duration:duration,
      start_time:startTime.toISOString(),
      end_time:endTime.toISOString(),
    });
  
    mutate(
      { name, duration, start_time: formattedStartTime, end_time: formattedEndTime },
      {
        onSuccess: () => {
          toast.success("Exam Saved!");
        },
      }
    );
  };
  

  return (
    <div className="exam-container">
      <div className="exam-card">
        <h2 className="exam-title">Create Exam</h2>

        {/* Question Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question here"
          className="exam-input"
          required
        />

        {/* Duration Input */}
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (minutes)"
          className="exam-input"
          min="1"
          required
        />

        {/* Start Time Picker */}
        <label className="exam-label">Start Time:</label>
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          dateFormat="Pp"
          className="datepicker-input"
        />

        {/* End Time Picker */}
        <label className="exam-label">End Time:</label>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          dateFormat="Pp"
          className="datepicker-input"
        />

        <div className="button-group">
          <button onClick={handleSave} className="save-btn">Save</button>
          <Link to="" className="next-btn">
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
