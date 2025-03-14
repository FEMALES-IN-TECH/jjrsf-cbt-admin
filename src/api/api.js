import axios from "axios";

const API_URL = "https://jjrsf-cbt-api.onrender.com";

export const Login = async (credentials) => {  
  try {
    const response = await axios.post(`${API_URL}/api/v1/login`
      ,
      {
        clacbt_user: {
          email: credentials.email,
          password: credentials.password,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
     console.log(response.data)

    return response.data;
  } catch (error) {
    // toast.error(response.error)
    console.error("Login error:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const fetchExams = async () => {
    try {
        let token = localStorage.getItem("token"); 
        console.log("token", token)

        if (!token) {
            throw new Error("No authentication token found. Please log in.");
        }
        token = token.replace(/^"(.*)"$/, "$1"); 
        const response = await axios.get(`${API_URL}/api/v1/clacbt_exams`, {
            headers: {
                Authorization: `Bearer ${token}`, // Pass token in request
                "Content-Type": "application/json"
            }
        });
         console.log(response , "response")

        return response.data; 
    } catch (error) {
        console.error("Fetch exams error:", error);
        throw error; // Rethrow so React Query can handle it
    }
};


export const createExams = async (credentials) => {
  try {
    let token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    token = token.replace(/^"(.*)"$/, "$1"); // Removes any accidental double quotes

    console.log(token, "token2");

    const response = await axios.post(
      `${API_URL}/api/v1/clacbt_exams`,
      {
        clacbt_exam: {
          name: credentials.name,
          duration: credentials.duration ,
          start_time: credentials.start_time ,
          end_time: credentials.end_time,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Correctly passing token here
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Fetch exams error:", error);
    throw error; // Rethrow so React Query can handle it
  }
};
 

 export const createQuestions = async (credentials) => {
  console.log("credentials", credentials)
  try {
    let token = localStorage.getItem("token"); 
    console.log("token", token)

    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }
    token = token.replace(/^"(.*)"$/, "$1"); 
    const response = await axios.post(`${API_URL}/api/v1/clacbt_exams/${credentials.examId}/clacbt_questions?exam_id=${credentials.examId}`, 
      {
        clacbt_question: {
          question: credentials.question,
          mark: credentials.duration,      
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Correctly passing token here
        },
      }

     
    );
     console.log(response , "response")

    return response.data; 
} catch (error) {
    console.error("Fetch exams error:", error);
    throw error; // Rethrow so React Query can handle it
}
   
  
 }


 
 export const FectchQuestion = async (credentials) => {
  console.log("credentials", credentials)
  try {
    let token = localStorage.getItem("token"); 
    console.log("token", token)

    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }
    token = token.replace(/^"(.*)"$/, "$1"); 
    const response = await axios.get(`${API_URL}/api/v1/clacbt_exams/:clacbt_exam_id/clacbt_questions?exam_id=${credentials}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Pass token in request
            "Content-Type": "application/json"
        }
    });
     console.log(response , "response")

    return response.data; 
} catch (error) {
    console.error("Fetch exams error:", error);
    throw error; // Rethrow so React Query can handle it
}
   
  
 }



 
 export const postAnswer = async (credentials) => {
  console.log("answer info", credentials.id, credentials.clacbt_answer, "credentials", credentials)
  let token = localStorage.getItem("token"); 
  console.log("token", token)

  if (!token) {
      throw new Error("No authentication token found. Please log in.");
  }
  token = token.replace(/^"(.*)"$/, "$1"); 
  const response = await axios.post(`${API_URL}/api/v1/clacbt_questions/${credentials.id}`,
    { clacbt_answer:credentials.clacbt_answer },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response)
  return response.data;
};