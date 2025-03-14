
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/LoginPage';
import Home from './Components/Home/Home';
import CreateExam from './Components/Exam/CreateExam';
import ExamList from './Components/ExamList/ExamList';
import Options from './Components/OptionsPage/Options';
import AdminHome from './Components/AdminHome/AdminHome';
import QuestionList from './Components/QuestionList/QuestionList';
import QuestionDetails from './Components/QuesstionDetails/QuestionDetails';
import  { Toaster } from 'react-hot-toast';
import { ProtectedRoute, protectedRoute } from './Hooks/IsLogin';
import AddQuestion from './AddQuestion/question';

function App() {
  return (
    <BrowserRouter>
    <Toaster /> 
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Home" element={
      <ProtectedRoute>
      <Home/>
      </ProtectedRoute>
      } >
      <Route index element={<AdminHome/>} />
      <Route path="create-exam" element={<CreateExam/>} />
      <Route path="manage-exam" element={<ExamList/>} />  
      <Route path="options/:id" element={<Options/>} />  
      <Route path="question/:id" element={<QuestionList/>} />  
      <Route path="questiondetails/:id" element={<QuestionDetails/>} />  
      <Route path="create-question/:id" element={<AddQuestion/>} />  
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
