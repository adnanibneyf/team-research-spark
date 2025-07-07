
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Book, KanbanSquare, Lightbulb, Users, MessageSquare, CheckCircle, Clock, User } from "lucide-react";

interface Activity {
  id: string;
  type: "paper_assigned" | "task_completed" | "idea_proposed" | "member_joined" | "comment_added" | "milestone_reached";
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  action: string;
  target: string;
  timestamp: string;
  details?: string;
}

interface Assignment {
  id: string;
  type: "paper" | "task" | "idea";
  title: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
  assignedBy: {
    name: string;
    avatar: string;
  };
  status: "pending" | "in_progress" | "completed" | "overdue";
  dueDate: string;
  progress: number;
}

export function ProjectActivity() {
  const activities: Activity[] = [
    {
      id: "1",
      type: "paper_assigned",
      user: { name: "Dr. Sarah Wilson", avatar: "SW", role: "Manager" },
      action: "assigned paper",
      target: "Deep Learning in Medical Imaging",
      timestamp: "2 hours ago",
      details: "to Alex Chen for review"
    },
    {
      id: "2",
      type: "task_completed",
      user: { name: "Maria Rodriguez", avatar: "MR", role: "Researcher" },
      action: "completed task",
      target: "Literature Review Summary",
      timestamp: "4 hours ago"
    },
    {
      id: "3",
      type: "idea_proposed",
      user: { name: "Alex Chen", avatar: "AC", role: "Team Leader" },
      action: "proposed idea",
      target: "Federated Learning Privacy Enhancement",
      timestamp: "6 hours ago"
    },
    {
      id: "4",
      type: "member_joined",
      user: { name: "David Kim", avatar: "DK", role: "Member" },
      action: "joined project",
      target: "AI in Healthcare Literature Review",
      timestamp: "1 day ago"
    },
    {
      id: "5",
      type: "comment_added",
      user: { name: "Prof. John Martinez", avatar: "JM", role: "Supervisor" },
      action: "commented on",
      target: "Multi-modal Learning Approach",
      timestamp: "1 day ago",
      details: "Great potential for clinical applications"
    }
  ];

  const assignments: Assignment[] = [
    {
      id: "1",
      type: "paper",
      title: "Attention Is All You Need",
      assignedTo: { name: "Alex Chen", avatar: "AC" },
      assignedBy: { name: "Dr. Sarah Wilson", avatar: "SW" },
      status: "in_progress",
      dueDate: "Dec 20, 2024",
      progress: 65
    },
    {
      id: "2",
      type: "task",
      title: "Methodology Section Draft",
      assignedTo: { name: "Maria Rodriguez", avatar: "MR" },
      assignedBy: { name: "Prof. John Martinez", avatar: "JM" },
      status: "pending",
      dueDate: "Dec 18, 2024",
      progress: 0
    },
    {
      id: "3",
      type: "idea",
      title: "Review Privacy Enhancement Proposal",
      assignedTo: { name: "David Kim", avatar: "DK" },
      assignedBy: { name: "Dr. Sarah Wilson", avatar: "SW" },
      status: "completed",
      dueDate: "Dec 15, 2024",
      progress: 100
    },
    {
      id: "4",
      type: "paper",
      title: "Federated Learning Survey",
      assignedTo: { name: "Alex Chen", avatar: "AC" },
      assignedBy: { name: "Dr. Sarah Wilson", avatar: "SW" },
      status: "overdue",
      dueDate: "Dec 12, 2024",
      progress: 30
    }
  ];

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "paper_assigned": return Book;
      case "task_completed": return CheckCircle;
      case "idea_proposed": return Lightbulb;
      case "member_joined": return Users;
      case "comment_added": return MessageSquare;
      case "milestone_reached": return KanbanSquare;
      default: return User;
    }
  };

  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: Assignment["type"]) => {
    switch (type) {
      case "paper": return Book;
      case "task": return KanbanSquare;
      case "idea": return Lightbulb;
      default: return User;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Project Activity</h2>
        <p className="text-gray-600">Track assignments and team activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Assignments */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KanbanSquare className="w-5 h-5 text-blue-600" />
              Current Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.map((assignment) => {
              const TypeIcon = getTypeIcon(assignment.type);
              return (
                <div key={assignment.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <TypeIcon className="w-4 h-4 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{assignment.title}</h4>
                        <p className="text-xs text-gray-600">
                          Assigned to {assignment.assignedTo.name} by {assignment.assignedBy.name}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          {assignment.assignedTo.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700">{assignment.assignedTo.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      Due {assignment.dueDate}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Progress value={assignment.progress} className="flex-1 h-2" />
                    <span className="text-xs text-gray-600">{assignment.progress}%</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <ActivityIcon className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          {activity.user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-900">{activity.user.name}</span>
                      <Badge variant="outline" className="text-xs">{activity.user.role}</Badge>
                    </div>
                    <p className="text-sm text-gray-700">
                      {activity.action} <span className="font-medium">{activity.target}</span>
                      {activity.details && <span className="text-gray-600"> - {activity.details}</span>}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
