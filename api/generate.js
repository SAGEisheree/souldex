// api/generate.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai"; 


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemma-3-12b-it" });

  try {
    const { quizData } = req.body;

    const customPrompt = `
      Review the following quiz results: ${JSON.stringify(quizData.results)}
      On the basis of this data, estimate the mental age of the person.
      Give the response in short. Use Markdown for formatting.
    `;

    const result = await model.generateContent(customPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Analysis failed on the server." });
  }
}