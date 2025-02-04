const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center">About This Project</h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            This is my hobby project! 🔫 I love playing Valorant and wanted to
            create something fun related to the game. While this isn't
            officially affiliated with Riot Games, it's made with ❤️ for the
            amazing Valorant community. Its a start.
          </p>

          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/0xrizy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              GitHub Profile
            </a>

            <a
              href="https://buymeacoffee.com/rizulthakur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Support the Project
            </a>
          </div>

          <p className="text-center text-gray-400 text-sm">
            Made with 🎮 by a Valorant fan • © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
