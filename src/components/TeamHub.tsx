
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, Book, KanbanSquare } from "lucide-react";

export function TeamHub() {
  const teamMembers = [
    { id: 1, name: "John Doe", role: "Lead Researcher", avatar: "JD", status: "online", contributions: 24 },
    { id: 2, name: "Sarah Miller", role: "PhD Student", avatar: "SM", status: "away", contributions: 18 },
    { id: 3, name: "Alex Kim", role: "Research Assistant", avatar: "AK", status: "online", contributions: 12 },
    { id: 4, name: "Maria Garcia", role: "Collaborator", avatar: "MG", status: "offline", contributions: 8 }
  ];

  const recentActivity = [
    { user: "John Doe", action: "added paper", item: "Attention Is All You Need", time: "2 hours ago" },
    { user: "Sarah Miller", action: "completed task", item: "Literature Review Draft", time: "4 hours ago" },
    { user: "Alex Kim", action: "created idea", item: "Multi-modal Learning Approach", time: "6 hours ago" },
    { user: "Maria Garcia", action: "commented on", item: "Methodology Section", time: "1 day ago" }
  ];

  const projects = [
    { name: "AI in Healthcare Literature Review", members: 3, progress: 75, deadline: "Dec 15" },
    { name: "Grant Proposal - NSF", members: 2, progress: 45, deadline: "Jan 20" },
    { name: "Conference Paper Draft", members: 4, progress: 60, deadline: "Feb 10" }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Hub</h1>
          <p className="text-gray-600 mt-1">Collaborate with your research team</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
          <Button variant="outline">Team Settings</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Team Members
              <Badge variant="secondary">{teamMembers.length}</Badge>
            </CardTitle>
            <CardDescription>Your research collaborators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      member.status === 'online' ? 'bg-green-400' : 
                      member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{member.name}</h4>
                    <p className="text-xs text-gray-600">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{member.contributions}</p>
                  <p className="text-xs text-gray-500">contributions</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white shadow-sm border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>What's happening in your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                      <span className="font-medium text-blue-600">{activity.item}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Overview */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>Current collaborative research projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-900 text-sm leading-tight">
                    {project.name}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    Due {project.deadline}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex -space-x-2">
                    {[...Array(project.members)].map((_, i) => (
                      <Avatar key={i} className="w-6 h-6 border-2 border-white">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">{project.members} members</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-white border shadow-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="shared">Shared Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <Book className="w-6 h-6" />
              Share Paper
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <KanbanSquare className="w-6 h-6" />
              Assign Task
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <Calendar className="w-6 h-6" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <Plus className="w-6 h-6" />
              Start Discussion
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="discussions">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-gray-900 mb-2">Team Discussions</h3>
              <p className="text-gray-600 text-sm">Start conversations about your research</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-gray-900 mb-2">Shared Resources</h3>
              <p className="text-gray-600 text-sm">Papers, data, and documents shared with the team</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
