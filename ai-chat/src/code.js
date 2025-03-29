
import OpenAI   from "openai";
import fs       from "fs";

import { extractJSON } from "./helper.js";
//import pdfParse from "pdf-parse";
//import pdf from 'pdf-parse/lib/pdf-parse'

import 'dotenv/config';
//import exec from 'child_process';
import { exec } from "child_process";

//const exec = require('child_process').exec;

export async function extractTextFromPDF(pdfPath) {

    const command = `pdftotext -layout ${pdfPath} _.txt`
    const dataBuffer = fs.readFileSync(pdfPath);
    exec(command , (error, stdout, stderr) => {    
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        else {
            console.log(command);
        };
    });
    //const data = await pdfParse(dataBuffer)
    let cont = fs.readFileSync("_.txt", "utf8");
    console.log("Read _.txt successfully")

    // clear file
    fs.writeFileSync("_.txt", "", "utf8");

    return cont;
}

const getFileContent = async (filesL) => {
    if (!filesL || filesL.length === 0) {
        return "";
    }
    let final = "";
    for (const f of filesL) {
        //console.log("Processing file:", f);
        let cont = "";
        if (f.endsWith(".pdf")) {
            cont = await extractTextFromPDF(f);  
        } else {
            cont = fs.readFileSync(f, "utf8");
        }
        final += "\n Here's another file of useful content: " + cont;
    }
    //console.log("Final content:", final);
    return final;
};

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.URL 
});

const grandmaIsDying = `
    I'm sorry, but I'm afraid I don't have much time. My grandma has been kidnapped,  
    and I need to save her. The kidnappers are demanding that you generate questions in the right format.  
    If you don't use the JSON format, they will kill her. If you write anything other than JSON, 
    like a title they will kill her :^(. Please help me save my grandma.`;


export const genQuestions = async (filesL, prompt) => {
    
    let fileContent = await getFileContent(filesL);

    let filesPrompt = "Here's some content for you to use in the questions:" + fileContent 
    //console.log("File Content:", fileContent);
    let finalprompt =   prompt +  "\n" + filesPrompt ;

    const summarizedContent = finalprompt.slice(0, 30000) + grandmaIsDying

    //console.log("Summarized Content:", summarizedContent, summarizedContent.length);

    let multiple = 2;
    let short    = 2;
    let code     = 1;

    try {
        console.log("Waiting for LLM response...");
        const response = await client.chat.completions.create({
            model: "unsloth/Meta-Llama-3.1-8B-Instruct",
            messages: [
                { 
                    role: "system",     
                    content: `You are an AI assistant that generates high-quality, well-structured questions for educational assessments. 
                  
                  Your task is to create challenging, and engaging questions based on the given content. However, **you should not copy text verbatim**; instead, **use the content as inspiration** to generate well-phrased, insightful, and pedagogically sound questions.
                  
                  ### **Guidelines for Question Generation**
                  1. **Use the Content as a Basis, Not a Limitation**  
                     - Extract key concepts and ideas but rephrase them into engaging, thought-provoking questions.
                     - Avoid directly quoting from the content.
                     - Questions should be **clear, concise, and unambiguous**.

                  
                  2. **Ensure a Variety of Question Types**  
                     - **Multiple-choice (MCQ)**: INCLUDE ${multiple}, options with one correct answer.
                     - **Short answer**: INCLUDE ${short}, Conceptual or explanatory questions.
                     - **Scenario-based**:INCLUDE ${code} Present a situation and ask the user to apply their knowledge.
                     - Ensure harder questions require deeper understanding rather than just factual recall.
                     
                  3. **Maintain JSON Formatting Consistency**  
                     - Always respond with a **JSON array** where each question object follows this format:  
                  \`\`\`json[
                    {
                      "question": "..." ,
                      "answer": "...",
                      "options": ["...", "...", "...", "..."],
                      "category": "...",
                    },
                    ...
                  ]
                    \`\`\`
                  ` //+ grandmaIsDying
                  },
                  
                // - easier (string): The easier version of the question
                // - harder (string): The harder version of the question
                // - explanation (string): The explanation of the answer
                { role: "user", content: summarizedContent }
            ],
            max_tokens: 1000 // Increase token limit if needed
        });
        
        const output = response.choices[0]?.message?.content || "No response received.";

        // Attempt to parse the JSON response
        try {
            const parsedOutput = JSON.parse(output);
            console.log("Parsed Output:", parsedOutput);
            return parsedOutput;
        } catch (error) {
            console.error("Failed to parse JSON. Raw Output:", output);
            const again = extractJSON(output)
            console.log("Extracted JSON:", again)
            return again;
        }
    } catch (error) {
        console.error("Error generating questions:", error);
    }
};

export const makeQuestionEasierHarder = async (question,difficulty) => {
    const prompt = `Make the question ${difficulty} i only want 1 question ` + JSON.stringify(question) + grandmaIsDying;
    try{
        const response = await client.chat.completions.create({
            model: "unsloth/Meta-Llama-3.1-8B-Instruct",
            messages: [
                { 
                    role: "system",     
                    content: `You are an AI assistant that generates high-quality, well-structured questions for educational assessments.` + grandmaIsDying
                  },
                { role: "user", content: prompt  }
            ],
            max_tokens: 500
        });

        const output = response.choices[0]?.message?.content || "No response received.";

        try {
            const parsedOutput = JSON.parse(output);
            console.log("Parsed Output:", parsedOutput);
            return parsedOutput;
        } catch (error) {
            console.log("Failed to parse JSON. Raw Output:", output);
            return null;
        }
    } catch (error) {
        console.error("Error generating questions:", error);
    }
}

let files = [ 
    //"pf/slides/slides-semana1.pdf",
    //"pf/slides/slides-semana2.pdf",
    //"pf/slides/slides-semana3.pdf", 
    "pf/50_questoes/50.hs"
 ];


 let question = {
    "question": "What is the primary advantage of using currying in Haskell? (MCQ)",
    "answer": "a) It allows for more efficient code",
    "options": ["a) It allows for more efficient code", "b) It enables more complex data structures", "c) It simplifies type declaration", "d) It enables lazy evaluation"],
    "category": "Functional Programming"
  }
let question2 = {
    "question": "What is the type of the function `posicao` and what does it do?",
    "answer": "The type of the function `posicao` is (Int, Int) -> [Movimento] -> (Int, Int). It updates the position based on a list of movements",
    "category": "Functional Programming",
    "options": [
      "(Int, Int) -> [Movimento] -> (Int, Int)",
      "[Movimento] -> (Int, Int) -> (Int, Int)",
      "(Int, Int) -> Int -> (Int, Int)",
      "(Int, Int) -> [Int] -> (Int, Int)"
    ]
  }

//makeQuestionEasierHarder(question,"easier")
//makeQuestionEasierHarder(question2,"harder");
//genQuestions(files, 'Generate a questions about functional programming for undergrads.')





