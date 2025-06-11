import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-foreground">EcomAI Chatbot</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </a>
            
            <a href="#technical-specifications" className="text-muted-foreground hover:text-foreground transition-colors">
              Technical Specifications
            </a>
          </nav>
          
          <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white" onClick={() => window.location.href = 'https://kafait.space'}>
            Book a Demo
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
