import { useNavigate } from "react-router-dom";
import axios from "axios";

function Homepage() {
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    try {
      // Fetch random question from backend API using Axios
      const response = await axios.get("http://localhost:5000/api/v1/random");

      if (response.data?._id) {
        // Navigate to the QuestionPage with the random question ID
        navigate(`/question/${response.data._id}`);
      } else {
        alert("No questions available!");
      }
    } catch (error) {
      console.error("Error fetching random question:", error);
      alert("An error occurred while fetching the question.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/valorant-bg.jpeg"
          alt="Valorant Background"
          className="w-full h-full object-cover opacity-25"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
          Would You Rather for{" "}
          <span className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
            VALORANT
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12">
          Test your tactical preferences in this ultimate game of choices. Face
          thrilling scenarios inspired by Valorant gameplay and see how your
          decisions stack up against the community!
        </p>

        <button
          className="bg-red-500 hover:bg-red-600 px-12 py-4 rounded-full text-xl font-semibold transition-all transform hover:scale-105"
          onClick={handleGetStarted}
        >
          GET STARTED
        </button>
      </div>
    </div>
  );
}

export default Homepage;
