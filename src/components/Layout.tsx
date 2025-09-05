import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;