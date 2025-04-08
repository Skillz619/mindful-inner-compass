
import Layout from '@/components/Layout';
import Resources from '@/components/Resources';

const ResourcesPage = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <section className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Mental Health Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find help, support, and educational materials
            </p>
          </div>
        </section>

        <section className="mb-8">
          <Resources />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Additional Support Options</h2>
          
          <div className="grid grid-cols-1 gap-6 mt-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">Find a Therapist</h3>
              <p className="text-muted-foreground mb-4">
                Working with a mental health professional can provide personalized strategies and support for your unique needs.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                <li>Consider both in-person and telehealth options</li>
                <li>Look for specialists in your area of concern</li>
                <li>Check if they accept your insurance</li>
                <li>Don't hesitate to try different therapists until you find a good fit</li>
              </ul>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">Support Groups</h3>
              <p className="text-muted-foreground mb-4">
                Connecting with others who have similar experiences can provide validation, understanding, and practical advice.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                <li>Look for both in-person and online groups</li>
                <li>Many organizations offer free or low-cost support groups</li>
                <li>Consider specialized groups for specific conditions or situations</li>
              </ul>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">Self-Help Books and Apps</h3>
              <p className="text-muted-foreground mb-4">
                Evidence-based resources can provide valuable tools for self-management and growth.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                <li>Look for resources written by qualified mental health professionals</li>
                <li>Many therapy apps offer guided exercises and tracking tools</li>
                <li>Libraries often have extensive mental health sections</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ResourcesPage;
