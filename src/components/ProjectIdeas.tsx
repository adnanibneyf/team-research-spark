
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, MessageSquare, ThumbsUp, ThumbsDown, Eye, Clock, User } from "lucide-react";
import { useState } from "react";

interface Idea {
  id: string;
  title: string;
  description: string;
  proposedBy: {
    name: string;
    avatar: string;
    role: string;
  };
  status: "proposed" | "under_review" | "approved" | "rejected" | "in_progress";
  category: string;
  votes: {
    upvotes: number;
    downvotes: number;
    userVote?: "up" | "down";
  };
  comments: number;
  createdAt: string;
  priority: "low" | "medium" | "high";
}

export function ProjectIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: "1",
      title: "Multi-modal Deep Learning Approach",
      description: "Investigate combining text and image processing for better medical diagnosis accuracy. This could revolutionize how we approach diagnostic AI.",
      proposedBy: {
        name: "Dr. Sarah Wilson",
        avatar: "SW",
        role: "Manager"
      },
      status: "approved",
      category: "AI/ML",
      votes: { upvotes: 8, downvotes: 1 },
      comments: 12,
      createdAt: "2024-01-15",
      priority: "high"
    },
    {
      id: "2",
      title: "Federated Learning Privacy Enhancement",
      description: "Develop new privacy-preserving techniques for federated learning systems in healthcare data.",
      proposedBy: {
        name: "Alex Chen",
        avatar: "AC",
        role: "Team Leader"
      },
      status: "under_review",
      category: "Privacy",
      votes: { upvotes: 5, downvotes: 0 },
      comments: 7,
      createdAt: "2024-02-01",
      priority: "medium"
    },
    {
      id: "3",
      title: "Interpretable AI Dashboard",
      description: "Create a user-friendly dashboard that explains AI decision-making processes to non-technical users.",
      proposedBy: {
        name: "Maria Rodriguez",
        avatar: "MR",
        role: "Researcher"
      },
      status: "proposed",
      category: "UX/UI",
      votes: { upvotes: 3, downvotes: 2 },
      comments: 4,
      createdAt: "2024-02-15",
      priority: "low"
    }
  ]);

  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [newIdeaDescription, setNewIdeaDescription] = useState("");
  const [showNewIdeaForm, setShowNewIdeaForm] = useState(false);

  const statusConfig = {
    proposed: { label: "Proposed", color: "bg-yellow-100 text-yellow-800" },
    under_review: { label: "Under Review", color: "bg-blue-100 text-blue-800" },
    approved: { label: "Approved", color: "bg-green-100 text-green-800" },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
    in_progress: { label: "In Progress", color: "bg-purple-100 text-purple-800" }
  };

  const priorityConfig = {
    low: { label: "Low", color: "bg-gray-100 text-gray-800" },
    medium: { label: "Medium", color: "bg-orange-100 text-orange-800" },
    high: { label: "High", color: "bg-red-100 text-red-800" }
  };

  const handleSubmitIdea = () => {
    if (newIdeaTitle && newIdeaDescription) {
      const newIdea: Idea = {
        id: Date.now().toString(),
        title: newIdeaTitle,
        description: newIdeaDescription,
        proposedBy: {
          name: "Current User",
          avatar: "CU",
          role: "Member"
        },
        status: "proposed",
        category: "General",
        votes: { upvotes: 0, downvotes: 0 },
        comments: 0,
        createdAt: new Date().toISOString().split('T')[0],
        priority: "medium"
      };
      
      setIdeas([newIdea, ...ideas]);
      setNewIdeaTitle("");
      setNewIdeaDescription("");
      setShowNewIdeaForm(false);
    }
  };

  const handleVote = (ideaId: string, voteType: "up" | "down") => {
    setIdeas(ideas.map(idea => {
      if (idea.id === ideaId) {
        const newVotes = { ...idea.votes };
        if (idea.votes.userVote === voteType) {
          // Remove vote
          if (voteType === "up") newVotes.upvotes--;
          else newVotes.downvotes--;
          newVotes.userVote = undefined;
        } else {
          // Add or change vote
          if (idea.votes.userVote === "up") newVotes.upvotes--;
          if (idea.votes.userVote === "down") newVotes.downvotes--;
          
          if (voteType === "up") newVotes.upvotes++;
          else newVotes.downvotes++;
          newVotes.userVote = voteType;
        }
        return { ...idea, votes: newVotes };
      }
      return idea;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Ideas</h2>
          <p className="text-gray-600">Propose and discuss research ideas</p>
        </div>
        <Button 
          onClick={() => setShowNewIdeaForm(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Propose Idea
        </Button>
      </div>

      {/* New Idea Form */}
      {showNewIdeaForm && (
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle>Propose New Idea</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Idea title"
              value={newIdeaTitle}
              onChange={(e) => setNewIdeaTitle(e.target.value)}
            />
            <Textarea
              placeholder="Describe your idea in detail..."
              value={newIdeaDescription}
              onChange={(e) => setNewIdeaDescription(e.target.value)}
              rows={4}
            />
            <div className="flex gap-3">
              <Button onClick={handleSubmitIdea} className="bg-purple-600 hover:bg-purple-700">
                Submit Idea
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowNewIdeaForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ideas List */}
      <div className="space-y-4">
        {ideas.map((idea) => (
          <Card key={idea.id} className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{idea.title}</h3>
                    <Badge className={statusConfig[idea.status].color}>
                      {statusConfig[idea.status].label}
                    </Badge>
                    <Badge className={priorityConfig[idea.priority].color}>
                      {priorityConfig[idea.priority].label}
                    </Badge>
                    <Badge variant="outline">{idea.category}</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">{idea.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                        {idea.proposedBy.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{idea.proposedBy.name}</p>
                      <p className="text-xs text-gray-500">{idea.proposedBy.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {idea.createdAt}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(idea.id, "up")}
                      className={`flex items-center gap-1 ${idea.votes.userVote === "up" ? "text-green-600" : ""}`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {idea.votes.upvotes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(idea.id, "down")}
                      className={`flex items-center gap-1 ${idea.votes.userVote === "down" ? "text-red-600" : ""}`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      {idea.votes.downvotes}
                    </Button>
                  </div>

                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {idea.comments}
                  </Button>

                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
