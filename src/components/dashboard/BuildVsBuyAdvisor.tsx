
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
  
  const form = useForm<BuildVsBuyFormData>();

  const onSubmit = async (data: BuildVsBuyFormData) => {
    setIsLoading(true);
    
    try {
      // Replace this URL with your actual n8n webhook URL
      const response = await fetch("YOUR_N8N_WEBHOOK_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Failed to get recommendation");
      
      const result = await response.json();
      setAnalysis(result.recommendation);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get recommendation. Please try again.");
    } finally {
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
            className="w-full"
          >
            <Send className="mr-2 h-4 w-4" />
            {isLoading ? "Analyzing..." : "Get Recommendation"}
          </Button>
        </form>
      </Form>

      {analysis && (
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-lg font-medium text-white mb-2">Analysis Result</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{analysis}</p>
        </div>
      )}
    </DashboardCard>
  );
};
