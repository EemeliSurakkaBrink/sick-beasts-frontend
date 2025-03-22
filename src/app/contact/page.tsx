/**
 * Contact page with form for customer inquiries
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    submitted: false,
    error: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formState.name || !formState.email || !formState.message) {
      setFormState({ ...formState, error: true });
      return;
    }
    
    // Simulate form submission - in a real app this would call an API
    setFormState({
      ...formState,
      submitted: true,
      error: false,
    });
    
    // Reset form after submission
    setTimeout(() => {
      setFormState({
        name: "",
        email: "",
        message: "",
        submitted: false,
        error: false,
      });
    }, 5000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="font-punk text-3xl md:text-4xl text-center mb-8">
          <span className="text-primary">CONTACT</span> US
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-punk text-2xl mb-4">GET IN TOUCH</h2>
              <p className="text-muted-foreground">
                Have questions about our products or sustainability practices? 
                Want to partner with us? Send us a message and we&apos;ll get back to you as soon as possible.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-card p-2 rounded">
                  <span className="text-primary">📍</span>
                </div>
                <div>
                  <h3 className="font-punk">ADDRESS</h3>
                  <p className="text-muted-foreground">123 Skate Street, Eco City, EC 12345</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-card p-2 rounded">
                  <span className="text-primary">📧</span>
                </div>
                <div>
                  <h3 className="font-punk">EMAIL</h3>
                  <p className="text-muted-foreground">hello@sickbeasts.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-card p-2 rounded">
                  <span className="text-primary">📱</span>
                </div>
                <div>
                  <h3 className="font-punk">SOCIAL</h3>
                  <p className="text-muted-foreground">@sickbeasts on Instagram</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card p-6 rounded-lg">
            {formState.submitted ? (
              <div className="text-center py-8">
                <h2 className="font-punk text-2xl text-primary mb-4">Message Sent!</h2>
                <p className="text-muted-foreground">
                  Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-punk mb-2">NAME</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-punk mb-2">EMAIL</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block font-punk mb-2">MESSAGE</label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  ></textarea>
                </div>
                
                {formState.error && (
                  <p className="text-primary">Please fill out all fields.</p>
                )}
                
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 