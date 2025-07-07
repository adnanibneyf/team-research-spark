
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, KanbanSquare, Search } from "lucide-react";

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  position: { x: number; y: number };
  color: string;
}

export function IdeaCanvas() {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: "1",
      title: "Multi-modal Learning",
      description: "Combine text and image processing for better understanding",
      category: "AI/ML",
      position: { x: 100, y: 150 },
      color: "bg-blue-100 border-blue-300"
    },
    {
      id: "2",
      title: "Federated Learning Privacy",
      description: "Enhance privacy preservation in federated learning systems",
      category: "Privacy",
      position: { x: 400, y: 200 },
      color: "bg-green-100 border-green-300"
    },
    {
      id: "3",
      title: "Interpretable AI",
      description: "Make AI decisions more transparent and explainable",
      category: "Explainability",
      position: { x: 250, y: 350 },
      color: "bg-purple-100 border-purple-300"
    },
    {
      id: "4",
      title: "Edge Computing ML",
      description: "Optimize ML models for edge computing environments",
      category: "Systems",
      position: { x: 600, y: 150 },
      color: "bg-orange-100 border-orange-300"
    }
  ]);

  const categories = ["AI/ML", "Privacy", "Explainability", "Systems"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Idea Canvas</h1>
          <p className="text-gray-600 mt-1">Brainstorm, connect, and develop research ideas</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Idea
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            AI Suggest
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="bg-white shadow-sm border-0 mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <span className="text-sm font-medium text-gray-700">Categories:</span>
              {categories.map((category) => (
                <Badge key={category} variant="outline" className="cursor-pointer hover:bg-gray-50">
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 ml-auto">
              <Button size="sm" variant="outline">
                <KanbanSquare className="w-4 h-4 mr-2" />
                Convert to Tasks
              </Button>
              <Button size="sm" variant="outline">
                Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canvas */}
      <Card className="bg-white shadow-sm border-0 h-[600px] relative overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">Brainstorming Space</CardTitle>
        </CardHeader>
        <CardContent className="relative h-full p-0">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Ideas */}
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className={`absolute p-4 rounded-lg border-2 cursor-move hover:shadow-lg transition-shadow min-w-[200px] max-w-[250px] ${idea.color}`}
              style={{
                left: idea.position.x,
                top: idea.position.y,
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm leading-tight">
                  {idea.title}
                </h4>
                <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                  {idea.category}
                </Badge>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                {idea.description}
              </p>
              <div className="flex gap-1 mt-3">
                <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                  Edit
                </Button>
                <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                  Link
                </Button>
              </div>
            </div>
          ))}

          {/* Add Idea Placeholder */}
          <div className="absolute bottom-4 right-4">
            <Button
              className="rounded-full w-12 h-12 shadow-lg bg-purple-600 hover:bg-purple-700"
              size="sm"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Panel */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="pt-6">
            <h3 className="font-medium text-gray-900 mb-2">Recent Ideas</h3>
            <p className="text-sm text-gray-600">4 ideas added this week</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="pt-6">
            <h3 className="font-medium text-gray-900 mb-2">Connected Concepts</h3>
            <p className="text-sm text-gray-600">8 idea connections made</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="pt-6">
            <h3 className="font-medium text-gray-900 mb-2">Tasks Created</h3>
            <p className="text-sm text-gray-600">6 ideas converted to tasks</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
