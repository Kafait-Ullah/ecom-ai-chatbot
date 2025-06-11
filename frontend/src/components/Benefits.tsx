
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Benefits = () => {
  const benefits = [
    {
      title: "Open Source",
      description: "Full GitHub repository with documentation",
      icon: " </>"
    },
    {
      title: "Customizable",
      description: "Modular LangChain agent architecture",
      icon: " ⚙️"
    },
    {
      title: "Production Ready",
      description: "Docker containerization included",
      icon: " 🐳"
    },
    {
      title: "Cost Effective",
      description: "Local FAISS vs expensive vector databases",
      icon: " 💸"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Developer Focused Benefits</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technical advantages for developers using our EcomAI Chatbot
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-b from-background to-muted/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-2">
                  {benefit.icon}
                </div>
                <div className="text-sm text-muted-foreground mb-4"></div>
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
