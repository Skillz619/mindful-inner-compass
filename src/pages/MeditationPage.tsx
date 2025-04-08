
import Layout from '@/components/Layout';
import Meditation from '@/components/Meditation';

const MeditationPage = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <section className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Meditation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find peace in the present moment
            </p>
          </div>
        </section>

        <section className="mb-8">
          <Meditation />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Benefits of Meditation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Reduces Stress</h3>
              <p className="text-muted-foreground">
                Regular meditation has been shown to lower cortisol levels and reduce feelings of anxiety.
              </p>
            </div>
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Improves Focus</h3>
              <p className="text-muted-foreground">
                Meditation trains attention and awareness, helping you stay present and focused.
              </p>
            </div>
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Better Sleep</h3>
              <p className="text-muted-foreground">
                Regular meditation practice can help you fall asleep faster and enjoy deeper rest.
              </p>
            </div>
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Emotional Balance</h3>
              <p className="text-muted-foreground">
                Develop greater awareness of thoughts and feelings without becoming overwhelmed by them.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default MeditationPage;
