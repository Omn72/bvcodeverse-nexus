import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="content-visibility-auto overflow-x-hidden">
        {children}
      </main>
  <Footer />
    </div>
  );
};

export default Layout;