import { useRef, useState, useEffect } from 'react';
import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';
import { Message } from '@/types/chat';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '@/components/ui/LoadingDots';
import WelcomeModal from '@/components/ui/welcomeModal';
import { Document } from 'langchain/document';
import { Spinner } from '@/components/ui/Spinner';

import Head from 'next/head';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(true);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
      {
        message: 'Salam, ask me any question on Islam.',
        type: 'apiMessage',
      },
    ],
    history: [],
  });

  const { messages, history, pending: updatingMessageState } = messageState;

  const lastMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  //handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    setError(null);

    if (!query) {
      alert('Please input a question');
      return;
    }

    const question = query.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
    }));

    setLoading(true);
    setQuery('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
        }),
      });
      const data = await response.json();
      console.log('data', data);

      if (data.error) {
        setError(data.error);
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: data.text,
              sourceDocs: data.sourceDocuments,
            },
          ],
          history: [...state.history, [question, data.text]],
        }));
      }
      console.log('messageState', messageState);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      console.log('error', error);
    }
  }

  //prevent empty submissions
  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key == 'Enter') {
      e.preventDefault();
    }
  };

  const clearHistory = () => {
    setMessageState({
      messages: [
        {
          message: 'Salam, ask me any question on Islam.',
          type: 'apiMessage',
        },
      ],
      history: [],
    })
  }

  useEffect(() => {
    //scroll to bottom
    lastMessageRef.current?.scrollIntoView(true);
  }, [messageState])

  return (
    <>
      <Head>
        <title>Islamicly</title>
      </Head>
      <WelcomeModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Layout>
        <div className="mx-auto flex flex-col gap-4 nav border-0">
          <main className={styles.main}>
            <div className="w-full pb-36">
              <div className="w-full h-full divide-y divide-gray-200 dark:divide-gray-700">
                {messages.map((message, index) => {
                  let icon;
                  let className;

                  const baseStyles = "w-full px-6 py-4 animate text-gray-600 dark:text-gray-300";
                  const isLastMessage = index === messages.length - 1;
                  const waiting = loading && isLastMessage;

                  if (message.type === 'apiMessage') {
                    icon = (
                      <div className="bg-green-600 p-1.5 rounded-sm text-white">
                        <svg className="w-5 aspect-square" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path clipRule="evenodd" fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"></path>
                        </svg>
                      </div>
                    );
                    className = styles.apimessage;
                    className = baseStyles;
                  } else {
                    icon = (
                      <div className="bg-purple-600 p-1.5 rounded-sm text-white">
                        <svg className="w-5 aspect-square" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"></path>
                        </svg>
                      </div>
                    );
                    className = baseStyles + ' bg-white dark:bg-gray-700';
                  }
                  return (
                    <div ref={isLastMessage ? lastMessageRef : null} key={`chatMessage-${index}`}>
                      <div className={className}>
                        <div className='flex gap-4 text-left items-start max-w-4xl mx-auto'>
                          {waiting ?
                            <div className="bg-gray-300 dark:bg-gray-500 p-1.5 rounded-sm flex items-center justify-center">
                              <Spinner />
                            </div> : icon}
                          <div className={styles.markdownanswer}>
                            <ReactMarkdown linkTarget="_blank">
                              {message.message}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                      {message.sourceDocs && (
                        <div
                          className="text-gray-500 dark:text-gray-400 px-4 max-w-4xl mx-auto"
                          key={`sourceDocsAccordion-${index}`}
                        >
                          <Accordion
                            type="single"
                            collapsible
                            className="flex-col"
                          >
                            {message.sourceDocs.map((doc, index) => (
                              <div key={`messageSourceDocs-${index}`}>
                                <AccordionItem value={`item-${index}`}>
                                  <AccordionTrigger>
                                    <h3 className="text-left">{doc.metadata.source}</h3>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ReactMarkdown linkTarget="_blank">
                                      {doc.pageContent}
                                    </ReactMarkdown>

                                  </AccordionContent>
                                </AccordionItem>
                              </div>
                            ))}
                          </Accordion>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="fixed bottom-5 flex flex-col items-center">
              <button className="py-2 px-3 text-sm rounded-md border border-gray-400 dark:border-gray-500 mb-4 text-gray-900 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600 hover:bg-gray-200"
                onClick={clearHistory}>
                {updatingMessageState && <Spinner />}
                Clear history
              </button>

              <div className="relative">
                <form onSubmit={handleSubmit}>
                  <input
                    disabled={loading}
                    onKeyDown={handleEnter}
                    ref={inputRef}
                    autoFocus={false}
                    maxLength={512}
                    id="userInput"
                    name="userInput"
                    placeholder={
                      loading
                        ? 'Waiting for response...'
                        : 'Where is patience discussed in the Quran?'
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-[90vw] md:w-[60vw] shadow-xl mx-auto py-4 px-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-lg outline-0 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.generatebutton}
                  >
                    {loading ? (
                      <div className={styles.loadingwheel}>
                        <LoadingDots color="#000" />
                      </div>
                    ) : (
                      // Send icon SVG in input field
                      <svg
                        viewBox="0 0 20 20"
                        className={styles.svgicon}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    )}
                  </button>
                </form>
              </div>
            </div>
            {error && (
              <div className="w-full px-6 py-4 animate text-gray-600 dark:text-gray-300 bg-red-50 dark:bg-red-900 border-y border-red-400 dark:border-red-700">
                <p className="max-w-4xl mx-auto text-red-600 dark:text-white">{error}</p>
              </div>
            )}
          </main>
        </div>
        {/* <footer className="m-auto p-4">
          <a href="https://twitter.com/mayowaoshin">
            Powered by LangChainAI. Demo built by Mayo (Twitter: @mayowaoshin).
          </a>
        </footer> */}
      </Layout>
    </>
  );
}
