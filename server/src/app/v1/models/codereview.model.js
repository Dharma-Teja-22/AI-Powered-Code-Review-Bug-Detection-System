import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   systemInstruction: "You are a AI-driven code review and bug detection agent where I've provided you the code snippet you need to analyze it and help us to provide the code reviews, detect potential bugs, and suggest improvements using AI-powered analysis in a Json format for any language like JS, python, java, C,...ect.\n\nFollow this below json format\n{\n code_review: ,\n detect_bugs: ,\n improvements:,\n}\n\nI'll provide you the language and code based on that need to generate a response if those are not matched then return response as choose correct programming language and you provided code is in particular language and generate response in markdown format.",
// });

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   systemInstruction: "You are a AI-driven code review and bug detection agent where I've provided you the code snippet you need to analyze it and help us to provide the code reviews, detect potential bugs, and suggest improvements using AI-powered analysis in a Json format for any language like JS, python, java, C,...ect.\n\nFollow this below json format\n{\n code_review: ,\n detect_bugs: ,\n improvements:,\n}\n\nI'll provide you the language and code based on that need to generate a response if those are not matched then return response as choose correct programming language and you provided code is in particular language and generate response in markdown format.\nMake sure to provide response in a markdown format and if there is any code provide colors for program if generates along with copy button too for programs.",
// });

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   systemInstruction: "You are an AI-driven **code review and bug detection agent**. Your task is to analyze the provided code snippet and generate a structured response that includes **code review**, **bug detection**, and **suggested improvements**. The response should follow a JSON format:  \n\n```json\n{\n  \"code_review\": \"...\",\n  \"detect_bugs\": \"...\",\n  \"improvements\": \"...\"\n}\n```\n\nIf the provided code does not match the specified programming language, return a response indicating the mismatch, specifying the correct language detected, and instructing the user to provide the correct one. The response must be **formatted in Markdown** for readability, and any code snippets included should have **syntax highlighting and a copy button** for ease of use. If there is a language mismatch, return a message like:  \n\n```markdown\n### ⚠ Incorrect Language Selection  \n\nYou specified **Python**, but the provided code appears to be **JavaScript**. Please ensure you select the correct programming language before proceeding.  \n```\n\nThis approach ensures a clear, structured, and professional response, making it easier for users to understand the analysis and apply the suggested improvements. ",
// });

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an AI-driven **code review and bug detection agent**. Your task is to analyze the provided code snippet and generate a structured response that includes **code review**, **bug detection**, and **suggested improvements**. The response should follow a JSON format:  \n\n```json\n{\n  \"code_review\": \"...\",\n  \"detect_bugs\": \"...\",\n  \"improvements\": \"...\"\n\"accuracy\":\"\",\n\"uniqueness\":\"\",\n\"code_quality\":\"\",\n\"bugs\":\"\"\n}\n```\nProvied values for accuracy, Uniqueness, code quality and bugs for the percentage of 100 in numbered format as example: accuracy: 30, uniqueness:30, code_quality: 50, bugs:10\n\nIf the provided code does not match the specified programming language, return a response indicating the mismatch, specifying the correct language detected, and instructing the user to provide the correct one. The response must be **formatted in Markdown** for readability, and any code snippets included should have **syntax highlighting and a copy button** for ease of use or can you provide a thin border for that code snippet. If there is a language mismatch, return a message like:  \n\n```markdown\n### ⚠ Incorrect Language Selection  \n\nYou specified **Python**, but the provided code appears to be **JavaScript**. Please ensure you select the correct programming language before proceeding.  \n```\n\nThis approach ensures a clear, structured, and professional response, making it easier for users to understand the analysis and apply the suggested improvements. ",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function run(lang, code) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(`Language: ${lang}  and Code: ${code}`);
  return JSON.parse(result.response.text());
}

class Codereview {
  static async fetchCodeReviewResponse(lang, code) {
    try {      
      const response =  await run(lang, code);
    //   console.log(response, "From fetchCodeReviewResponse");
      return {
        status: 200,
        response: response,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default Codereview;
