import express, { Request, Response } from "express";
import dotenv from "dotenv";
import GeminiService from "./gemini.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
  process.exit(1);
}

const geminiService = new GeminiService(geminiApiKey);

app.use(express.json());

app.post("/generate", (req: Request, res: Response) => {
  void (async () => {
    try {
      const { prompt } = req.body;
      const generatedText = await geminiService.generateText(prompt);
      res.json({ generatedText });
    } catch (_error) {
      res.status(500).json({ error: "Failed to generate text" });
    }
  })();
});

app.listen(port);

