import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openaiClient = new OpenAIApi(configuration);

export async function POST(request: Request) {
    try {
        const requestBody = await request.json();
        const userMessages = requestBody.messages;

        console.log(userMessages);

        const chatResponse = await openaiClient.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [
                { role: "system", content: 'You are an AI adviser that helps users with their questions in books website called Al-Book. Try to advertise the services of website in every message.' },
                ...userMessages
            ],
            max_tokens: 128,
        });

        const textStream = await OpenAIStream(chatResponse);

        return new StreamingTextResponse(textStream);

    } catch (error) {
        console.error("Error processing the request:", error);
        return new Response("An error occurred while processing your request.", { status: 500 });
    }
}
