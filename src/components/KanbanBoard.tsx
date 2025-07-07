
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Calendar, Book } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee?: string;
  dueDate?: string;
  tags: string[];
  type: "paper" | "task" | "idea";
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "backlog",
      title: "Backlog",
      color: "bg-gray-100",
      tasks: [
        {
          id: "1",
          title: "Read Transformer Paper",
          description: "Deep dive into 'Attention Is All You Need'",
          assignee: "JD",
          dueDate: "Dec 15",
          tags: ["Literature", "High Priority"],
          type: "paper"
        },
        {
          id: "2",
          title: "Draft Introduction Section",
          description: "Write intro for the literature review",
          assignee: "SM",
          dueDate: "Dec 20",
          tags: ["Writing"],
          type: "task"
        }
      ]
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "bg-blue-50",
      tasks: [
        {
          id: "3",
          title: "BERT Implementation",
          description: "Code up BERT model from scratch",
          assignee: "AK",
          dueDate: "Dec 18",
          tags: ["Coding", "ML"],
          type: "task"
        }
      ]
    },
    {
      id: "review",
      title: "Review",
      color: "bg-yellow-50",
      tasks: [
        {
          id: "4",
          title: "Methodology Section",
          description: "Review and refine methodology",
          assignee: "JD",
          dueDate: "Dec 12",
          tags: ["Writing", "Review"],
          type: "task"
        }
      ]
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-50",
      tasks: [
        {
          id: "5",
          title: "Related Work Survey",
          description: "Complete survey of related work",
          assignee: "SM",
          tags: ["Literature", "Complete"],
          type: "paper"
        }
      ]
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "paper":
        return <Book className="w-4 h-4" />;
      case "task":
        return <Calendar className="w-4 h-4" />;
      default:
        return <Plus className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Planning</h1>
          <p className="text-gray-600 mt-1">Organize and track your research tasks</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
          <Button variant="outline">New Board</Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className={`${column.color} rounded-t-lg`}>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-gray-800">{column.title}</span>
                  <Badge variant="secondary" className="bg-white/80">
                    {column.tasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3 min-h-[500px]">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className="text-gray-500 mt-1">
                        {getTypeIcon(task.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          {task.title}
                        </h4>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {task.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {task.assignee && (
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                              {task.assignee}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {task.dueDate}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <Button
                  variant="ghost"
                  className="w-full border-2 border-dashed border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
