
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Phone, Mail, MapPin, User } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log("Contact form data:", formData);
    
    // Show success message
    toast.success("Message sent successfully!");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      message: ""
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">Contact Us</h1>
        <p className="text-auth-muted mt-2">Get in touch with our team for support or inquiries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 flex items-start space-x-4">
            <div className="bg-auth-accent/20 p-3 rounded-full">
              <Phone className="h-6 w-6 text-auth-accent" />
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">Phone</h3>
              <p className="text-auth-muted">+1 (555) 123-4567</p>
              <p className="text-auth-muted">Mon-Fri, 9am-5pm EST</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 flex items-start space-x-4">
            <div className="bg-auth-accent/20 p-3 rounded-full">
              <Mail className="h-6 w-6 text-auth-accent" />
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">Email</h3>
              <p className="text-auth-muted">support@auth.io</p>
              <p className="text-auth-muted">sales@auth.io</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 flex items-start space-x-4">
            <div className="bg-auth-accent/20 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-auth-accent" />
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">Address</h3>
              <p className="text-auth-muted">123 Tech Plaza</p>
              <p className="text-auth-muted">San Francisco, CA 94107</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name <span className="text-auth-accent">*</span></Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <User className="h-4 w-4" />
                    </div>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 bg-white/5 text-white border-white/20 focus-visible:ring-auth-accent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email <span className="text-auth-accent">*</span></Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 bg-white/5 text-white border-white/20 focus-visible:ring-auth-accent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 bg-white/5 text-white border-white/20 focus-visible:ring-auth-accent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">Address</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="pl-10 bg-white/5 text-white border-white/20 focus-visible:ring-auth-accent"
                      placeholder="123 Main St, City, Country"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">Message <span className="text-auth-accent">*</span></Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[120px] bg-white/5 text-white border-white/20 focus-visible:ring-auth-accent"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div className="mt-6">
                <Button type="submit" className="w-full sm:w-auto bg-auth-accent hover:bg-auth-accent/80">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contact;
