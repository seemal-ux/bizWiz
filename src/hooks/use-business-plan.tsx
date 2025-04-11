
import { useState } from "react";
import { BusinessPlan } from "@/types/business-plan";
import { toast } from "sonner";

export function useBusinessPlan() {
  const [isLoading, setIsLoading] = useState(false);
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateBusinessPlan = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes - we'll create a mock business plan
      // In a real implementation, you would:
      // 1. Upload the file to a server
      // 2. Extract text from PDF/Word
      // 3. Send the text to OpenAI API
      // 4. Process the response into a business plan
      
      // Mock delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock business plan data
      const mockBusinessPlan: BusinessPlan = {
        executiveSummary: "This business plan outlines a strategy for launching a sustainable fashion brand focused on eco-friendly materials and ethical manufacturing practices. The company aims to address the growing consumer demand for environmentally responsible clothing options while maintaining competitive pricing and stylish designs.",
        businessDescription: "Our sustainable fashion brand will offer a range of clothing items made from organic, recycled, and innovative eco-friendly materials. All products will be manufactured in facilities that adhere to strict ethical standards, ensuring fair wages and safe working conditions for all employees.",
        marketAnalysis: "The sustainable fashion market is experiencing rapid growth, with a projected CAGR of 9.8% over the next five years. Consumer awareness of environmental issues in the fashion industry is increasing, driving demand for eco-friendly alternatives. Key target demographics include environmentally conscious millennials and Gen Z consumers with moderate to high disposable income.",
        competitiveAnalysis: "Major competitors include established sustainable brands like Patagonia and Reformation, as well as traditional fashion brands introducing eco-friendly lines. Our competitive advantage lies in our fully transparent supply chain, innovative use of new eco-materials, and digital-first marketing approach that resonates with younger consumers.",
        marketingStrategy: "Our marketing strategy will focus on digital channels, particularly Instagram and TikTok, to showcase our products and sustainability practices. We will collaborate with micro-influencers who align with our brand values, implement a robust content marketing strategy highlighting our environmental impact, and create an engaging community around sustainable fashion choices.",
        financialProjections: "Initial investment required is $250,000, with projected break-even at month 18. First-year revenue is estimated at $420,000, with 30% year-over-year growth for the following two years. Gross margins are expected to be 55%, with net profit margins reaching 12% by year three as economies of scale improve.",
        implementationPlan: "Launch timeline includes three months of product development, followed by a soft launch with a limited product line, expanding to full inventory within six months. Key milestones include securing sustainable material suppliers (Month 1), finalizing manufacturing partnerships (Month 2), website development (Month 3), and marketing campaign initiation (Month 3)."
      };
      
      setBusinessPlan(mockBusinessPlan);
      toast.success("Business plan generated successfully!");
    } catch (err) {
      console.error("Error in business plan generation:", err);
      setError("Failed to generate business plan. Please try again.");
      toast.error("Failed to generate business plan.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateBusinessPlan,
    isLoading,
    businessPlan,
    error
  };
}
