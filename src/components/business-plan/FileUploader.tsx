
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useBusinessPlan } from "@/hooks/use-business-plan";
import { BusinessPlanOutput } from "@/components/business-plan/BusinessPlanOutput";

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { generateBusinessPlan, isLoading, businessPlan, error } = useBusinessPlan();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (uploadedFile: File) => {
    const validFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const fileType = uploadedFile.type;
    
    if (!validFileTypes.includes(fileType)) {
      toast.error("Invalid file type. Please upload a PDF or Word document.");
      return;
    }
    
    if (uploadedFile.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File is too large. Maximum file size is 10MB.");
      return;
    }
    
    setFile(uploadedFile);
    toast.success(`${uploadedFile.name} uploaded successfully!`);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleGeneratePlan = async () => {
    if (!file) return;
    
    try {
      await generateBusinessPlan(file);
    } catch (err) {
      console.error("Error generating business plan:", err);
      toast.error("Failed to generate business plan. Please try again later.");
    }
  };

  if (businessPlan) {
    return <BusinessPlanOutput businessPlan={businessPlan} onReset={() => setFile(null)} />;
  }

  return (
    <div className="space-y-6">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-burgundy bg-dark-400' : 'border-gray-600 hover:border-burgundy'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Upload your document</h3>
            <p className="text-gray-400 mb-4 max-w-md mx-auto">
              Drag and drop your PDF or Word document, or click to browse files
            </p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              variant="outline"
              className="bg-dark-300"
            >
              Browse Files
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-dark-300 rounded-md">
            <div className="flex items-center">
              <div className="bg-burgundy/20 p-2 rounded-md mr-3">
                <File className="h-6 w-6 text-burgundy" />
              </div>
              <div className="text-left">
                <p className="font-medium truncate max-w-[200px] sm:max-w-sm">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {file && (
        <Button 
          onClick={handleGeneratePlan} 
          className="w-full bg-burgundy hover:bg-burgundy-dark"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Business Plan...
            </>
          ) : (
            "Generate Business Plan"
          )}
        </Button>
      )}

      {error && (
        <div className="text-red-500 text-sm mt-2">
          Error: {error}
        </div>
      )}
    </div>
  );
}
