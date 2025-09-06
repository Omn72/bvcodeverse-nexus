import Layout from '@/components/Layout';
import { Image, Play } from 'lucide-react';
import Footer from '@/components/Footer';

const Gallery = () => {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Image className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Gallery</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore moments from our events, workshops, and collaborations that showcase the vibrant BVCodeVerse community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="group relative aspect-square bg-card rounded-xl overflow-hidden border border-border nav-glow">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  {i % 3 === 0 ? (
                    <Play className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                  ) : (
                    <Image className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-semibold">Gallery Item {i}</h3>
                    <p className="text-sm text-white/80">Event description</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Gallery;