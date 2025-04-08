
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MeditationPage from "./pages/MeditationPage";
import JournalPage from "./pages/JournalPage";
import BreathingPage from "./pages/BreathingPage";
import ResourcesPage from "./pages/ResourcesPage";
import VirtualPetPage from "./pages/VirtualPetPage";
import CommunityPage from "./pages/CommunityPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/meditation" element={<MeditationPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/breathing" element={<BreathingPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/pet" element={<VirtualPetPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
