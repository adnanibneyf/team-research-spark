
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, UserPlus, Mail, MoreVertical, Shield, Users, Crown } from "lucide-react";
import { useState } from "react";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "manager" | "supervisor" | "team_leader" | "researcher" | "member";
  avatar: string;
  status: "online" | "away" | "offline";
  joinDate: string;
  contributions: number;
}

export function ProjectMembers() {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@university.edu",
      role: "manager",
      avatar: "SW",
      status: "online",
      joinDate: "2024-01-15",
      contributions: 45
    },
    {
      id: "2",
      name: "Prof. John Martinez",
      email: "john.martinez@university.edu",
      role: "supervisor",
      avatar: "JM",
      status: "away",
      joinDate: "2024-01-20",
      contributions: 38
    },
    {
      id: "3",
      name: "Alex Chen",
      email: "alex.chen@university.edu",
      role: "team_leader",
      avatar: "AC",
      status: "online",
      joinDate: "2024-02-01",
      contributions: 32
    },
    {
      id: "4",
      name: "Maria Rodriguez",
      email: "maria.rodriguez@university.edu",
      role: "researcher",
      avatar: "MR",
      status: "online",
      joinDate: "2024-02-15",
      contributions: 28
    },
    {
      id: "5",
      name: "David Kim",
      email: "david.kim@university.edu",
      role: "member",
      avatar: "DK",
      status: "offline",
      joinDate: "2024-03-01",
      contributions: 15
    }
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<string>("member");

  const roleConfig = {
    manager: { label: "Manager", icon: Crown, color: "bg-red-100 text-red-800", permissions: ["all"] },
    supervisor: { label: "Supervisor", icon: Shield, color: "bg-purple-100 text-purple-800", permissions: ["manage_members", "assign_tasks"] },
    team_leader: { label: "Team Leader", icon: Users, color: "bg-blue-100 text-blue-800", permissions: ["assign_tasks", "review_work"] },
    researcher: { label: "Researcher", icon: Users, color: "bg-green-100 text-green-800", permissions: ["create_ideas", "complete_tasks"] },
    member: { label: "Member", icon: Users, color: "bg-gray-100 text-gray-800", permissions: ["view_only"] }
  };

  const handleInviteMember = () => {
    if (inviteEmail) {
      console.log(`Inviting ${inviteEmail} as ${inviteRole}`);
      setInviteEmail("");
      setInviteRole("member");
    }
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? { ...member, role: newRole as Member["role"] }
        : member
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Members</h2>
          <p className="text-gray-600">Manage team members and their roles</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {members.length} members
        </Badge>
      </div>

      {/* Invite Member */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Invite New Member
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1"
            />
            <Select value={inviteRole} onValueChange={setInviteRole}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(roleConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleInviteMember} className="bg-blue-600 hover:bg-blue-700">
              <Mail className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => {
              const roleInfo = roleConfig[member.role];
              const RoleIcon = roleInfo.icon;
              
              return (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
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
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-xs text-gray-500">Joined {member.joinDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{member.contributions}</div>
                      <div className="text-xs text-gray-500">contributions</div>
                    </div>

                    <Badge className={roleInfo.color}>
                      <RoleIcon className="w-3 h-3 mr-1" />
                      {roleInfo.label}
                    </Badge>

                    <Select 
                      value={member.role} 
                      onValueChange={(value) => handleRoleChange(member.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(roleConfig).map(([key, config]) => (
                          <SelectItem key={key} value={key}>
                            {config.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(roleConfig).map(([key, config]) => {
              const RoleIcon = config.icon;
              return (
                <div key={key} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <RoleIcon className="w-5 h-5" />
                    <h4 className="font-medium">{config.label}</h4>
                  </div>
                  <div className="text-sm text-gray-600">
                    {key === 'manager' && "Full project control, can manage all members"}
                    {key === 'supervisor' && "Can manage members and assign tasks"}
                    {key === 'team_leader' && "Can assign tasks and review work"}
                    {key === 'researcher' && "Can create ideas and complete tasks"}
                    {key === 'member' && "Can view project and complete assigned tasks"}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
