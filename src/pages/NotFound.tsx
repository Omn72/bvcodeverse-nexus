import Layout from '@/components/Layout';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold gradient-text mb-4">404</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Looks like you've ventured into uncharted code territory. Let's get you back to familiar ground.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="btn-neon">
              <a href="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              className="btn-outline-neon"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
