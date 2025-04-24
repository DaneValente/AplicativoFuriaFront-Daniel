import { FanScoreTier, TierConfig, FanScoreData, FanScoreCategory } from "./types";

// Define tier configurations
export const tiers: TierConfig[] = [
  {
    tier: FanScoreTier.PANTERA_ALFA,
    minScore: 80,
    maxScore: 100,
    title: "Pantera Alfa",
    description: "Você é lenda! Acesso antecipado e meet & greet garantido.",
    colors: {
      primary: "#FFD700", // gold
      secondary: "#FF8C00", // dark orange
      border: "#FFD700",
      background: "rgba(255, 215, 0, 0.2)"
    },
    icon: "crown"
  },
  {
    tier: FanScoreTier.DALE_HARDCORE,
    minScore: 60,
    maxScore: 79,
    title: "Dale Hardcore",
    description: "Você tá com tudo! Que tal um cupom exclusivo e novas missões?",
    colors: {
      primary: "#FF4500", // orange-red
      secondary: "#FF7F50", // coral
      border: "#FF4500",
      background: "rgba(255, 69, 0, 0.2)"
    },
    icon: "trophy"
  },
  {
    tier: FanScoreTier.CASUAL_STREAMER,
    minScore: 40,
    maxScore: 59,
    title: "Casual Streamer",
    description: "Curtindo de leve? Receba alertas VIP das melhores lives.",
    colors: {
      primary: "#8A2BE2", // purple
      secondary: "#9370DB", // medium purple
      border: "#8A2BE2",
      background: "rgba(138, 43, 226, 0.2)"
    },
    icon: "gamepad"
  },
  {
    tier: FanScoreTier.NOVATO,
    minScore: 0,
    maxScore: 39,
    title: "Novato",
    description: "Começando agora? Temos conteúdos e tutoriais só pra você.",
    colors: {
      primary: "#3498DB", // blue
      secondary: "#00CED1", // turquoise
      border: "#3498DB",
      background: "rgba(52, 152, 219, 0.2)"
    },
    icon: "rocket"
  }
];

// Determine user's tier based on overall score
export function getUserTier(score: number): TierConfig {
  for (const tier of tiers) {
    if (score >= tier.minScore && score <= tier.maxScore) {
      return tier;
    }
  }
  // Default to Novato if score is out of range
  return tiers[3];
}

// Format fan score data into categories for display
export function formatScoreCategories(scoreData: FanScoreData): FanScoreCategory[] {
  return [
    {
      name: "Interações Sociais",
      value: scoreData.socialInteractions,
      max: 100,
      field: "socialInteractions"
    },
    {
      name: "Presença em Eventos",
      value: scoreData.eventPresence,
      max: 100,
      field: "eventPresence"
    },
    {
      name: "Engajamento em Conteúdo",
      value: scoreData.contentEngagement,
      max: 100,
      field: "contentEngagement"
    },
    {
      name: "Fidelidade às Equipes",
      value: scoreData.teamLoyalty,
      max: 100,
      field: "teamLoyalty"
    }
  ];
}

// Get benefits based on user tier
export function getTierBenefits(tier: FanScoreTier): { icon: string; title: string; description: string }[] {
  switch (tier) {
    case FanScoreTier.PANTERA_ALFA:
      return [
        {
          icon: "ticket-alt",
          title: "Acesso Antecipado",
          description: "Ingressos para eventos antes do público geral"
        },
        {
          icon: "user-friends",
          title: "Meet & Greet",
          description: "Encontros exclusivos com seus ídolos do e-sports"
        },
        {
          icon: "gift",
          title: "Itens Exclusivos",
          description: "Acesso a mercadorias e colecionáveis limitados"
        }
      ];
    case FanScoreTier.DALE_HARDCORE:
      return [
        {
          icon: "tag",
          title: "Cupons Exclusivos",
          description: "Descontos especiais em produtos e eventos"
        },
        {
          icon: "tasks",
          title: "Missões Especiais",
          description: "Acesso a missões com recompensas exclusivas"
        },
        {
          icon: "comments",
          title: "Chat Prioritário",
          description: "Atendimento prioritário nos chats de suporte"
        }
      ];
    case FanScoreTier.CASUAL_STREAMER:
      return [
        {
          icon: "bell",
          title: "Alertas VIP",
          description: "Notificações antecipadas de lives e eventos"
        },
        {
          icon: "users",
          title: "Comunidade",
          description: "Acesso a grupos de discussão sobre e-sports"
        },
        {
          icon: "chart-line",
          title: "Estatísticas",
          description: "Acesso a estatísticas exclusivas de jogadores"
        }
      ];
    case FanScoreTier.NOVATO:
      return [
        {
          icon: "book",
          title: "Tutoriais",
          description: "Conteúdos educativos sobre o mundo dos e-sports"
        },
        {
          icon: "calendar-alt",
          title: "Calendário Básico",
          description: "Acesso ao calendário de eventos principais"
        },
        {
          icon: "map-signs",
          title: "Guia Inicial",
          description: "Orientações para começar sua jornada como fã"
        }
      ];
    default:
      return [];
  }
}
