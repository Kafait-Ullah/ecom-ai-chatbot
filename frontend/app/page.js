import Chat from "../components/Chat";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to EcomAI Chatbot</h1>
      <p className="text-lg mb-8 text-center">
        This website provides an AI-powered chatbot to answer your e-commerce
        related questions.
      </p>
      <div className="w-full max-w-2xl">
        <Chat />
      </div>
    </div>
  );
}
