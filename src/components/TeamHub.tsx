
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Activity, Lightbulb, Settings } from "lucide-react";
import { ProjectMembers } from "./ProjectMembers";
import { ProjectIdeas } from "./ProjectIdeas";
import { ProjectActivity } from "./ProjectActivity";

export function TeamHub() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Hub</h1>
          <p className="text-gray-600 mt-1">AI in Healthcare Literature Review - Team Management</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Project Settings
        </Button>
      </div>

      {/* Team Management Tabs */}
      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="bg-white border shadow-sm">
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Activity & Assignments
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="ideas" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Ideas & Proposals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <ProjectActivity />
        </TabsContent>

        <TabsContent value="members">
          <ProjectMembers />
        </TabsContent>

        <TabsContent value="ideas">
          <ProjectIdeas />
        </TabsContent>
      </Tabs>
    </div>
  );
}
