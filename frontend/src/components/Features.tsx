
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      title: "FAQ Support",
      description: "Answers common questions using a vector store for quick retrieval of information.",
      icon: "🔧"
    },
    {
      title: "Product Recommendations",
      description: "Suggests products based on user queries, enhancing the shopping experience.",
      icon: "⚡"
    },
    {
      title: "Order Tracking",
      description: "Provides order status updates from CSV data, keeping customers informed.",
      icon: "🗃️"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the features of our EcomAI Chatbot
          </p>
        </div>
        
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-background/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-2">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
