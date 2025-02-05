import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const QuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voted, setVoted] = useState(false);
  const [percentages, setPercentages] = useState({ option1: 50, option2: 50 });

  // Fetch question data
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${id}`);
        setQuestion(response.data);
        setVoted(false); // Reset voting state for new question
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  // Update vote percentages when question state updates
  useEffect(() => {
    if (question) {
      updatePercentages(question.votes);
    }
  }, [question]);

  const updatePercentages = (votes) => {
    const total = votes.option1 + votes.option2;
    setTotalVotes(total);
    if (total > 0) {
      setPercentages({
        option1: Math.round((votes.option1 / total) * 100),
        option2: Math.round((votes.option2 / total) * 100),
      });
    }
  };

  // Handle voting
  const handleVote = async (selectedOption) => {
    if (voted) return;
    setVoted(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/vote/${id}`,
        { option: selectedOption }
      );

      setQuestion(response.data.updatedQuestion);
      updatePercentages(response.data.updatedQuestion.votes);

      // Wait for 3 seconds before navigating to the next question
      setTimeout(() => {
        if (response.data.nextQuestion) {
          navigate(`/question/${response.data.nextQuestion._id}`);
        }
      }, 2000);
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

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
        <h1 className="text-2xl md:text-5xl font-extrabold text-red-700 px-4">
          {"WOULD YOU RATHER"}
        </h1>
        <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent w-3/4 mx-auto" />
      </div>

      {/* Options Container */}
      <div className="flex-1 flex relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />

        {/* Option 1 */}
        <div className="flex-1 flex items-center justify-center p-8 hover:bg-opacity-10 hover:bg-blue-500 transition-all group">
          <button
            className={`w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl ${
              voted ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleVote("option1")}
            disabled={voted}
          >
            <div className="text-2xl md:text-3xl font-semibold text-blue-600 group-hover:text-blue-700">
              {question.option1}
            </div>
            {voted && (
              <p className="mt-2 text-gray-700 font-extrabold text-2xl">
                {percentages.option1}% of users agree
              </p>
            )}
          </button>
        </div>

        {/* Option 2 */}
        <div className="flex-1 flex items-center justify-center p-8 hover:bg-opacity-10 hover:bg-green-500 transition-all group">
          <button
            className={`w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl ${
              voted ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleVote("option2")}
            disabled={voted}
          >
            <div className="text-2xl md:text-3xl font-semibold text-green-600 group-hover:text-green-700">
              {question.option2}
            </div>
            {voted && (
              <p className="mt-2 text-gray-700 font-extrabold text-2xl">
                {percentages.option2}% of users agree
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
