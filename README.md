# IslamGPT : The first AI Chatbot grounded in Islamic Sources

[Try it here](https://islam-gpt-indol.vercel.app/)

## What is it
This is a Chatbot grounded in Islamic sources. It can answer questions about the Quran, Hadiths, or Seerah of the Prophet SAW and will return all the source documents.

## How it works

The `scrips/ingest.ts` script will load all the sources from the web/directory, chunk them, embed them using OpenAI's eda modal then upsert them to Pinecone.

The api uses Langchain and gpt-3.5. The Langchain chain will first formulate a question using the current user's question, and the chat history (using gpt-3.5). 
Using that question, it'll query Pinecone for the four most relevant sources.
The final chain will again use gpt-3.5 to return an answer to the user based on the source documents.

The project is built using Next.js and deployed using Vercel.com


## Credit

Frontend of this repo is inspired by [langchain-chat-nextjs](https://github.com/zahidkhawaja/langchain-chat-nextjs)

Big help with the front end from [Aman Ali](https://github.com/Amaan630)

Skeleton forked from https://www.youtube.com/watch?v=ih9PBGVVOO4
