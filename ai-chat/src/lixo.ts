//import { HumanMessage } from "langchain/schema";
//
//import { ChatOpenAI } from "@langchain/openai";

//const { ChatOpenAI } = require("@langchain/openai");

//import { HumanMessage } from "langchain/schema";
//import 'dotenv/config';
//
//const chatModel = new OpenAI({
//    openAIApiKey: process.env.OPENAI_API_KEY,
//    configuration: {
//        baseURL: "https://apps.aws-london-novaprd1.svc.singlestore.com:8000/modelasaservice/be6256d4-e658-42fc-8c9e-6a84e5bc619b/v1"
//    },
//    modelName: "unsloth/Meta-Llama-3.1-8B-Instruct",
//    maxTokens: 50,
//});
//
//async function main() {
//    const response = await chatModel.call([
//        new HumanMessage("Hello")
//    ]);
//
//    console.log(response.content);
//}
//
//main();
// Initialize the LangChain ChatOpenAI client
//const chatModel = new ChatOpenAI({
//    openAIApiKey: process.env.OPENAI_API_KEY, // Ensure your API key is in the .env file
//    basePath: "https://apps.aws-london-novaprd1.svc.singlestore.com:8000/modelasaservice/be6256d4-e658-42fc-8c9e-6a84e5bc619b/v1", // Custom API path
//    modelName: "unsloth/Meta-Llama-3.1-8B-Instruct", // Specify the model
//    temperature: 0.7, // Optional: Adjust creativity
//    maxTokens: 50 // Optional: Limit response length
//});
//
//async function queryLangChain(prompt) {
//    try {
//        const response = await chatModel.([new HumanMessage(prompt)]);
//        console.log("Response:", response.content);
//    } catch (error) {
//        console.error("Error querying LangChain:", error);
//    }
//}
//// Test the LangChain integration
//queryLangChain("Hello, how are you?");