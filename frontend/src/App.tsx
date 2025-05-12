import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/components/AuthProvider";
import { SidebarProvider } from "@/components/Sidebar";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyRegistration from "./pages/VerifyRegistration";
import NotFound from "./pages/NotFound";
import DashboardPage from "./components/DashboardPage";
import AnalyticsPage from "./components/AnalyticsPage";
import AutomationPage from "./components/AutomationPage";
import IntegrationPage from "./components/IntegrationPage";
import PricingPage from "./components/PricingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <SidebarProvider>
            <BrowserRouter>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/verify" element={<VerifyRegistration />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/automation" element={<AutomationPage />} />
                  <Route path="/integration" element={<IntegrationPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
          </SidebarProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
