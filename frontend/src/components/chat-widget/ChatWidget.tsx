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
  welcomeMessage = "Hi! How can I assist you?",
  themeColor = 'from-blue-600 to-teal-500',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const animationHasRun = useRef(false);
  const [showFAQs, setShowFAQs] = useState(true);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Generate a unique session ID when the component mounts
    setSessionId(Date.now().toString(36) + Math.random().toString(36).substr(2));
  }, []);

  const faqSuggestions = [
    "How do I track my order?",
    "What is your return policy?",
    "Can you recommend some electronics?",
  ];

  const handleFAQClick = (question: string) => {
    setInputMessage(question);
    setShowFAQs(false);
    // We need to trigger handleSendMessage, but the state update is async.
    // Awaiting a small timeout can help, or we can pass the message directly.
    // For simplicity, we'll rely on a useEffect to watch for inputMessage change,
    // but a more robust solution might pass the message directly.
    // Let's just call it directly for now.
    handleSendMessage(question);
  };

  const handleSendMessage = async (messageToSend?: string) => {
    const currentMessage = messageToSend || inputMessage;
    if (!currentMessage.trim()) return;

    setShowFAQs(false);

    const newMessage: Message = {
      id: messages.length + 1,
      text: currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId,
        },
        body: JSON.stringify({ message: currentMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const aiResponse: Message = {
        id: messages.length + 2,
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      let errorMessage = "Sorry, I'm having trouble connecting to the server. Please try again later.";
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = "It seems you're offline. Please check your internet connection and try again.";
      }
      const errorResponse: Message = {
        id: messages.length + 2,
        text: errorMessage,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Info Card Overlay */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center animate-fade-in">
          <div className={`transition-all duration-300 ${
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
        </div>
      )}

      {/* Chat Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end space-y-2">
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
      <div className={`fixed z-50 transition-all duration-500 ease-in-out transform-origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      } w-full h-full sm:w-96 sm:h-[500px] bottom-0 right-0 sm:bottom-24 sm:right-6`}>
        <Card className="w-full h-full sm:w-96 sm:h-[500px] shadow-2xl border-0 bg-background/95 backdrop-blur-md rounded-none sm:rounded-lg">
          <CardHeader className={`bg-gradient-to-r ${themeColor} text-white rounded-t-none sm:rounded-t-lg`}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{title} </CardTitle>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-white hover:bg-white/20 p-1 h-auto"
                >
                  <Info className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm opacity-90">Online</span>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[calc(100%-70px)] sm:h-[calc(100%-70px)]">
            {/* {!userEmail ? (
              <div className="flex flex-col justify-center items-center h-full p-6 text-center animate-fade-in">
                <MessageCircle className={`w-12 h-12 mb-4 text-blue-500`} />
                <h2 className="text-xl font-semibold mb-2">Please leave your email address</h2>
                <p className="text-muted-foreground mb-6">so we can contact you:</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const email = (e.target as any).email.value;
                    if (gdprChecked) {
                      setUserEmail(email);
                    } else {
                      alert("Please accept the terms to continue.");
                    }
                  }}
                  className="w-full max-w-sm"
                >
                  <Input name="email" type="email" placeholder="Enter your email..." className="w-full mb-4" required />
                  <div className="flex items-start space-x-2 mb-4">
                    <input type="checkbox" id="gdpr" checked={gdprChecked} onChange={() => setGdprChecked(!gdprChecked)} className="mt-1" />
                    <label htmlFor="gdpr" className="text-xs text-muted-foreground text-left">
                      I understand and acknowledge that my personal data will be processed and transmitted in accordance with the General Data Protection Regulation (GDPR).
                    </label>
                  </div>
                  <Button type="submit" className={`w-full bg-gradient-to-r ${themeColor}`} disabled={!gdprChecked}>
                    Send
                  </Button>
                </form>
              </div>
            ) : ( */}
              <>
                <ScrollArea className="flex-1 p-4" scrollbar-none>
                  <div className="space-y-4">
                    {messages.length === 0 && (
                      <div className="flex justify-start animate-fade-in-up">
                        <div className="max-w-[80%] p-3 rounded-lg bg-muted text-foreground rounded-bl-none">
                          <p className="text-sm">{welcomeMessage}</p>
                          <span className="text-xs opacity-70 text-muted-foreground">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    )}

                    {showFAQs && messages.length === 0 && (
                      <div className="flex flex-col items-center space-y-2 animate-fade-in">
                        <p className="text-sm text-muted-foreground">Or ask one of these questions:</p>
                        {faqSuggestions.map((faq, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full text-left backdrop-blur-sm bg-white/10"
                            onClick={() => handleFAQClick(faq)}
                          >
                            {faq}
                          </Button>
                        ))}
                      </div>
                    )}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
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
                    {isTyping && (
                      <div className="flex justify-start animate-fade-in-up">
                        <div className="bg-muted text-foreground rounded-lg p-3 rounded-bl-none">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t border-border">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => {
                        setInputMessage(e.target.value);
                        if (e.target.value) setShowFAQs(false);
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      className={`bg-gradient-to-r ${themeColor} hover:from-blue-700 hover:to-teal-600 px-3`}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            {/* )} */}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ChatWidget;
