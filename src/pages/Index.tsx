
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { Literature } from "@/components/Literature";
import { KanbanBoard } from "@/components/KanbanBoard";
import { IdeaCanvas } from "@/components/IdeaCanvas";
import { TeamHub } from "@/components/TeamHub";
import { Projects } from "@/components/Projects";
import { SpaceTransition } from "@/components/SpaceTransition";
import { SpaceIndicator } from "@/components/SpaceIndicator";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [isProjectView, setIsProjectView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingTransition, setPendingTransition] = useState<{
    projectId: string | null;
    isProject: boolean;
  } | null>(null);

  const handleProjectSelect = (projectId: string) => {
    setIsTransitioning(true);
    setPendingTransition({ projectId, isProject: true });
  };

  const handleBackToPersonal = () => {
    setIsTransitioning(true);
    setPendingTransition({ projectId: null, isProject: false });
  };

  const handleTransitionComplete = () => {
    if (pendingTransition) {
      setCurrentProject(pendingTransition.projectId);
      setIsProjectView(pendingTransition.isProject);
      setActiveView("dashboard");
      setPendingTransition(null);
    }
    setIsTransitioning(false);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard isProjectView={isProjectView} onBackToPersonal={handleBackToPersonal} />;
      case "literature":
        return <Literature />;
      case "kanban":
        return <KanbanBoard />;
      case "ideas":
        return <IdeaCanvas />;
      case "team":
        return isProjectView ? <TeamHub /> : null;
      case "projects":
        return !isProjectView ? <Projects onProjectSelect={handleProjectSelect} /> : null;
      default:
        return <Dashboard isProjectView={isProjectView} onBackToPersonal={handleBackToPersonal} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 relative">
        {/* Space Indicator */}
        <SpaceIndicator 
          isProjectView={isProjectView} 
          currentProject={currentProject}
          onBackToPersonal={handleBackToPersonal}
        />
        
        {/* Transition Overlay */}
        {isTransitioning && (
          <SpaceTransition
            isProjectView={pendingTransition?.isProject || false}
            currentProject={pendingTransition?.projectId}
            onTransitionComplete={handleTransitionComplete}
          />
        )}
        
        <AppSidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          isProjectView={isProjectView}
        />
        
        <main className={`flex-1 overflow-hidden transition-all duration-300 ${
          isProjectView ? 'bg-green-50/30' : 'bg-blue-50/30'
        }`}>
          <div className={`h-full transition-all duration-300 ${
            isProjectView 
              ? 'border-l-4 border-green-400 bg-gradient-to-r from-green-50/50 to-transparent' 
              : 'border-l-4 border-blue-400 bg-gradient-to-r from-blue-50/50 to-transparent'
          }`}>
            {renderActiveView()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
