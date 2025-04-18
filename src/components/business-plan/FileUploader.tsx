
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, X, Loader2, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useBusinessPlan } from "@/hooks/use-business-plan";
import { BusinessPlanOutput } from "@/components/business-plan/BusinessPlanOutput";
import { Progress } from "@/components/ui/progress";

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
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
    simulateUpload();
    toast.success(`${uploadedFile.name} uploaded successfully!`);
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setProcessingStage(null);
  };

  const handleGeneratePlan = async () => {
    if (!file) return;
    
    try {
      // Simulate processing stages
      const stages = [
        "Analyzing document structure...",
        "Extracting business details...",
        "Identifying market analysis...",
        "Compiling financial projections...",
        "Generating comprehensive plan..."
      ];
      
      for (let i = 0; i < stages.length; i++) {
        setProcessingStage(stages[i]);
        // Simulate processing time for each stage
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      await generateBusinessPlan(file);
      setProcessingStage(null);
    } catch (err) {
      console.error("Error generating business plan:", err);
      toast.error("Failed to generate business plan. Please try again later.");
      setProcessingStage(null);
    }
  };

  if (businessPlan) {
    return <BusinessPlanOutput businessPlan={businessPlan} onReset={() => {
      setFile(null);
      setProcessingStage(null);
      setUploadProgress(0);
    }} />;
  }

  return (
    <div className="space-y-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-white">Upload Business Document</h2>
      <p className="text-gray-400 mb-6">
        Upload your business document (PDF or Word) and we'll generate a comprehensive business plan based on its contents.
      </p>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-burgundy bg-burgundy/10' : 'border-gray-600 hover:border-burgundy'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 bg-burgundy/20 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-burgundy" />
            </div>
            <h3 className="text-xl font-medium mb-2">Upload Your Document</h3>
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
              className="bg-dark-300 hover:bg-dark-200 transition-colors"
            >
              <FileText className="mr-2 h-4 w-4" /> Browse Files
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-dark-300 rounded-md">
              <div className="flex items-center">
                <div className="bg-burgundy/20 p-3 rounded-full mr-3">
                  <File className="h-6 w-6 text-burgundy" />
                </div>
                <div className="text-left">
                  <p className="font-medium truncate max-w-[200px] sm:max-w-sm text-white">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={removeFile}
                className="text-gray-400 hover:text-white hover:bg-dark-400/50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {uploadProgress < 100 ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-1.5" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-green-400 py-2">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm">File ready for processing</span>
              </div>
            )}
          </div>
        )}
      </div>

      {file && uploadProgress === 100 && (
        <div className="space-y-4">
          {processingStage && (
            <div className="flex items-center space-x-2 bg-dark-300 p-3 rounded-md text-sm">
              <Loader2 className="h-4 w-4 animate-spin text-burgundy" /> 
              <span>{processingStage}</span>
            </div>
          )}
          
          <Button 
            onClick={handleGeneratePlan} 
            className="w-full bg-burgundy hover:bg-burgundy/80 text-white transition-colors"
            disabled={isLoading || processingStage !== null}
          >
            {isLoading || processingStage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {processingStage ? "Processing..." : "Generating Business Plan..."}
              </>
            ) : (
              "Generate Business Plan"
            )}
          </Button>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-md">
          Error: {error}
        </div>
      )}
    </div>
  );
}
