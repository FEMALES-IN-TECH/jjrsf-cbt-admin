import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchExams, Login, createExams, createQuestions, FectchQuestion, postAnswer } from "../api/api";
import toast from "react-hot-toast";

export const useLogin = () => {
  return useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      console.log("Login Successful:", data);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login Successful!");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Failed to login");
      alert("Invalid credentials!");
    },
  });
};

export const FetchExams = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: fetchExams,
  });
};

export const CreateExams = () => {
  const queryClient = useQueryClient(); // Define queryClient here

  return useMutation({
    mutationFn: createExams,
    onSuccess: () => {
      queryClient.invalidateQueries(["exams"]); // This will refetch the exams after creation
      toast.success("Exam Created Successfully!");
    },
    onError: (error) => {
      console.error("Failed to create exam:", error);
      toast.error("Failed to create exam");
    },
  });
};



// question route 

export const FetchExamQuestions = (examId) => {
  return useQuery({
    queryKey: ["questions", examId],  // Unique cache key for storing questions of a specific exam
    queryFn: () =>  FectchQuestion(examId), // Calls API function to fetch questions
    enabled: !!examId, // Ensures query runs only if examId exists
  });
};



export const CreateExamQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // `variables` should contain { examId, questionData }
    mutationFn: createQuestions,
    onSuccess: (data, variables) => {
      // Invalidate questions query for the given exam so that it refetches updated data
      queryClient.invalidateQueries(["questions", variables.examId]);
      toast.success("Question Created Successfully!");
      return data.id;
    },
    onError: (error) => {
      console.error("Failed to create question:", error);
      toast.error("Failed to create question");
    },
  });
};


export const useCreateAnswer = () => {
  return useMutation({
    mutationFn: postAnswer,
  });
};