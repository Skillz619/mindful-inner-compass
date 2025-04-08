
import { useState } from 'react';
import Layout from '@/components/Layout';
import MoodTracker from '@/components/MoodTracker';
import Meditation from '@/components/Meditation';
import Journal from '@/components/Journal';
import Breathing from '@/components/Breathing';
import Resources from '@/components/Resources';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('mood');

  return (
    <Layout>
      <section className="mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to your <span className="text-gradient">Inner Compass</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Tools for mindfulness, reflection, and mental wellbeing
          </p>
        </div>
      </section>

      <section className="mb-8">
        <MoodTracker />
      </section>

      <section>
        <Tabs defaultValue="meditation" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="meditation" className="animate-fade-in">
            <Meditation />
          </TabsContent>
          <TabsContent value="journal" className="animate-fade-in">
            <Journal />
          </TabsContent>
          <TabsContent value="breathing" className="animate-fade-in">
            <Breathing />
          </TabsContent>
          <TabsContent value="resources" className="animate-fade-in">
            <Resources />
          </TabsContent>
        </Tabs>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Daily Check-In</CardTitle>
            <CardDescription>Monitor your mental state</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Regular check-ins help you understand your emotional patterns and triggers.
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Mindfulness Practice</CardTitle>
            <CardDescription>Live in the moment</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Mindfulness can reduce stress and anxiety while improving focus and well-being.
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Self-Care Routines</CardTitle>
            <CardDescription>Take care of your mental health</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Establishing healthy routines helps maintain balance and resilience.
            </p>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
};

export default Index;
