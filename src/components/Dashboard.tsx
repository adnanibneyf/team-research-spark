
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Book, KanbanSquare, Plus, Search, Calendar, ChevronUp, ArrowLeft, Users, FolderOpen } from "lucide-react";

interface DashboardProps {
  isProjectView?: boolean;
  onBackToPersonal?: () => void;
}

export function Dashboard({ isProjectView = false, onBackToPersonal }: DashboardProps) {
  const recentPapers = [
    { title: "Deep Learning in Medical Imaging", authors: "Smith et al.", status: "Reading", progress: 60 },
    { title: "Quantum Computing Applications", authors: "Johnson et al.", status: "Summarized", progress: 100 },
    { title: "Climate Change Modeling", authors: "Brown et al.", status: "To Read", progress: 0 },
  ];

  const activeProjects = [
    { name: "Literature Review - AI in Healthcare", tasks: 12, completed: 8, dueDate: "Dec 15" },
    { name: "Grant Proposal - NSF", tasks: 6, completed: 3, dueDate: "Jan 20" },
    { name: "Conference Paper Draft", tasks: 15, completed: 10, dueDate: "Feb 10" },
  ];

  const teamMembers = [
    { name: "John Doe", role: "Lead Researcher", status: "online" },
    { name: "Sarah Miller", role: "PhD Student", status: "away" },
    { name: "Alex Kim", role: "Research Assistant", status: "online" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isProjectView && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBackToPersonal}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Personal
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isProjectView ? "Project Dashboard" : "Research Dashboard"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isProjectView 
                ? "AI in Healthcare Literature Review - Team Overview" 
                : "Welcome back! Here's your research overview."
              }
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            {isProjectView ? "New Task" : "New Project"}
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Quick Search
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {isProjectView ? "Project Papers" : "Papers Read"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {isProjectView ? "87" : "127"}
            </div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ChevronUp className="w-3 h-3" />
              {isProjectView ? "+8 this week" : "+12 this week"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {isProjectView ? "Team Tasks" : "Active Projects"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {isProjectView ? "12" : "3"}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              {isProjectView ? "8 completed" : "2 due this month"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {isProjectView ? "4" : "8"}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {isProjectView ? "In this project" : "Across all projects"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Ideas Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {isProjectView ? "23" : "45"}
            </div>
            <p className="text-xs text-purple-600 mt-1">
              {isProjectView ? "8 this week" : "15 this week"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Papers */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-blue-600" />
              Recent Papers
            </CardTitle>
            <CardDescription>Literature you're currently working through</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPapers.map((paper, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{paper.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{paper.authors}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={paper.status === "Reading" ? "default" : paper.status === "Summarized" ? "secondary" : "outline"}>
                      {paper.status}
                    </Badge>
                    <Progress value={paper.progress} className="w-20 h-2" />
                    <span className="text-xs text-gray-500">{paper.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Projects or Team Overview */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isProjectView ? (
                <>
                  <Users className="w-5 h-5 text-green-600" />
                  Team Overview
                </>
              ) : (
                <>
                  <KanbanSquare className="w-5 h-5 text-green-600" />
                  Active Projects
                </>
              )}
            </CardTitle>
            <CardDescription>
              {isProjectView ? "Your project team members" : "Your ongoing research projects"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isProjectView ? (
              // Team members view for project dashboard
              teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-700">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{member.name}</h4>
                      <p className="text-xs text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    member.status === 'online' ? 'bg-green-400' : 
                    member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`} />
                </div>
              ))
            ) : (
              // Projects view for personal dashboard
              activeProjects.map((project, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{project.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      Due {project.dueDate}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={(project.completed / project.tasks) * 100} className="flex-1 h-2" />
                    <span className="text-xs text-gray-600">
                      {project.completed}/{project.tasks} tasks
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            {isProjectView 
              ? "Common project activities" 
              : "Jump into your most common research activities"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Search className="w-6 h-6" />
              Search Papers
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="w-6 h-6" />
              Add Ideas
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <KanbanSquare className="w-6 h-6" />
              Plan Tasks
            </Button>
            {isProjectView ? (
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="w-6 h-6" />
                Team Chat
              </Button>
            ) : (
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FolderOpen className="w-6 h-6" />
                View Projects
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
