import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TierBadge from "@/components/TierBadge";
import ScoreProgressBar from "@/components/ScoreProgressBar";
import FeedbackModal from "@/components/FeedbackModal";
import { 
  getUserTier, 
  formatScoreCategories, 
  getTierBenefits,
  tiers
} from "@/lib/fanScoreUtils";
import { TwitterUser, FanScoreData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface FanScorePageProps {
  user: TwitterUser;
}

export default function FanScorePage({ user }: FanScorePageProps) {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const { toast } = useToast();

  // Fetch fan score data
  const { data: fanScore, isLoading, error } = useQuery<FanScoreData>({
    queryKey: ["/api/fan-score"],
  });

  // Handle logout
  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  // Show error toast if data fetch fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível obter sua pontuação. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Loading state
  if (isLoading || !fanScore) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl animate-pulse">Carregando seu Fan Score...</div>
      </div>
    );
  }

  const tier = getUserTier(fanScore.overallScore);
  const scoreCategories = formatScoreCategories(fanScore);
  const benefits = getTierBenefits(tier.tier);

  return (
    <div className="min-h-screen p-4 md:p-8 text-white font-rajdhani">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
              <span className="text-xl font-bold">ES</span>
            </div>
            <h1 className="text-3xl font-russo tracking-wider">E-SPORTS FAN HUB</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              {user.profileImageUrl ? (
                <img 
                  src={user.profileImageUrl} 
                  alt="Avatar do usuário" 
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <span className="text-white">{user.displayName?.charAt(0) || user.username.charAt(0)}</span>
              )}
            </div>
            <div>
              <p className="font-bold">{user.displayName || user.username}</p>
              <p className="text-xs text-gray-400">@{user.twitterUsername || user.username}</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="ml-2 text-gray-400 hover:text-white hover:bg-transparent"
            >
              <i className="fas fa-sign-out-alt"></i>
            </Button>
          </div>
        </header>

        {/* Main Score Card Section */}
        <Card 
          className="game-card bg-[#1E1E1E] rounded-xl overflow-hidden p-6 mb-6"
          style={
            { 
              "--tw-border-start": tier.colors.primary, 
              "--tw-border-end": tier.colors.secondary 
            } as React.CSSProperties
          }
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Score Badge Section */}
            <div className="flex-shrink-0">
              <TierBadge score={fanScore.overallScore} size="lg" />
            </div>

            {/* Score Details Section */}
            <div className="flex-1">
              <h2 
                className="text-3xl font-bold mb-2 flex items-center"
                style={{ color: tier.colors.primary }}
              >
                <i className={`fas fa-${tier.icon} mr-2`}></i> {tier.description.split("!")[0] + "!"}
              </h2>
              <p className="text-gray-300 mb-4">{tier.description.split("!")[1]?.trim()}</p>
              
              {/* Score Categories */}
              <div className="space-y-4">
                {scoreCategories.map((category, index) => (
                  <ScoreProgressBar
                    key={index}
                    label={category.name}
                    value={category.value}
                    max={category.max}
                    color={tier.colors.primary}
                    secondaryColor={tier.colors.secondary}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-bold py-6 px-6 rounded-md transition duration-300 flex items-center justify-center gap-2 h-auto"
          >
            <i className="fas fa-compass"></i>
            <span>Ver Recomendações</span>
          </Button>
          
          <Button 
            onClick={() => setFeedbackModalOpen(true)}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 px-6 rounded-md transition duration-300 flex items-center justify-center gap-2 h-auto"
          >
            <i className="fas fa-comment-alt"></i>
            <span>Dar Feedback sobre meu Score</span>
          </Button>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="game-card bg-[#1E1E1E] rounded-lg p-4"
              style={
                { 
                  "--tw-border-start": tier.colors.primary, 
                  "--tw-border-end": tier.colors.primary 
                } as React.CSSProperties
              }
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: tier.colors.background,
                    color: tier.colors.primary
                  }}
                >
                  <i className={`fas fa-${benefit.icon}`}></i>
                </div>
                <h3 
                  className="font-bold"
                  style={{ color: tier.colors.primary }}
                >
                  {benefit.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </Card>
          ))}
        </div>

        {/* Other Tiers Preview */}
        <h2 className="text-2xl font-bold mb-4">Outros Níveis de Fãs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tiers.filter(t => t.tier !== tier.tier).map((otherTier, index) => (
            <Card 
              key={index}
              className="bg-[#1E1E1E] rounded-lg p-4 border"
              style={{ borderColor: otherTier.colors.primary, opacity: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <i 
                  className={`fas fa-${otherTier.icon}`}
                  style={{ color: otherTier.colors.primary }}  
                ></i>
                <h3 
                  className="font-bold"
                  style={{ color: otherTier.colors.primary }}
                >
                  {otherTier.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm">
                {otherTier.tier === 'novato' 
                  ? '≤39 pontos' 
                  : `${otherTier.minScore}-${otherTier.maxScore} pontos`
                }
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal open={feedbackModalOpen} onOpenChange={setFeedbackModalOpen} />
    </div>
  );
}
