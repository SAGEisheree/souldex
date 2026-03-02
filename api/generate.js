
//gemini



// api/generate.js
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleGenAI } from "@google/genai"; 


// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//   const model = genAI.getGenerativeModel({ model: "gemma-3-12b-it" });

//   try {
//     const { quizData } = req.body;

//     const customPrompt = `
//       Review the following quiz results: ${JSON.stringify(quizData.results)}
//       On the basis of this data, estimate the mental age of the person.
//       Give the response in short. Use Markdown for formatting.
//     `;

//     const result = await model.generateContent(customPrompt);
//     const response = await result.response;
//     const text = response.text();

//     res.status(200).json({ text });
//   } catch (error) {
//     console.error("API Error:", error);
//     res.status(500).json({ error: "Analysis failed on the server." });
//   }
// }


//deepseek 


// import OpenAI from "openai";

// // Initialize the DeepSeek client using the OpenAI SDK
// const openai = new OpenAI({
//   baseURL: 'https://api.deepseek.com',
//   apiKey: process.env.DEEPSEEK_API_KEY,
// });

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const { quizData } = req.body;

//     // DeepSeek works best when you separate the "System" personality 
//     // from the "User" data.
//     const completion = await openai.chat.completions.create({
//       model: "deepseek-chat", 
//       messages: [
//         { 
//           role: "system", 
//           content: "You are a professional psychologist. Analyze quiz data to estimate mental age. Keep responses concise and use Markdown." 
//         },
//         { 
//           role: "user", 
//           content: `Review the following quiz results: ${JSON.stringify(quizData.results)}. On the basis of this data, estimate the mental age of the person.` 
//         },
//       ],
//       // Max tokens helps control costs
//       max_tokens: 500,
//     });

//     // DeepSeek response structure: choices[0].message.content
//     const text = completion.choices[0].message.content;

//     res.status(200).json({ text });
//   } catch (error) {
//     // DeepSeek API might throw specific errors (insufficient balance, etc.)
//     console.error("DeepSeek API Error:", error.message);
//     res.status(500).json({ error: "Analysis failed on the server." });
//   }
// }


// groq

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { quizData } = req.body;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert psychologist.Analyse the quiz results and figure out the mental age of the person . The answer should not contain tables. Use simple bulletpoints and different lineweights. The answer should contain : 1.The age 2.strengths and weaknesses in 1 or 2 lines 3.suggesions to imrpove personality in 2 or 3 lines"
        },
        {
          role: "user",
          content: `Analyze this quiz data: ${JSON.stringify(quizData.results)}`
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.7,
      max_tokens: 500,
    });

    const text = chatCompletion.choices[0]?.message?.content || "";

    res.status(200).json({ text });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ error: "Analysis failed on the server." });
  }
}