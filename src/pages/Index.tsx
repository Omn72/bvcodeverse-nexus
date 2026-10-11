import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import AboutUs from '@/components/CollegeBranding';
import BVCodeVerseTimeline from '@/components/BVCodeVerseTimeline';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <AboutUs />
      <BVCodeVerseTimeline />
      <Footer />
      <CTA />
    </Layout>
  );
};

export default Index;
