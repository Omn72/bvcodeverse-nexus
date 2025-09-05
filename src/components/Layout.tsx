import { ReactNode } from 'react';
import Navigation from './Navigation';
import TestNav from './TestNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-black">
      <TestNav />
      <Navigation />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;