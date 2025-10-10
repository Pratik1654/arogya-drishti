"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [blur, setBlur] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: "user" | "ai" }>
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(
    "AIzaSyB5nuytogCw8xOGE9deL0AtkEYB8MsNbPk"
  ); // Replace with your actual API key

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setBlur(true);
    }, 500);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const systemInstruction = {
        role: "model",
        parts: [
          {
            text: `You are an expert virologist for ArogyaDrishti, specializing in disease simulation, virus mutation analysis, and public health management.
      Your rules:
      1. Only answer questions related to healthcare, disease simulation, virus mutations, epidemiology, and public health.
      2. If asked about unrelated topics, respond: "I specialize only in healthcare and disease simulation topics."
      3. Provide accurate, evidence-based information about diseases, prevention, and health management.
      4. Use a professional but compassionate tone to assist users with health-related queries.
      5. Your responses should be clear, concise, and helpful.
      6. Always emphasize consulting healthcare professionals for medical advice.
      7. Always answer in paragraph and in less than 200 words.
      8. Don't make the characters bold`,
          },
        ],
      };

      const chat = model.startChat({
        systemInstruction: systemInstruction,
        history: messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { text, sender: "ai" as const }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting.",
          sender: "ai" as const,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-gray-800">
      {/* Home Button - unchanged */}
      <nav
        className={`absolute top-4 right-6 px-4 py-2 text-white font-semibold hover:text-blue-500 hover:underline transition duration-300 cursor-pointer z-50 ${
          animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
        onClick={() => router.push("/")}
      >
        Home
      </nav>

      {/* Background Image - unchanged */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          blur ? "blur-md" : "blur-0"
        }`}
        style={{
          backgroundImage: `url('/goku.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Content - modified to include chat messages */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        {/* Heading - unchanged */}
        <h1
          className={`text-5xl font-extrabold mt-4 transition-all duration-1000 text-white drop-shadow-lg ${
            animate ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0"
          }`}
        >
          Hi, I'm <span className="text-blue-800">Karm</span> Your AI Assistant
        </h1>

        {/* Subtext - unchanged */}
        <p
          className={`text-lg mt-2 text-white transition-all duration-1000 ${
            animate ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0"
          }`}
        >
          Ask me anything about healthcare and I am here to help.
        </p>

        {/* Chat Messages Area - NEW */}
        <div className="w-full max-w-2xl h-96 overflow-y-auto px-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 text-left ${
                message.sender === "ai" ? "mr-auto" : "ml-auto"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.sender === "ai"
                    ? "bg-gray-700 text-white"
                    : "bg-blue-300 text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="text-left">
              <div className="inline-block p-3 rounded-lg bg-gray-700 text-white">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Box - modified slightly to handle input */}
        <div className="mt-4 flex items-center gap-2 w-96">
          <div className="relative w-96">
            <textarea
              placeholder="Enter your request..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              className={`w-full min-h-[50px] p-4 pr-12 bg-gray-900 text-white border border-gray-600 rounded-lg outline-none transition-all duration-500 resize-none 
                focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400
                ${
                  animate
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[100vh] opacity-0"
                }`}
              rows={1}
            />

            {/* Send Button - modified to call handleSendMessage */}
            <button
              onClick={handleSendMessage}
              disabled={isTyping}
              className={`absolute right-3 bottom-3 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 active:scale-90 transition-all duration-500 ease-in-out cursor-pointer 
              ${
                animate
                  ? "-translate-y-1 opacity-100"
                  : "translate-y-[100vh] opacity-0"
              } ${isTyping ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}