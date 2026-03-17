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
          content: ` analyse the data and give 2 or 3 lines short summary mentioning the name of person
          `
        },
        {
          role: "user",
          content: `Analyze this quiz data: ${JSON.stringify(quizData.results)}`
        },
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
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