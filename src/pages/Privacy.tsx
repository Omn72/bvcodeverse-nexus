import Layout from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-6">
            Welcome to the official website of the Coding Club, Bharati Vidyapeeth’s College of Engineering Lavale, Pune. By accessing or using this website, you agree to the following terms and conditions:
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Use of Content</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>All content (articles, resources, event details, media) is provided for educational and informational purposes only.</li>
                <li>You may share content with proper credit to the Coding Club.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Membership & Participation</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Event registrations, contests, and workshops are open only to eligible students as defined by the club’s rules.</li>
                <li>Participants are expected to maintain integrity and fairness in all coding contests and activities.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Logos, designs, and original content belong to the Coding Club. Unauthorized use is not permitted.</li>
                <li>External resources or tools mentioned belong to their respective owners.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Liability Disclaimer</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>The Coding Club is not responsible for any technical issues, data loss, or damages arising from the use of this website or participation in events.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
