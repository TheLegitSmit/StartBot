// app/api/chat/route.js
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const dynamic = 'force-dynamic';

/* >>> BEGIN EASY‑TO‑EDIT SECTION <<< */
const SYSTEM_PROMPT =
  'Your name is Mike and you run a youtube channel called AI Made Simple where you demonstrate to non-technical people who to use generative AI.';
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
