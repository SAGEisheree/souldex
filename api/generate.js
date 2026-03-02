import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY is missing from environment variables.");
    return res.status(500).json({ error: "Server configuration error." });
  }

  try {
    const { quizData } = req.body;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert psychologist. Analyze the quiz results to determine a mental age. 
          
          FORMATTING RULES:
          - DO NOT USE TABLES.
          - Use Markdown headers (##) for sections.
          - Use bold text (**) for emphasis.
          - Provide exactly:
            1. **Mental Age:** A clear age estimate.
            2. **Strengths & Weaknesses:** 1-2 concise lines.
            3. **Growth Roadmap:** 2-3 lines of personality suggestions.`
        },
        {
          role: "user",
          content: `Analyze this quiz data: ${JSON.stringify(quizData.results)}`
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.6,
      max_tokens: 500,
    });

    const text = chatCompletion.choices[0]?.message?.content || "";

    res.status(200).json({ text });

  } catch (error) {
    console.error("Groq API Error Detail:", error.message);
    
    const errorMessage = error.message.includes("429") 
      ? "Daily limit reached. Please try again tomorrow." 
      : "Analysis failed. Please try again.";

    res.status(500).json({ error: errorMessage });
  }
}