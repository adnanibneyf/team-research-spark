
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, MessageSquare, FileText, Clock } from "lucide-react";

interface Note {
  id: string;
  content: string;
  timestamp: string;
  tags: string[];
}

interface PaperNotesProps {
  paperId: number;
  paperTitle: string;
  onClose: () => void;
}

export function PaperNotes({ paperId, paperTitle, onClose }: PaperNotesProps) {
  const [currentNote, setCurrentNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      content: "Key insight: The attention mechanism allows the model to focus on relevant parts of the input sequence. This is particularly useful for long sequences where traditional RNNs struggle.",
      timestamp: "2024-01-15 14:30",
      tags: ["key-insight", "attention-mechanism"]
    },
    {
      id: "2",
      content: "Question: How does the computational complexity compare to LSTM? Need to investigate the O(n²) complexity for long sequences.",
      timestamp: "2024-01-15 15:45",
      tags: ["question", "complexity"]
    }
  ]);

  const [summary, setSummary] = useState("This paper introduces the Transformer architecture, which relies entirely on attention mechanisms. The key innovation is the multi-head self-attention mechanism that allows the model to attend to different positions of the input sequence simultaneously.");

  const saveNote = () => {
    if (currentNote.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        content: currentNote,
        timestamp: new Date().toLocaleString(),
        tags: []
      };
      setNotes([newNote, ...notes]);
      setCurrentNote("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-blue-50">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{paperTitle}</CardTitle>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="notes" className="h-full">
            <TabsList className="w-full justify-start rounded-none border-b">
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Personal Notes
              </TabsTrigger>
              <TabsTrigger value="summary" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                AI Summary
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Add New Note</label>
                  <Textarea
                    placeholder="Write your thoughts, questions, or insights about this paper..."
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button onClick={saveNote} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Note
                  </Button>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Previous Notes</h3>
                  {notes.map((note) => (
                    <Card key={note.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <p className="text-sm mb-2">{note.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {note.timestamp}
                          </div>
                          <div className="flex gap-1">
                            {note.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">AI-Generated Summary</h3>
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed">{summary}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Button variant="outline" className="w-full">
                  Regenerate Summary
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
