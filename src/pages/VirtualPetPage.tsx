
import Layout from '@/components/Layout';
import VirtualPet from '@/components/VirtualPet';

const VirtualPetPage = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <section className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Virtual Pet</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your wellness companion that grows with your self-care habits
            </p>
          </div>
        </section>

        <section className="mb-8">
          <VirtualPet />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">How Your Pet Grows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Daily Care</h3>
              <p className="text-muted-foreground">
                Visit your pet daily to maintain your streak and keep its happiness levels high.
                Consecutive days build your streak!
              </p>
            </div>
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Evolution</h3>
              <p className="text-muted-foreground">
                As you care for your pet and practice self-care activities, your pet will
                grow and evolve through different stages.
              </p>
            </div>
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Activities</h3>
              <p className="text-muted-foreground">
                Complete meditation sessions, journal entries, and breathing exercises to
                earn bonus growth points for your pet.
              </p>
            </div>
            <div className="p-6 bg-calm-50 dark:bg-calm-800/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Benefits</h3>
              <p className="text-muted-foreground">
                Your virtual pet helps you build consistent mental wellness habits while
                providing a fun, visual representation of your progress.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default VirtualPetPage;
