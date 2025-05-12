import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus, Save, Clock, Trash2, Edit, PlayCircle, PauseCircle, Calendar } from "lucide-react";
import { Layout } from "./Sidebar";

const automationRules = [
  {
    id: 1,
    name: "Welcome New Followers",
    description: "Send welcome message to new followers",
    active: true,
    triggerType: "New Follower",
    message: "Hey there! 👋 Thanks for following! Feel free to check out our latest posts and stories!",
    delay: "5 minutes"
  },
  {
    id: 2,
    name: "Product Inquiry Response",
    description: "Auto respond to product questions",
    active: true,
    triggerType: "Keyword",
    message: "Thank you for your interest in our products! Someone from our team will get back to you shortly. In the meantime, check out our FAQ page.",
    delay: "Immediate",
    keywords: ["price", "cost", "how much", "available"]
  },
  {
    id: 3,
    name: "Re-engagement Campaign",
    description: "Message inactive followers",
    active: false,
    triggerType: "Scheduled",
    message: "Hey! We haven't seen you in a while. Check out our latest updates and special offers just for you!",
    schedule: "Every 30 days"
  },
];

export default function AutomationPage() {
  const [rules, setRules] = useState(automationRules);
  const [editingRule, setEditingRule] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const toggleRuleStatus = (id) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };
  
  const deleteRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };
  
  const editRule = (rule) => {
    setEditingRule(rule);
    setShowAddForm(true);
  };
  
  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Automation Rules</h1>
          <Button onClick={() => { setEditingRule(null); setShowAddForm(true); }} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Rule
          </Button>
        </div>

        <Tabs defaultValue="active" className="mb-6">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              <PlayCircle className="h-4 w-4" />
              Active Rules
            </TabsTrigger>
            <TabsTrigger value="inactive" className="gap-2">
              <PauseCircle className="h-4 w-4" />
              Inactive Rules
            </TabsTrigger>
            <TabsTrigger value="all" className="gap-2">
              All Rules
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <RulesList 
              rules={rules.filter(rule => rule.active)} 
              toggleStatus={toggleRuleStatus}
              onDelete={deleteRule}
              onEdit={editRule}
            />
          </TabsContent>
          
          <TabsContent value="inactive">
            <RulesList 
              rules={rules.filter(rule => !rule.active)} 
              toggleStatus={toggleRuleStatus}
              onDelete={deleteRule}
              onEdit={editRule}
            />
          </TabsContent>
          
          <TabsContent value="all">
            <RulesList 
              rules={rules} 
              toggleStatus={toggleRuleStatus}
              onDelete={deleteRule}
              onEdit={editRule}
            />
          </TabsContent>
        </Tabs>
        
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{editingRule ? "Edit Automation Rule" : "Create Automation Rule"}</CardTitle>
                <CardDescription>
                  {editingRule 
                    ? "Modify your existing automation rule" 
                    : "Set up a new automated message response"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="rule-name">Rule Name</Label>
                      <Input 
                        id="rule-name" 
                        placeholder="e.g., Welcome Message" 
                        defaultValue={editingRule?.name}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trigger-type">Trigger Type</Label>
                      <select 
                        id="trigger-type" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue={editingRule?.triggerType || "New Follower"}
                      >
                        <option>New Follower</option>
                        <option>Keyword</option>
                        <option>Scheduled</option>
                        <option>Story Mention</option>
                        <option>DM Received</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rule-description">Description</Label>
                    <Input 
                      id="rule-description" 
                      placeholder="Brief description of this rule" 
                      defaultValue={editingRule?.description}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="message">Message Template</Label>
                      <span className="text-xs text-muted-foreground">Supports variables like {"{name}"}</span>
                    </div>
                    <textarea 
                      id="message" 
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Enter your automated message here..."
                      defaultValue={editingRule?.message}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="delay">Response Delay</Label>
                      <select 
                        id="delay" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue={editingRule?.delay || "Immediate"}
                      >
                        <option>Immediate</option>
                        <option>5 minutes</option>
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>Custom</option>
                      </select>
                    </div>
                    <div className="space-y-2 flex items-center">
                      <div className="flex items-center space-x-2 pt-5">
                        <Switch id="active-status" defaultChecked={editingRule?.active ?? true} />
                        <Label htmlFor="active-status">Active</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  {editingRule ? "Update Rule" : "Save Rule"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

function RulesList({ rules, toggleStatus, onDelete, onEdit }) {
  if (rules.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-lg font-medium">No automation rules found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create your first automation rule to start responding automatically to Instagram messages.
        </p>
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className={rule.active ? "border-l-4 border-l-primary" : "border-l-4 border-l-muted"}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {rule.name}
                    <Badge variant={rule.active ? "default" : "secondary"} className="text-xs">
                      {rule.active ? "Active" : "Inactive"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{rule.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => toggleStatus(rule.id)}>
                    {rule.active ? (
                      <PauseCircle className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <PlayCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(rule)}>
                    <Edit className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(rule.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-md bg-muted p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium">Message Template</span>
                  </div>
                  <p className="text-sm">{rule.message}</p>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-1.5">
                    {rule.triggerType === "Scheduled" ? (
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm">Trigger: {rule.triggerType}</span>
                  </div>
                  
                  {rule.delay && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Delay: {rule.delay}</span>
                    </div>
                  )}
                  
                  {rule.schedule && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Schedule: {rule.schedule}</span>
                    </div>
                  )}
                </div>
                
                {rule.keywords && (
                  <div className="pt-2">
                    <span className="text-xs text-muted-foreground">Keywords:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {rule.keywords.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
