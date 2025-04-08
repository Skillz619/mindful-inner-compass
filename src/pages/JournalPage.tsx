
import Layout from '@/components/Layout';
import Journal from '@/components/Journal';

const JournalPage = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <section className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Journal</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Reflect, process, and grow through writing
            </p>
          </div>
        </section>

        <section className="mb-8">
          <Journal />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Why Keep a Journal?</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Process Emotions</h3>
              <p className="text-muted-foreground">
                Journaling provides a safe space to express and process difficult emotions, helping
                you make sense of your experiences and feelings.
              </p>
            </div>
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Track Patterns</h3>
              <p className="text-muted-foreground">
                Regular journaling helps you identify patterns in your thoughts, feelings, and behaviors,
                giving you insight into your mental health.
              </p>
            </div>
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Cultivate Gratitude</h3>
              <p className="text-muted-foreground">
                Taking time to write about things you're grateful for can shift your focus to the positive
                aspects of your life, improving your overall outlook.
              </p>
            </div>
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Reduce Stress</h3>
              <p className="text-muted-foreground">
                Expressing your thoughts on paper can help release tension and reduce anxiety, creating
                mental clarity and a sense of calm.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default JournalPage;
