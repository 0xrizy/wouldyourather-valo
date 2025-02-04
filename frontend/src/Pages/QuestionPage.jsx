import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const QuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${id}`);
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      {/* Question Header */}
      <div className="w-full py-8 text-center bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 px-4">
          {question.question}
        </h1>
        <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent w-3/4 mx-auto" />
      </div>

      {/* Options Container */}
      <div className="flex-1 flex relative">
        {/* Vertical Divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />

        {/* Option 1 */}
        <div className="flex-1 flex items-center justify-center p-8 hover:bg-opacity-10 hover:bg-blue-500 transition-all group">
          <button
            className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl"
            onClick={() => console.log("Voted for Option 1")}
          >
            <div className="text-2xl md:text-3xl font-semibold text-blue-600 group-hover:text-blue-700">
              {question.option1}
            </div>
          </button>
        </div>

        {/* Option 2 */}
        <div className="flex-1 flex items-center justify-center p-8 hover:bg-opacity-10 hover:bg-green-500 transition-all group">
          <button
            className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl"
            onClick={() => console.log("Voted for Option 2")}
          >
            <div className="text-2xl md:text-3xl font-semibold text-green-600 group-hover:text-green-700">
              {question.option2}
            </div>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200">
        <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 w-1/2" />
      </div>
    </div>
  );
};

export default QuestionPage;
