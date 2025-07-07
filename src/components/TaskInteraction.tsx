
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, FileText, Users, Calendar, Plus, ExternalLink } from "lucide-react";

interface TaskLink {
  id: string;
  title: string;
  url: string;
  type: "website" | "document" | "paper";
}

interface TaskUser {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface TaskDocument {
  id: string;
  name: string;
  type: "pdf" | "doc" | "txt";
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface TaskInteractionProps {
  taskId: string;
  taskTitle: string;
  onClose: () => void;
}

export function TaskInteraction({ taskId, taskTitle, onClose }: TaskInteractionProps) {
  const [description, setDescription] = useState("Analyze the transformer architecture and its implications for modern NLP applications. Focus on the attention mechanism and compare with previous approaches.");
  const [newLink, setNewLink] = useState("");
  const [newLinkTitle, setNewLinkTitle] = useState("");

  const [links, setLinks] = useState<TaskLink[]>([
    { id: "1", title: "Original Transformer Paper", url: "https://arxiv.org/abs/1706.03762", type: "paper" },
    { id: "2", title: "Implementation Guide", url: "https://github.com/tensorflow/tensor2tensor", type: "website" },
    { id: "3", title: "Research Notes", url: "/documents/transformer_notes.pdf", type: "document" }
  ]);

  const [assignedUsers, setAssignedUsers] = useState<TaskUser[]>([
    { id: "1", name: "John Doe", avatar: "JD", role: "Lead Researcher" },
    { id: "2", name: "Sarah Miller", avatar: "SM", role: "PhD Student" },
    { id: "3", name: "Alex Kim", avatar: "AK", role: "Research Assistant" }
  ]);

  const [documents, setDocuments] = useState<TaskDocument[]>([
    { id: "1", name: "transformer_analysis.pdf", type: "pdf", size: "2.3 MB", uploadedBy: "John Doe", uploadedAt: "2024-01-15" },
    { id: "2", name: "research_notes.docx", type: "doc", size: "1.1 MB", uploadedBy: "Sarah Miller", uploadedAt: "2024-01-14" },
    { id: "3", name: "experiment_log.txt", type: "txt", size: "45 KB", uploadedBy: "Alex Kim", uploadedAt: "2024-01-13" }
  ]);

  const addLink = () => {
    if (newLink && newLinkTitle) {
      const link: TaskLink = {
        id: Date.now().toString(),
        title: newLinkTitle,
        url: newLink,
        type: newLink.includes('arxiv') || newLink.includes('paper') ? 'paper' : 'website'
      };
      setLinks([...links, link]);
      setNewLink("");
      setNewLinkTitle("");
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-4 h-4" />;
  };

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'paper': return <FileText className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-purple-50">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{taskTitle}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Task ID: {taskId}</p>
            </div>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="overview" className="h-full">
            <TabsList className="w-full justify-start rounded-none border-b">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="links" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                Links ({links.length})
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team ({assignedUsers.length})
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documents ({documents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Due Date</label>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      December 20, 2024
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Changes</Button>
              </div>
            </TabsContent>

            <TabsContent value="links" className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium mb-3">Add New Link</h3>
                  <div className="space-y-2">
                    <Input
                      placeholder="Link title"
                      value={newLinkTitle}
                      onChange={(e) => setNewLinkTitle(e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                    />
                    <Button onClick={addLink} size="sm" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Link
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {links.map((link) => (
                    <Card key={link.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getLinkIcon(link.type)}
                          <div>
                            <p className="font-medium text-sm">{link.title}</p>
                            <p className="text-xs text-gray-500">{link.url}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="users" className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <Button className="w-full flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Assign User
                </Button>

                <div className="space-y-2">
                  {assignedUsers.map((user) => (
                    <Card key={user.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.role}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <Button className="w-full flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Upload Document
                </Button>

                <div className="space-y-2">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getFileIcon(doc.type)}
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-gray-500">
                              {doc.size} • Uploaded by {doc.uploadedBy} on {doc.uploadedAt}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">Download</Button>
                          <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
