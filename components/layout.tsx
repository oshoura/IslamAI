interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex flex-col bg-gray-100 dark:bg-gray-800 h-screen md:h-full md:min-h-screen overflow-y-scroll md:overflow-visible">
      <header className="sticky top-0 z-40 ">
        <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-start md:items-center md:space-x-8 py-5 px-8 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium">
          <h1 className="font-bold text-lg">Islamicly: Ask Questions About Islam</h1>

          <a href="https://github.com/oshoura/IslamGPT"
             className="text-gray-500 dark:text-gray-400 flex gap-2 items-center"
             target="_blank">
            <svg aria-hidden="true" className="mb-0.5 dark:invert" height="20" version="1.1"
                 viewBox="0 0 16 16" width="20">
              <path fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <span className="hidden sm:block">GitHub</span>
          </a>
        </div>
      </header>

      <main className="flex-1 w-full h-full">
        {children}
      </main>
    </div>
  );
}
