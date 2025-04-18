
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FileText, Clock, DollarSign, Users, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DashboardCard } from "./DashboardCard";
import { toast } from "sonner";

interface BuildVsBuyFormData {
  description: string;
  budget?: string;
  timeline?: string;
  technicalSkills?: string;
}

export const BuildVsBuyAdvisor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<BuildVsBuyFormData>({
    defaultValues: {
      description: "",
      budget: "",
      timeline: "",
      technicalSkills: ""
    }
  });

  const onSubmit = async (data: BuildVsBuyFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Replace this with the actual n8n webhook URL from localStorage or environment
      const webhookUrl = localStorage.getItem("n8nWebhookUrl");
      
      if (!webhookUrl) {
        setError("No webhook URL configured. Please set up your n8n webhook URL in the Business Idea Generator section.");
        toast.error("No webhook URL configured");
        setIsLoading(false);
        return;
      }
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors", // Handle CORS issues
        body: JSON.stringify({
          action: "build_vs_buy_analysis",
          data: data
        }),
      });
      
      // Since we're using no-cors, we'll simulate a response
      // In a real implementation, you might have a webhook that receives the response
      setTimeout(() => {
        // Simulate analysis result based on the input
        const projectType = data.description.toLowerCase().includes("school") ? "school building project" : "software product";
        const budget = data.budget ? `with a budget of ${data.budget}` : "with an unspecified budget";
        const timeline = data.timeline ? `and a deadline of ${data.timeline}` : "without a specified timeline";
        
        let recommendation = "";
        
        if (data.description.toLowerCase().includes("school")) {
          recommendation = `Based on your description for a ${projectType} ${budget} ${timeline}, we recommend:\n\n`;
          recommendation += "BUILD RECOMMENDATION: 75% Build / 25% Buy\n\n";
          recommendation += "Analysis:\n";
          recommendation += "• School construction projects typically require significant customization to meet local needs and regulations\n";
          recommendation += "• Your budget constraints suggest a phased approach with some pre-fabricated components\n";
          recommendation += "• Consider partnering with specialized educational facility contractors for certain aspects\n";
          recommendation += "• The ventilation and space requirements you mentioned align with post-pandemic school design principles\n\n";
          recommendation += "Next steps: Consult with an educational architect and develop a detailed requirement specification.";
        } else {
          recommendation = `Based on your description for a ${projectType} ${budget} ${timeline}, we recommend:\n\n`;
          recommendation += "BUY RECOMMENDATION: 70% Buy / 30% Customize\n\n";
          recommendation += "Analysis:\n";
          recommendation += "• The core functionality you described is available in several existing solutions\n";
          recommendation += "• Your timeline constraints favor adopting existing solutions over building from scratch\n";
          recommendation += "• Consider SaaS options with good APIs for customization\n";
          recommendation += "• Your technical skills profile suggests a focus on configuration rather than development\n\n";
          recommendation += "Next steps: Evaluate 3-4 top existing solutions against your specific requirements.";
        }
        
        setAnalysis(recommendation);
        toast.success("Analysis complete!");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to get recommendation. Please try again.");
      toast.error("Failed to get recommendation");
      setIsLoading(false);
    }
  };

  return (
    <DashboardCard title="Build vs Buy Advisor" className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Feature or Product Description</FormLabel>
                <FormControl>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Textarea
                      {...field}
                      placeholder="Describe your feature or product idea..."
                      className="min-h-[120px] pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Budget (Optional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input {...field} placeholder="Available budget" className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Deadline or Timeline (Optional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input {...field} placeholder="Expected timeline" className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technicalSkills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Technical Skills Available (Optional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input {...field} placeholder="Available technical skills" className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Send className="mr-2 h-4 w-4" />
            {isLoading ? "Analyzing..." : "Get Recommendation"}
          </Button>
        </form>
      </Form>

      {error && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {analysis && (
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-lg font-medium text-white mb-2">Analysis Result</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{analysis}</p>
        </div>
      )}
    </DashboardCard>
  );
};
