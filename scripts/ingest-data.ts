import * as dotenv from 'dotenv';

dotenv.config({
  'path':"../.env"
});

import axios from 'axios';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { pinecone } from '@/utils/pinecone-client';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { PineconeStore } from 'langchain/vectorstores/pinecone';


export const run = async () => {
  try {
    
    ///////////////////// Quran /////////////////////////////

    // Load all suras
    console.log("Reading the Quran...")
    const directoryResponse = await axios.get('https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/en/index.json');
    const directory = directoryResponse.data;

    const allSuras = await Promise.all(directory.map(async (x: { link: string }) => {
        const suraResponse = await axios.get(x.link);
        return suraResponse.data;
    }));

    // Break up into verses and load metadata
    const allVerses: Document[] = []
    allSuras.forEach(surah=>{
      surah.verses.forEach(verse => {
        allVerses.push(new Document({
          "pageContent": verse.translation,
          "metadata": {
            'surah (chapter)': `${surah.transliteration} (${surah.translation})`,
              'surah number': surah.id,
              'verse number': verse.id,
          }
        }))
      })
    })

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 256,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(allVerses);
    console.log('split docs', docs[0]);

    /*create and store the embeddings in the vectorStore*/
    console.log('creating vector store...');

    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); 
    
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
