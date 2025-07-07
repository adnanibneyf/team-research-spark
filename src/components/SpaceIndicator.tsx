
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, User, ArrowLeft, Building2 } from "lucide-react";

interface SpaceIndicatorProps {
  isProjectView: boolean;
  currentProject?: string | null;
  onBackToPersonal?: () => void;
}

export function SpaceIndicator({ isProjectView, currentProject, onBackToPersonal }: SpaceIndicatorProps) {
  return (
    <div className={`fixed top-4 right-4 z-40 transition-all duration-300 ${
      isProjectView 
        ? 'bg-green-50 border-green-200 text-green-800' 
        : 'bg-blue-50 border-blue-200 text-blue-800'
    } border rounded-lg px-4 py-2 shadow-lg`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {isProjectView ? (
            <Users className="w-4 h-4 text-green-600" />
          ) : (
            <User className="w-4 h-4 text-blue-600" />
          )}
          <span className="font-medium text-sm">
            {isProjectView ? 'Team Space' : 'Personal Space'}
          </span>
        </div>
        
        {isProjectView && (
          <>
            <div className="w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-2">
              <Building2 className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-600">
                {currentProject || 'Project Dashboard'}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBackToPersonal}
              className="h-6 px-2 text-xs hover:bg-green-100"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Personal
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
