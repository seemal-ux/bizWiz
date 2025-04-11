
import React from "react";
import { FileUploader } from "@/components/business-plan/FileUploader";
import { BusinessPlanLayout } from "@/components/business-plan/BusinessPlanLayout";

const BusinessPlanGenerator = () => {
  return (
    <BusinessPlanLayout>
      <FileUploader />
    </BusinessPlanLayout>
  );
};

export default BusinessPlanGenerator;
