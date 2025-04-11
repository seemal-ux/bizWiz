
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Upload, File, FileText, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface AuthUser {
  email: string;
  token: string;
  rememberMe: boolean;
  expiresAt: number;
}

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  const handleSearch = () => {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }
    
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    
    // Mock search functionality for now
    toast.success(`Searching for "${searchQuery}" in ${file.name}`);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Document Search</h1>
        <p className="text-auth-muted">Upload a PDF or Word document to search for information.</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
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
              <h3 className="text-xl font-medium mb-2 text-white">Upload your document</h3>
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
                  {file.type.includes("pdf") ? (
                    <FileText className="h-6 w-6 text-burgundy" />
                  ) : (
                    <File className="h-6 w-6 text-burgundy" />
                  )}
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
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {file && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter search query..."
                className="flex-1 px-3 py-2 rounded-md bg-dark-300 border border-gray-600 text-white focus:outline-none focus:border-burgundy"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                onClick={handleSearch} 
                className="bg-burgundy hover:bg-burgundy-dark"
              >
                Search
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark-400 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Search Results</DialogTitle>
            <DialogDescription className="text-gray-300">
              Results for "{searchQuery}" in {file?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">This is a mock search result. In a real application, this would display actual search results from your document.</p>
            <div className="mt-4 p-3 bg-dark-500 rounded-md">
              <p className="text-sm text-gray-300">
                <span className="text-burgundy font-medium">Page 1:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <span className="bg-burgundy/30 px-1 rounded">"{searchQuery}"</span> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
            <div className="mt-2 p-3 bg-dark-500 rounded-md">
              <p className="text-sm text-gray-300">
                <span className="text-burgundy font-medium">Page 3:</span> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <span className="bg-burgundy/30 px-1 rounded">"{searchQuery}"</span> Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Home;
