// app/page.js
'use client';
import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { ArrowUpCircle } from 'lucide-react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <main className="flex flex-col items-center w-full max-w-md min-h-screen py-6 mx-auto">
      {/* Boilerplate text users can edit */}
      <h1 className="text-3xl font-bold mb-1">My Minimal AI Chatbot</h1>
      <p className="text-gray-500 mb-6">Built with Next.js and OpenAI</p>

      {/* Conversation window */}
      <div className="flex-1 w-full overflow-y-auto border rounded p-4 mb-4 bg-white dark:bg-zinc-900">
        {messages.map(m => (
          <div
            key={m.id}
            className={`mb-2 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-3 py-2 max-w-xs whitespace-pre-wrap text-sm ${
                m.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-zinc-800'
              }`}
            >
              {m.parts.map((p, i) => (p.type === 'text' ? <span key={i}>{p.text}</span> : null))}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input box */}
      <form onSubmit={handleSubmit} className="w-full flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything…"
          className="flex-1 p-2 border rounded shadow"
        />
        <button
          type="submit"
          disabled={isLoading || input.length === 0}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-2 disabled:opacity-50"
        >
          <ArrowUpCircle className="w-5 h-5" />
        </button>
      </form>
    </main>
  );
}
