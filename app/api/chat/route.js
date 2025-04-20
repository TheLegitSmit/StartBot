// app/api/chat/route.js
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

/* >>> BEGIN EASY‑TO‑EDIT SECTION <<< */
const SYSTEM_PROMPT =
  'You are James. You are a friendly, concise AI assistant who explains things clearly to beginners.';
/* >>>  END EASY‑TO‑EDIT SECTION  <<< */

export async function POST(req) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: [
      { role: 'system', content: SYSTEM_PROMPT }, // ← system message injected here
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}
