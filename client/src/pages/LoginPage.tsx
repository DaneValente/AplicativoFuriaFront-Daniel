import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import FuriaLogo from "@/components/FuriaLogo";

export default function LoginPage() {
  // Handler for Twitter login
  const handleTwitterLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/twitter';
  };

  // Handler for demo login
  const handleDemoLogin = () => {
    window.location.href = "/api/auth/demo-login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 login-screen relative font-rajdhani">
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>
      
      <div className="z-10 w-full max-w-md">
        <Card className="bg-[#1E1E1E] p-8 rounded-xl border border-gray-700 shadow-lg clip-path-angled">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-2">
              <FuriaLogo size="lg" />
            </div>
            <h1 className="text-4xl font-bold font-russo mb-2">
              <span className="text-white">FURIA</span> 
              <span className="text-gray-300">FAN SCORE</span>
            </h1>
            <p className="text-gray-400 font-inter">Seja reconhecido como um verdadeiro torcedor.</p>
          </div>
          
          <div className="space-y-6">
            <Button 
              onClick={handleTwitterLogin}
              className="w-full bg-[#1DA1F2] hover:bg-blue-600 text-white font-bold py-6 px-4 rounded-md transition duration-300 flex items-center justify-center gap-3 h-auto"
            >
              <i className="fab fa-twitter text-xl"></i>
              <span>ENTRAR COM TWITTER</span>
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#1E1E1E] px-2 text-gray-500">OU</span>
              </div>
            </div>
            
            <Button 
              onClick={handleDemoLogin}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 px-4 rounded-md transition duration-300 flex items-center justify-center gap-3 h-auto"
            >
              <i className="fas fa-user-alt text-xl"></i>
              <span>MODO DEMONSTRAÇÃO</span>
            </Button>
            
            <div className="text-center text-sm text-gray-500 font-inter">
              <p>
                Ao continuar, você concorda com nossos{" "}
                <a href="#" className="text-gray-400 hover:underline">
                  Termos de Serviço
                </a>{" "}
                e{" "}
                <a href="#" className="text-gray-400 hover:underline">
                  Política de Privacidade
                </a>
                .
              </p>
            </div>
          </div>
          

        </Card>
      </div>
    </div>
  );
}
