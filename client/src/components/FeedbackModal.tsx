import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { FeedbackOption, UserFeedback } from "@/lib/types";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackOption | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!selectedFeedback) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma opção de feedback.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      await apiRequest("POST", "/api/feedback", {
        feedback: selectedFeedback,
        comment: comment.trim() || undefined,
      });
      
      toast({
        title: "Feedback enviado",
        description: "Obrigado por compartilhar sua opinião!",
      });
      
      // Reset form and close modal
      setSelectedFeedback(null);
      setComment("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao enviar feedback",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1E1E1E] text-white border-gray-700 clip-path-angled p-6 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Seu feedback é importante!</DialogTitle>
          <DialogDescription className="text-gray-300">
            O que você acha do seu Fan Score?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <RadioGroup value={selectedFeedback || ""} onValueChange={(value) => setSelectedFeedback(value as FeedbackOption)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="too-low" id="too-low" className="text-purple-500" />
              <Label htmlFor="too-low" className="text-sm text-gray-200">Muito baixo, mereço mais pontos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="accurate" id="accurate" className="text-purple-500" />
              <Label htmlFor="accurate" className="text-sm text-gray-200">Está correto, reflete meu engajamento</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="too-high" id="too-high" className="text-purple-500" />
              <Label htmlFor="too-high" className="text-sm text-gray-200">Muito alto, não sou tão envolvido</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-sure" id="not-sure" className="text-purple-500" />
              <Label htmlFor="not-sure" className="text-sm text-gray-200">Não tenho certeza, como é calculado?</Label>
            </div>
          </RadioGroup>
          
          <div className="mt-4">
            <Textarea
              placeholder="Comentários adicionais (opcional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white text-sm focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700">
              Cancelar
            </Button>
          </DialogClose>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#8A2BE2] to-[#3498DB] text-white border-none hover:opacity-90"
          >
            {isSubmitting ? "Enviando..." : "Enviar Feedback"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
