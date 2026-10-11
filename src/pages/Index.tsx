import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import AboutUs from '@/components/CollegeBranding';
import BVCodeVerseTimeline from '@/components/BVCodeVerseTimeline';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <AboutUs />
      <BVCodeVerseTimeline />
      <Footer />
    </Layout>
  );
};

export default Index;
