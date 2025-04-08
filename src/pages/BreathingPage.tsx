
import Layout from '@/components/Layout';
import Breathing from '@/components/Breathing';

const BreathingPage = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <section className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Breathing Exercises</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Calm your mind and body through conscious breathing
            </p>
          </div>
        </section>

        <section className="mb-8">
          <Breathing />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">The Power of Breath</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Your breath is a powerful tool that can influence your mental and physical state. By controlling
            your breathing, you can activate your parasympathetic nervous system and induce a relaxation response.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Stress Reduction</h3>
              <p className="text-muted-foreground">
                Deep breathing exercises lower stress hormones and help calm an anxious mind.
              </p>
            </div>
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Improved Focus</h3>
              <p className="text-muted-foreground">
                Controlled breathing increases oxygen to your brain, enhancing cognitive function.
              </p>
            </div>
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Better Sleep</h3>
              <p className="text-muted-foreground">
                Breathing exercises before bed can help you fall asleep faster and sleep more soundly.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BreathingPage;
