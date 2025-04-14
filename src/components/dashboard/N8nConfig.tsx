
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DashboardCard } from "./DashboardCard";
import { Loader2 } from "lucide-react";

export function N8nConfig() {
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ideaGenerated, setIdeaGenerated] = useState<boolean>(false);
  const [businessIdea, setBusinessIdea] = useState<string>("");
  
  useEffect(() => {
    // Load saved webhook URL from localStorage
    const savedWebhook = localStorage.getItem("n8nWebhookUrl");
    if (savedWebhook) {
      setWebhookUrl(savedWebhook);
    }
  }, []);

  const saveWebhook = () => {
    if (!webhookUrl.trim()) {
      toast.error("Please enter a webhook URL");
      return;
    }

    localStorage.setItem("n8nWebhookUrl", webhookUrl);
    toast.success("Webhook URL saved successfully");
  };

  const triggerWorkflow = async () => {
    if (!webhookUrl.trim()) {
      toast.error("Please enter your n8n webhook URL first");
      return;
    }

    setIsLoading(true);
    setIdeaGenerated(false);
    
    try {
      // Get user email from localStorage for personalization
      const authUser = localStorage.getItem("authUser");
      const userEmail = authUser ? JSON.parse(authUser).email : "user";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Handle CORS issues
        body: JSON.stringify({
          email: userEmail,
          timestamp: new Date().toISOString(),
          action: "generate_business_idea",
          parameters: {
            industry: "technology",
            target: "small business"
          }
        }),
      });
      
      // Since we're using no-cors, we create a simulated response
      // In a real app, n8n would send the response back via a webhook
      setTimeout(() => {
        const ideas = [
          "Sustainable packaging solutions for e-commerce businesses",
          "AI-powered content optimization platform for small blogs",
          "Virtual reality training platform for remote employee onboarding",
          "Subscription-based eco-friendly home cleaning products",
          "On-demand mental health support app for entrepreneurs"
        ];
        
        const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
        setBusinessIdea(randomIdea);
        setIdeaGenerated(true);
        setIsLoading(false);
        toast.success("Business idea generated!");
      }, 2000);
      
    } catch (error) {
      console.error("Error triggering n8n workflow:", error);
      toast.error("Failed to trigger workflow. Check your webhook URL.");
      setIsLoading(false);
    }
  };

  return (
    <DashboardCard title="Business Idea Generator" className="mt-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm text-auth-muted mb-2 block">
            Your n8n Webhook URL
          </label>
          <div className="flex space-x-2">
            <Input 
              type="text"
              placeholder="https://your-n8n-instance.com/webhook/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="bg-white/5 text-white border-white/20 focus-visible:ring-auth-accent"
            />
            <Button 
              onClick={saveWebhook}
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              Save
            </Button>
          </div>
          <p className="text-xs text-auth-muted mt-2">
            Enter the webhook URL from your n8n instance to connect the workflow
          </p>
        </div>

        <Button 
          onClick={triggerWorkflow} 
          className="w-full bg-auth-accent hover:bg-auth-accent/80"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Idea...
            </>
          ) : (
            "Generate Business Idea"
          )}
        </Button>

        {ideaGenerated && businessIdea && (
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <h3 className="font-medium text-white mb-1">Your Business Idea:</h3>
            <p className="text-auth-muted">{businessIdea}</p>
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
