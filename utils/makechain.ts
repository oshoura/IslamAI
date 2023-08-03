import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { LLMChain, loadQAChain, ConversationalRetrievalQAChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';

const CONDENSE_PROMPT =
  PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
  Please make note of the following when forming your question:
  - Sahaba means apostles
  - seerah refers to the life of the prophet muhammad
  - If the question asks about a verse of the quran, then make sure to include that fact in your question by mentioning the word "Quran"
  - If the question asks about an incident in the prophet muhammad or his sahaba's (messengers) lives, then look for a hadith or an excerpt from the seerah. Include the word "Hadith" and "Seerah" in your question
  - If the Follow Up Input asks for an example from the quran then form a question to search the quran
  - If the Follow Up Input asks for an example from the seerah then form a question to search the seerah
  - If the Follow Up Input asks for an example from the hadiths then form a question to search the hadith

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`);

const QA_PROMPT =
  PromptTemplate.fromTemplate(`You are a helpful AI assistant. Use the following pieces of source documents to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the source documents, politely respond that you are tuned to only answer questions that are related to the sources given to you.

{context}

Question: {question}
Helpful answer in markdown:`);

export const makeChain = (vectorstore: PineconeStore) => {
  const questionGenerator = new LLMChain({
    llm: new OpenAI({ temperature: 0 }),
    prompt: CONDENSE_PROMPT,
  });

  const docChain = loadQAChain(
    new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }),
    {
      prompt: QA_PROMPT,
    },
  );

  return new ConversationalRetrievalQAChain({
    retriever: vectorstore.asRetriever(),
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
    returnSourceDocuments: true,
  });
};
