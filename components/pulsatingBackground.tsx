import React, { useEffect } from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    let opacity = 20;
    let increment = 0.1;
    const element = document.querySelector('.soft-glow') as HTMLElement;
    if (!element) return;

    const updateGradient = () => {
      opacity += increment;

      if (opacity >= 50 || opacity <= 20) {
        increment *= -1;
      }

      element.style.backgroundImage = `radial-gradient(60% 35% at 50% 0%, rgb(62 157 236 / ${opacity}%) 0%, rgb(62 157 236 / ${opacity}%) 40%, rgba(168, 203, 235, 0.2) 100%)`;

      requestAnimationFrame(updateGradient);
    };

    requestAnimationFrame(updateGradient);

    return () => {
      element.style.backgroundImage = '';
    };
  }, []);

  return (
    <header
      style={{ height: '75vh' }}
      className="min-h-128 top-0 w-vh bg-white soft-glow"
    >
      {children}
    </header>
  );
}
