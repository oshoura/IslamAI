import styles from '@/styles/Home.module.css';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <header className="sticky fixed-top top-0 z-40 bg-white">
        <div className={`h-16 border-b-slate-200 py-4 ${styles.navbar}`}>
          <nav className="ml-4 pl-6">
            <h1 className="text-white text-large display-1 h1">
              IslamGPT
            </h1>
          </nav>
        </div>
      </header>
      <div>
        <main className="flex w-full flex-1 flex-col overflow-hidden mt-30">
          {children}
        </main>
      </div>
    </div>
  );
}
