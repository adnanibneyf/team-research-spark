
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Book, Plus, ChevronDown } from "lucide-react";

export function Literature() {
  const [searchQuery, setSearchQuery] = useState("");

  const papers = [
    {
      id: 1,
      title: "Attention Is All You Need",
      authors: "Vaswani, A., et al.",
      journal: "NeurIPS",
      year: 2017,
      citations: 89234,
      status: "Read",
      tags: ["Transformers", "NLP", "Deep Learning"],
      summary: "Introduced the Transformer architecture, revolutionizing sequence-to-sequence learning..."
    },
    {
      id: 2,
      title: "BERT: Pre-training of Deep Bidirectional Transformers",
      authors: "Devlin, J., et al.",
      journal: "NAACL",
      year: 2019,
      citations: 67891,
      status: "Reading",
      tags: ["BERT", "NLP", "Pre-training"],
      summary: "BERT obtains new state-of-the-art results on eleven natural language processing tasks..."
    },
    {
      id: 3,
      title: "GPT-3: Language Models are Few-Shot Learners",
      authors: "Brown, T., et al.",
      journal: "NeurIPS",
      year: 2020,
      citations: 45123,
      status: "To Read",
      tags: ["GPT", "Few-shot Learning", "Language Models"],
      summary: "We train GPT-3, an autoregressive language model with 175 billion parameters..."
    }
  ];

  const filteredPapers = papers.filter(paper =>
    paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Literature Library</h1>
          <p className="text-gray-600 mt-1">Discover, organize, and analyze research papers</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Paper
          </Button>
          <Button variant="outline">Import Library</Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-sm border-0">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search papers by title, author, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              Filters <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-white border shadow-sm">
          <TabsTrigger value="all">All Papers ({papers.length})</TabsTrigger>
          <TabsTrigger value="reading">Reading (1)</TabsTrigger>
          <TabsTrigger value="read">Read (1)</TabsTrigger>
          <TabsTrigger value="to-read">To Read (1)</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 cursor-pointer">
                        {paper.title}
                      </h3>
                      <Badge variant={
                        paper.status === "Read" ? "secondary" :
                        paper.status === "Reading" ? "default" : "outline"
                      }>
                        {paper.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{paper.authors}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{paper.journal} • {paper.year}</span>
                      <span>{paper.citations.toLocaleString()} citations</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {paper.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      {paper.summary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <Button size="sm" variant="outline">
                      <Book className="w-4 h-4 mr-2" />
                      Read
                    </Button>
                    <Button size="sm" variant="outline">
                      AI Summary
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reading">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Currently Reading</h3>
              <p className="text-gray-600 text-sm">Papers you're actively working through</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="read">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Completed Papers</h3>
              <p className="text-gray-600 text-sm">Papers you've finished reading and summarized</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="to-read">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Reading List</h3>
              <p className="text-gray-600 text-sm">Papers queued up for future reading</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
