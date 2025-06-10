import Chat from '../components/Chat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden">
      <div className="text-center max-w-3xl p-8">
        <div className="flex items-center justify-center mb-6">
          <span className="text-5xl text-white font-extrabold">EcomAI</span>
          <span className="ml-2 text-blue-400">🌐</span>
        </div>
        <h1 className="text-white text-5xl font-extrabold mb-4">Welcome to EcomAI Chatbot</h1>
        <p className="text-gray-200 mb-8 text-lg">An advanced AI-powered chatbot designed to provide expert e-commerce solutions and support.</p>
        <Chat apiUrl="/api/chat" />
        <footer className="text-gray-400 text-sm mt-8 hover:text-gray-300 transition-colors">
          Powered by EcomAI | Developed by Kafait Ullah
        </footer>
      </div>
    </div>
  );
}
