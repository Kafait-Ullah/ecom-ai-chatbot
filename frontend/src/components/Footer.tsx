
import React from 'react';
import { Github, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-foreground">EcomAI Chatbot</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Transform your business with AI-powered communication. Seamlessly integrate with Shopify, 
              custom websites, and social media platforms using advanced LangChain RAG technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#integrations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Developer</h3>
            <div className="space-y-3">
              <p className="text-muted-foreground font-medium">Kafait Ullah</p>
              
              <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <Globe size={16} />
                <a href="https://kafait.space" target="_blank" rel="noopener noreferrer" className="text-sm">
                  kafait.space
                </a>
              </div>
              
              <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={16} />
                <a href="mailto:kafaitbhatti.cs@gmail.com" className="text-sm">
                  kafaitbhatti.cs@gmail.com
                </a>
              </div>
              
              <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <Github size={16} />
                <a href="https://github.com/Kafait-Ullah" target="_blank" rel="noopener noreferrer" className="text-sm">
                  github.com/Kafait-Ullah
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 EcomAI Chatbot. Built with ❤️ by Kafait Ullah.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://kafait.space" target="_blank" rel="noopener noreferrer" 
               className="text-muted-foreground hover:text-foreground transition-colors">
              <Globe size={20} />
            </a>
            <a href="https://github.com/Kafait-Ullah" target="_blank" rel="noopener noreferrer"
               className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
            <a href="mailto:kafaitbhatti.cs@gmail.com"
               className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
