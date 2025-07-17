import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Info } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWidgetProps {
  title?: string;
  welcomeMessage?: string;
  themeColor?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  title = 'AI Assistant',
  welcomeMessage = "Hi! I'm your AI assistant. I can help you with product recommendations, order tracking, and answer any questions about our services. How can I assist you today?",
  themeColor = 'from-blue-600 to-teal-500',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: welcomeMessage,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response (you'll replace this with your backend API)
    setTimeout(() => {
      const responses = [
        "Thank you for your message! I'm processing your request...",
        "I'd be happy to help you with that. Let me find the best solution for you.",
        "That's a great question! Based on your query, I recommend checking our latest products.",
        "I understand your concern. Let me provide you with the most accurate information."
      ];
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {/* Info Card */}
      <div className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ${
        showInfo ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        <Card className="w-96 shadow-2xl border-0 bg-background/95 backdrop-blur-md">
          <CardHeader className={`bg-gradient-to-r ${themeColor} text-white rounded-t-lg`}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">About this Chatbot</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInfo(false)}
                className="text-white hover:bg-white/20 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Our AI ChatBot seamlessly integrates with Shopify, custom websites, and social media platforms. 
              Powered by advanced LangChain RAG technology, it trains on your real-time data to provide 
              intelligent customer support, product recommendations, and automated assistance 24/7.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        <Button
          onClick={() => setShowInfo(!showInfo)}
          className={`w-14 h-14 rounded-full bg-gray-500 hover:bg-gray-600 shadow-lg transition-all duration-300`}
        >
          <Info className="w-6 h-6 text-white" />
        </Button>
        <Button
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 rounded-full bg-gradient-to-r ${themeColor} hover:from-blue-700 hover:to-teal-600 shadow-lg transition-all duration-300 ${
            isOpen ? 'scale-0' : 'scale-100'
          }`}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        <Card className="w-96 h-[500px] shadow-2xl border-0 bg-background/95 backdrop-blur-md">
          <CardHeader className={`bg-gradient-to-r ${themeColor} text-white rounded-t-lg`}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm opacity-90">Online</span>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 h-[380px] flex flex-col">
            <ScrollArea className="flex-1 p-4" scrollbar-none>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser
                          ? `bg-gradient-to-r ${themeColor} text-white rounded-br-none`
                          : 'bg-muted text-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className={`text-xs opacity-70 ${
                        message.isUser ? 'text-blue-100' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className={`bg-gradient-to-r ${themeColor} hover:from-blue-700 hover:to-teal-600 px-3`}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ChatWidget;
