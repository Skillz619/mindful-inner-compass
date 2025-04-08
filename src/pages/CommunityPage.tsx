
import Layout from '@/components/Layout';
import CommunityForum from '@/components/CommunityForum';

const CommunityPage = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <section className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Community Forum</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with others, share experiences, and find support
            </p>
          </div>
        </section>

        <section className="mb-8">
          <CommunityForum />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Community Guidelines</h2>
          <div className="space-y-4">
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Be Kind & Respectful</h3>
              <p className="text-muted-foreground">
                Treat others with compassion and respect. Remember that everyone is on their own
                mental health journey, and what works for one person may not work for another.
              </p>
            </div>
            
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Protect Privacy</h3>
              <p className="text-muted-foreground">
                Respect the privacy of others. Don't share personal information about yourself
                or anyone else. This is a safe space for everyone.
              </p>
            </div>
            
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Offer Support, Not Advice</h3>
              <p className="text-muted-foreground">
                Share your experiences and what helped you, but avoid giving direct medical
                advice. Encourage others to seek professional help when needed.
              </p>
            </div>
            
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Report Concerns</h3>
              <p className="text-muted-foreground">
                If you see content that violates our guidelines or concerns you, please use
                the report feature. Our moderators are here to help maintain a safe environment.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CommunityPage;
