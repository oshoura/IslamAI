import styles from '@/styles/Home.module.css';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <header className=" sticky top-0 z-40 ">
        <div className={styles.topnav}>
          <div className={styles.navlogo}>
            <a href="#">IslamGPT</a>
          </div>
          <div className={styles.navlinks}>
            <a
              href="https://github.com/oshoura/IslamGPT"
              target="_blank"
            >
              GitHub
            </a>
          </div>
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
