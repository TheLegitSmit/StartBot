// app/page.js
'use client';
import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className="flex flex-col items-center w-full max-w-md py-24 mx-auto">
      {/* Boilerplate text users can edit */}
      <h1 className="text-3xl font-bold mb-1">My Minimal AI Chatbot</h1>
      <p className="text-gray-500 mb-6">
        Built with Next.js and OpenAI
      </p>

      {/* Conversation window */}
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap mb-2">
          <strong>{m.role === 'user' ? 'You:' : 'AI:'}</strong>{' '}
          {m.parts.map((p, i) =>
            p.type === 'text' ? <span key={i}>{p.text}</span> : null
          )}
        </div>
      ))}

      {/* Input box */}
      <form onSubmit={handleSubmit} className="mt-4 w-full">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything…"
          className="w-full p-2 border rounded shadow"
        />
      </form>
    </main>
  );
}
