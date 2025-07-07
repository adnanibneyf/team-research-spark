
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { Literature } from "@/components/Literature";
import { KanbanBoard } from "@/components/KanbanBoard";
import { IdeaCanvas } from "@/components/IdeaCanvas";
import { TeamHub } from "@/components/TeamHub";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "literature":
        return <Literature />;
      case "kanban":
        return <KanbanBoard />;
      case "ideas":
        return <IdeaCanvas />;
      case "team":
        return <TeamHub />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 overflow-hidden">
          {renderActiveView()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
