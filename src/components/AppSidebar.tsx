
import { 
  Book, 
  KanbanSquare, 
  Search, 
  Calendar,
  Plus,
  FolderOpen
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
  isProjectView?: boolean;
}

const personalNavigationItems = [
  { id: "dashboard", title: "Dashboard", icon: Calendar },
  { id: "literature", title: "Literature", icon: Book },
  { id: "kanban", title: "Planning", icon: KanbanSquare },
  { id: "ideas", title: "Idea Canvas", icon: Plus },
  { id: "projects", title: "Projects", icon: FolderOpen },
];

const projectNavigationItems = [
  { id: "dashboard", title: "Dashboard", icon: Calendar },
  { id: "literature", title: "Literature", icon: Book },
  { id: "kanban", title: "Planning", icon: KanbanSquare },
  { id: "ideas", title: "Idea Canvas", icon: Plus },
  { id: "team", title: "Team Hub", icon: Search },
];

export function AppSidebar({ activeView, setActiveView, isProjectView = false }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const navigationItems = isProjectView ? projectNavigationItems : personalNavigationItems;

  return (
    <Sidebar className={`${isCollapsed ? "w-14" : "w-64"} transition-all duration-300`} collapsible="icon">
      <div className={`p-4 border-b transition-all duration-300 ${
        isProjectView 
          ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' 
          : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isProjectView ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            <Book className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg text-gray-900">ResearchMate</h1>
              <p className={`text-xs transition-all duration-300 ${
                isProjectView ? 'text-green-600' : 'text-blue-600'
              }`}>
                {isProjectView ? 'Team Collaboration' : 'Personal Workspace'}
              </p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className={`transition-all duration-300 ${
        isProjectView 
          ? 'bg-gradient-to-b from-green-50/30 to-white' 
          : 'bg-gradient-to-b from-blue-50/30 to-white'
      }`}>
        <SidebarGroup>
          <SidebarGroupLabel className={`font-medium transition-all duration-300 ${
            isProjectView ? 'text-green-700' : 'text-blue-700'
          }`}>
            {!isCollapsed && (isProjectView ? "Team Tools" : "Personal Tools")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={`transition-all duration-200 ${
                      activeView === item.id 
                        ? isProjectView
                          ? "bg-green-100 text-green-800 font-medium border-r-2 border-green-500" 
                          : "bg-blue-100 text-blue-800 font-medium border-r-2 border-blue-500"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <button
                      onClick={() => setActiveView(item.id)}
                      className="w-full flex items-center gap-3 px-3 py-2"
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className={`p-4 border-t transition-all duration-300 ${
        isProjectView 
          ? 'bg-green-50 border-green-200' 
          : 'bg-blue-50 border-blue-200'
      }`}>
        <SidebarTrigger className="w-full" />
      </div>
    </Sidebar>
  );
}
