import * as dotenv from 'dotenv';

dotenv.config({
  'path':"../.env"
});

import axios from 'axios';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { pinecone } from '@/utils/pinecone-client';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { PINECONE_INDEX_NAME } from '@/config/pinecone';



export const run = async () => {
  try {
    ///////////////////// Quran /////////////////////////////
    // Source: https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/en/index.json
    
    const loadQuran = process.env.LOAD_QURAN && process.env.LOAD_QURAN=='true'
    if (loadQuran)
  {

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
      surah.verses.forEach((verse: { translation: string; id: any; }) => {
        allVerses.push(new Document({
          "pageContent": "Quran: " + verse.translation,
          "metadata": {
            'source': `Quran: ${surah.transliteration} (${verse.id})`,
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

    /*create and store the embeddings in the vectorStore*/
    console.log('creating vector store...');

    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); 
    
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
    });
  } else { console.log("Did not load Quran")}

    ///////////////////// Bukhari ///////////////////////////
    // Source: https://github.com/essaji/Complete-Sahih-Bukhari-Json/blob/master/sahih_bukhari.json
    const loadBukhari = process.env.LOAD_BUKHARI && process.env.LOAD_BUKHARI=='true'
    if (loadBukhari)
    {
    console.log("Reading Bukhari...")

    const bukhariUrl: string = 'https://raw.githubusercontent.com/essaji/Complete-Sahih-Bukhari-Json/master/sahih_bukhari.json';
    const bukhariResponse = await axios.get(bukhariUrl)
    const bukhariDump = bukhariResponse.data 
    
    let allHadiths: Document[] = [];
    for (let volume of bukhariDump) {
        for (let book of volume.books) {
            for (let hadith of book.hadiths) {
                allHadiths.push(
                  new Document({
                    "pageContent": "Hadith: " + hadith.text,
                    "metadata": {
                      'source': `Sahih Bukhari: ${hadith.by} (${hadith.info})`,
                      'location': hadith.info,
                      'by': hadith.by
                    }
                  })
                );
            }
        }
    }

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 512,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(allHadiths);

    console.log("Loading into pinecone...")

    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); 
    
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
    });
  } else { console.log("Did not load Sahih Bukhari") }

  ///////////////////// Ibn-Hisham ///////////////////////////
  // Source: https://asimiqbal2nd.wordpress.com/
  const loadHisham = process.env.LOAD_IBN_HISHAM && process.env.LOAD_IBN_HISHAM=='true'
  if (loadHisham)
  {
    console.log("Reading Ibn-Hisham...")

    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader('docs', {
      '.pdf': (path) => new PDFLoader(path),
    });
    const rawDocs = await directoryLoader.load();

    // Clean docs
    let cleanDocs: Document[] = []
    rawDocs.forEach(doc=>{
      cleanDocs.push(
        new Document({
          pageContent: 'Seerah: ' + doc.pageContent.replace(/\n/g, ''),
          metadata: {
            source: `Ibn Hisham: ${doc.metadata.loc.pageNumber}`,
            pageNumber: doc.metadata.loc.pageNumber
          }
      }))
    })

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 512,
      chunkOverlap: 50,
    });
    const docs = await textSplitter.splitDocuments(cleanDocs);

    console.log("Uploading to Pinecone...")

    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); 
    
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
    });

  } else { console.log("Did not load Ibn Hisham Seerah")}


  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
