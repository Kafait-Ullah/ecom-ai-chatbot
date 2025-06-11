import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ isOpen, setIsOpen }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 pt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Transform Your Business
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              with AI-Powered
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-500">
              Communication
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Our AI ChatBot seamlessly integrates with Shopify, custom websites, and social media platforms. 
            Powered by advanced LangChain RAG technology, it trains on your real-time data to provide 
            intelligent customer support, product recommendations, and automated assistance 24/7.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-3 text-lg" onClick={() => setIsOpen(true)}>
              See in Action
            </Button>
            <a href="https://kafait.space" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
                Book a Demo
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
