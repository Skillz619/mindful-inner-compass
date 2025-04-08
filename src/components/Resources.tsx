
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Phone, BookOpen, Heart, Lightbulb, HelpCircle } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  category: 'crisis' | 'learn' | 'support';
}

const Resources = () => {
  const resources: Resource[] = [
    {
      title: "National Suicide Prevention Lifeline",
      description: "24/7, free and confidential support for people in distress.",
      link: "https://988lifeline.org",
      icon: <Phone className="h-5 w-5" />,
      category: 'crisis',
    },
    {
      title: "Crisis Text Line",
      description: "Text HOME to 741741 to connect with a Crisis Counselor.",
      link: "https://www.crisistextline.org",
      icon: <Phone className="h-5 w-5" />,
      category: 'crisis',
    },
    {
      title: "Mental Health America",
      description: "Information on mental health conditions and resources.",
      link: "https://www.mhanational.org",
      icon: <BookOpen className="h-5 w-5" />,
      category: 'learn',
    },
    {
      title: "NAMI (National Alliance on Mental Illness)",
      description: "Advocacy, education, support, and public awareness.",
      link: "https://www.nami.org",
      icon: <Heart className="h-5 w-5" />,
      category: 'support',
    },
    {
      title: "Psychology Today",
      description: "Find a therapist in your area.",
      link: "https://www.psychologytoday.com",
      icon: <Lightbulb className="h-5 w-5" />,
      category: 'support',
    },
    {
      title: "HelpGuide",
      description: "Expert, evidence-based mental health information.",
      link: "https://www.helpguide.org",
      icon: <HelpCircle className="h-5 w-5" />,
      category: 'learn',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gradient">Mental Health Resources</CardTitle>
        <CardDescription>Helpful links and resources for additional support</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3">Crisis Support</h3>
          <div className="grid gap-4">
            {resources
              .filter(resource => resource.category === 'crisis')
              .map((resource) => (
                <div key={resource.title} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start">
                    <div className="bg-calm-100 dark:bg-calm-800 p-2 rounded-md mr-3">
                      {resource.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <a 
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 text-calm-500 hover:text-calm-600 mt-1"
                      >
                        Visit <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3">Learning Resources</h3>
          <div className="grid gap-4">
            {resources
              .filter(resource => resource.category === 'learn')
              .map((resource) => (
                <div key={resource.title} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start">
                    <div className="bg-calm-100 dark:bg-calm-800 p-2 rounded-md mr-3">
                      {resource.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <a 
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 text-calm-500 hover:text-calm-600 mt-1"
                      >
                        Visit <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-3">Support Networks</h3>
          <div className="grid gap-4">
            {resources
              .filter(resource => resource.category === 'support')
              .map((resource) => (
                <div key={resource.title} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start">
                    <div className="bg-calm-100 dark:bg-calm-800 p-2 rounded-md mr-3">
                      {resource.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <a 
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 text-calm-500 hover:text-calm-600 mt-1"
                      >
                        Visit <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            If you're experiencing a mental health emergency, please call your local emergency services or go to the nearest emergency room.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Resources;
