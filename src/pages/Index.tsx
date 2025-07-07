
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { Literature } from "@/components/Literature";
import { KanbanBoard } from "@/components/KanbanBoard";
import { IdeaCanvas } from "@/components/IdeaCanvas";
import { TeamHub } from "@/components/TeamHub";
import { Projects } from "@/components/Projects";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [isProjectView, setIsProjectView] = useState(false);

  const handleProjectSelect = (projectId: string) => {
    setCurrentProject(projectId);
    setIsProjectView(true);
    setActiveView("dashboard");
  };

  const handleBackToPersonal = () => {
    setCurrentProject(null);
    setIsProjectView(false);
    setActiveView("dashboard");
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
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          isProjectView={isProjectView}
        />
        <main className="flex-1 overflow-hidden">
          {renderActiveView()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
