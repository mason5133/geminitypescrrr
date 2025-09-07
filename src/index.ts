import express, { Request, Response } from "express";
import dotenv from "dotenv";
import GeminiService from "./gemini.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
  console.error("GEMINI_API_KEY is not defined in the .env file");
  process.exit(1);
}

const geminiService = new GeminiService(geminiApiKey);

app.use(express.json());

app.post("/generate", async (req: Request, res: Response) => {
  const { prompt } = req.body;
  const generatedText = await geminiService.generateText(prompt);
  res.json({ generatedText });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
