
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Save, Download } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface PaperChatProps {
  paperId: number;
  paperTitle: string;
  onClose: () => void;
}

export function PaperChat({ paperId, paperTitle, onClose }: PaperChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm here to help you understand this paper. You can ask me about the methodology, results, implications, or any specific concepts you'd like clarification on.",
      timestamp: "2024-01-15 14:00"
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Based on the paper "${paperTitle}", here's my response to your question: "${inputMessage}". The authors discuss this concept in detail, particularly focusing on the methodology and its implications for the field.`,
        timestamp: new Date().toLocaleString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const saveChatHistory = () => {
    const chatData = {
      paperId,
      paperTitle,
      messages,
      savedAt: new Date().toISOString()
    };
    console.log("Saving chat history:", chatData);
    // In a real app, this would save to a database
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `[${msg.timestamp}] ${msg.role.toUpperCase()}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${paperTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
        <CardHeader className="bg-green-50 flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">AI Paper Chat</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{paperTitle}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={saveChatHistory}>
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={exportChat}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8 bg-green-100">
                      <AvatarFallback>
                        <Bot className="w-4 h-4 text-green-600" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[70%] ${message.role === 'user' ? 'order-first' : ''}`}>
                    <Card className={`${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-50'}`}>
                      <CardContent className="p-3">
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {message.role === 'user' && (
                    <Avatar className="w-8 h-8 bg-blue-100">
                      <AvatarFallback>
                        <User className="w-4 h-4 text-blue-600" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 bg-green-100">
                    <AvatarFallback>
                      <Bot className="w-4 h-4 text-green-600" />
                    </AvatarFallback>
                  </Avatar>
                  <Card className="bg-gray-50">
                    <CardContent className="p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="border-t p-4 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Ask anything about this paper..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={isLoading}
              />
              <Button onClick={sendMessage} disabled={isLoading || !inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
