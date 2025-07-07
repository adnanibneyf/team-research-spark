
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, User, ArrowRight, Briefcase } from "lucide-react";

interface SpaceTransitionProps {
  isProjectView: boolean;
  currentProject?: string | null;
  onTransitionComplete: () => void;
}

export function SpaceTransition({ isProjectView, currentProject, onTransitionComplete }: SpaceTransitionProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onTransitionComplete, 300);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onTransitionComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4 shadow-xl border-0 bg-white">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={`p-3 rounded-full transition-all duration-500 ${
              !isProjectView ? 'bg-blue-100 scale-110' : 'bg-gray-100 scale-90'
            }`}>
              <User className={`w-6 h-6 ${!isProjectView ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 animate-pulse" />
            <div className={`p-3 rounded-full transition-all duration-500 ${
              isProjectView ? 'bg-green-100 scale-110' : 'bg-gray-100 scale-90'
            }`}>
              <Users className={`w-6 h-6 ${isProjectView ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isProjectView ? 'Entering Team Space' : 'Entering Personal Space'}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {isProjectView 
              ? `Switching to ${currentProject || 'project'} collaboration environment`
              : 'Switching to your personal research workspace'
            }
          </p>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full animate-pulse w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
