import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Team from "./pages/Team";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";

import ProfilePage from "./pages/ProfileModern";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContestApplication from "./pages/ContestApplication";
import ContestsFast from "./pages/ContestsFast";
import ContestsSimple from "./pages/ContestsSimple";
import ContestListDB from "./pages/ContestListDB";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import DatabaseTest from "./pages/DatabaseTest";
import DatabaseDebug from "./pages/DatabaseDebug";
import AdminRoute from "./components/AdminRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contest" element={<ContestListDB />} />
            <Route path="/contests" element={<ContestListDB />} />
            <Route path="/apply-contest" element={<ContestApplication />} />
            <Route path="/database-test" element={<DatabaseTest />} />
            <Route path="/database-debug" element={<DatabaseDebug />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
