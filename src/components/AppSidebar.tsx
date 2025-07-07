
import { 
  Book, 
  KanbanSquare, 
  Search, 
  Calendar,
  Plus,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const navigationItems = [
  { id: "dashboard", title: "Dashboard", icon: Calendar },
  { id: "literature", title: "Literature", icon: Book },
  { id: "kanban", title: "Planning", icon: KanbanSquare },
  { id: "ideas", title: "Idea Canvas", icon: Plus },
  { id: "team", title: "Team Hub", icon: Search },
];

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const { collapsed } = useSidebar();

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible>
      <div className="p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Book className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg text-gray-900">ResearchMate</h1>
              <p className="text-xs text-gray-500">Smart Research Assistant</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-medium">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={activeView === item.id ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}
                  >
                    <button
                      onClick={() => setActiveView(item.id)}
                      className="w-full flex items-center gap-3 px-3 py-2"
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 border-t bg-white">
        <SidebarTrigger className="w-full" />
      </div>
    </Sidebar>
  );
}
