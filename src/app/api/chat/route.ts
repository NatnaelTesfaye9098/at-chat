import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: message }],
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return NextResponse.json({ reply: "Error occurred!" }, { status: 500 });
    }

    const data = await response.json();
    console.log('Response data:', data);

    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error('Request failed:', err);
    return NextResponse.json({ reply: "Error occurred!" }, { status: 500 });
  }
}