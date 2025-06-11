
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Benefits from '@/components/Benefits';
import EcomAIChatbot from '@/components/ChatBot.tsx';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero isOpen={isOpen} setIsOpen={setIsOpen} />
      <Features />
      <Benefits />
      <section id="technical-specifications" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technical Specifications</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technical details about our EcomAI Chatbot
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-b from-background to-muted/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-2">
                  💻
                </div>
                <div className="text-sm text-muted-foreground mb-4"></div>
                <h3 className="text-lg font-semibold mb-3">Frontend</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Next.js 14, TypeScript, Tailwind CSS</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-b from-background to-muted/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-2">
                  🐍
                </div>
                <div className="text-sm text-muted-foreground mb-4"></div>
                <h3 className="text-lg font-semibold mb-3">Backend</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Python, LangChain, FastAPI</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-b from-background to-muted/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-2">
                  🧠
                </div>
                <div className="text-sm text-muted-foreground mb-4"></div>
                <h3 className="text-lg font-semibold mb-3">AI/ML</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">OpenAI GPT-4, FAISS, Embeddings</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-b from-background to-muted/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-2">
                  🚀
                </div>
                <div className="text-sm text-muted-foreground mb-4"></div>
                <h3 className="text-lg font-semibold mb-3">Deployment</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Vercel, Docker, GitHub Actions</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-b from-background to-muted/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-2">
                  🗄️
                </div>
                <div className="text-sm text-muted-foreground mb-4"></div>
                <h3 className="text-lg font-semibold mb-3">Data</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">CSV processing, Vector embeddings</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <EcomAIChatbot isOpen={isOpen} setIsOpen={setIsOpen} />
      <Footer />
    </div>
  );
};

export default Index;
