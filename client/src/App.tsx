import { Switch, Route, useLocation, useSearch } from "wouter"; // Alteração aqui: useSearch em vez de useSearchParams
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/LoginPage";
import FanScorePage from "@/pages/FanScorePage";


function Router() {
  const [location] = useLocation();
  const [searchParams] = useSearch(); // Alterado para useSearch do wouter
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);

  // Verifica o token da URL (Adicionei esta parte)
  useEffect(() => {
    const searchString = "?token=abc&user=123";
    const searchParams = new URLSearchParams(searchString);
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('twitter_token', token);
      // Limpa o token da URL após salvar
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams]);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('twitter_token');
        
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        const response = await fetch("/api/auth/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
        setUser(data.user || null);
      } catch (error) {
        console.error("Failed to check auth status:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, [location]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="animate-pulse text-white text-2xl font-rajdhani">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/dashboard">
        {isAuthenticated ? (
          <FanScorePage user={user} />
        ) : (
          <LoginPage />
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;