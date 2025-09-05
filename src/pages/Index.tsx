import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import CollegeBranding from '@/components/CollegeBranding';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CollegeBranding />
      <Features />
      <CTA />
      <Footer />
    </Layout>
  );
};

export default Index;
