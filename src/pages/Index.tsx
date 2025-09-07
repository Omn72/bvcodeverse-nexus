import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import AboutUs from '@/components/CollegeBranding';
import BVCodeVerseTimeline from '@/components/BVCodeVerseTimeline';
import CTA from '@/components/CTA';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <AboutUs />
      <BVCodeVerseTimeline />
      <CTA />
    </Layout>
  );
};

export default Index;
