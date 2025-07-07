
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Users, Calendar, ArrowRight, Folder } from "lucide-react";

interface ProjectsProps {
  onProjectSelect?: (projectId: string) => void;
}

export function Projects({ onProjectSelect }: ProjectsProps) {
  const projects = [
    {
      id: "1",
      name: "AI in Healthcare Literature Review",
      description: "Comprehensive review of machine learning applications in medical diagnosis",
      members: 4,
      progress: 75,
      deadline: "Dec 15, 2024",
      status: "active",
      papers: 127,
      tasks: 12,
      completedTasks: 8
    },
    {
      id: "2",
      name: "Grant Proposal - NSF",
      description: "Developing neural networks for climate modeling prediction",
      members: 2,
      progress: 45,
      deadline: "Jan 20, 2025",
      status: "active",
      papers: 89,
      tasks: 6,
      completedTasks: 3
    },
    {
      id: "3",
      name: "Conference Paper Draft",
      description: "Novel approach to natural language processing in scientific literature",
      members: 3,
      progress: 60,
      deadline: "Feb 10, 2025",
      status: "active",
      papers: 156,
      tasks: 15,
      completedTasks: 10
    },
    {
      id: "4",
      name: "Quantum Computing Research",
      description: "Exploring quantum algorithms for optimization problems",
      members: 5,
      progress: 30,
      deadline: "Mar 15, 2025",
      status: "planning",
      papers: 78,
      tasks: 8,
      completedTasks: 2
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research Projects</h1>
          <p className="text-gray-600 mt-1">Manage your collaborative research projects</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4</div>
            <p className="text-xs text-green-600 mt-1">2 due this month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">14</div>
            <p className="text-xs text-blue-600 mt-1">Across all projects</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Papers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">450</div>
            <p className="text-xs text-purple-600 mt-1">In all projects</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">58%</div>
            <p className="text-xs text-orange-600 mt-1">Across projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-gray-900">{project.name}</CardTitle>
                  <CardDescription className="mt-2 text-gray-600">
                    {project.description}
                  </CardDescription>
                </div>
                <Badge variant={project.status === "active" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{project.papers}</div>
                  <div className="text-xs text-gray-600">Papers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{project.completedTasks}/{project.tasks}</div>
                  <div className="text-xs text-gray-600">Tasks</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{project.members}</div>
                  <div className="text-xs text-gray-600">Members</div>
                </div>
              </div>

              {/* Team Members */}
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[...Array(Math.min(project.members, 4))].map((_, i) => (
                    <Avatar key={i} className="w-6 h-6 border-2 border-white">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                        {String.fromCharCode(65 + i)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {project.members > 4 && (
                    <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-gray-600">+{project.members - 4}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  {project.deadline}
                </div>
              </div>

              {/* Action */}
              <Button 
                onClick={() => onProjectSelect?.(project.id)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Folder className="w-4 h-4 mr-2" />
                Open Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
