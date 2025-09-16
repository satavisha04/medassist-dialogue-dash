import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  History, 
  Calendar as CalendarIcon, 
  Shield, 
  HelpCircle, 
  Mail, 
  Menu,
  Send,
  Bot,
  User,
  Stethoscope,
  Activity,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Droplets,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m SwasthyaAI, your medical assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentDate] = useState(new Date());

  const tabs: TabItem[] = [
    { id: 'chat', label: 'Chat', icon: <MessageCircle className="w-5 h-5 flex-shrink-0" /> },
    { id: 'history', label: 'Chat History', icon: <History className="w-5 h-5 flex-shrink-0" /> },
    { id: 'vaccine', label: 'Vaccine Scheduler', icon: <Shield className="w-5 h-5 flex-shrink-0" /> },
    { id: 'help', label: 'Help', icon: <HelpCircle className="w-5 h-5 flex-shrink-0" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-5 h-5 flex-shrink-0" /> },
  ];

  const diseaseInfo = [
    {
      name: 'Dengue',
      symptoms: ['High fever', 'Severe headache', 'Joint pain', 'Rash'],
      prevention: ['Eliminate stagnant water', 'Use mosquito nets', 'Wear long sleeves'],
      risk: 'high',
    },
    {
      name: 'Malaria',
      symptoms: ['Fever', 'Chills', 'Sweating', 'Fatigue'],
      prevention: ['Use bed nets', 'Apply repellent', 'Take antimalarial drugs'],
      risk: 'medium',
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('dengue')) {
      return 'Dengue is a mosquito-borne viral infection. Common symptoms include high fever, severe headache, pain behind eyes, muscle and joint pains. Prevention includes eliminating mosquito breeding sites and using protective clothing. Seek immediate medical attention if you experience warning signs.';
    } else if (input.includes('malaria')) {
      return 'Malaria is caused by parasites transmitted through infected mosquito bites. Symptoms include fever, chills, and flu-like illness. Prevention includes using bed nets, antimalarial medication, and mosquito repellent. Early diagnosis and treatment are crucial.';
    } else if (input.includes('vaccine')) {
      return 'I can help you schedule vaccinations. Please specify which vaccine you need, or visit the Vaccine Scheduler tab for more options. Remember to keep your vaccination records updated.';
    } else if (input.includes('fever')) {
      return 'Fever can be a symptom of various conditions. Monitor your temperature, stay hydrated, and rest. If fever persists above 102°F (38.9°C) for more than 3 days, or if you experience severe symptoms, please consult a healthcare provider immediately.';
    } else {
      return 'Thank you for your question. I\'m here to provide health information and guidance. For specific medical concerns, please consult with a qualified healthcare provider. How else can I assist you today?';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderCalendar = () => {
    const today = currentDate.getDate();
    const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
    const year = currentDate.getFullYear();
    
    return (
      <div className="glass-card rounded-2xl p-4 mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          {month} {year}
        </h3>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="text-center text-muted-foreground font-medium p-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 6; // Adjust based on month start
            const isToday = day === today;
            return (
              <div
                key={i}
                className={`text-center p-2 rounded-lg transition-colors ${
                  isToday 
                    ? 'bg-primary text-primary-foreground font-bold animate-glow' 
                    : day > 0 && day <= 31 
                      ? 'hover:bg-accent text-foreground' 
                      : 'text-muted-foreground/30'
                }`}
              >
                {day > 0 && day <= 31 ? day : ''}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className={`glass-panel transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-16'} border-r border-glass-border`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-glass-border">
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-primary-foreground" />
                  </div>
                  {sidebarOpen && (
                    <div>
                      <h1 className="text-xl font-bold text-primary">SwasthyaAI</h1>
                      <p className="text-sm text-muted-foreground">Medical Assistant</p>
                    </div>
                  )}
                </div>
                {sidebarOpen && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                )}
              </div>
              {!sidebarOpen && (
                <div className="flex justify-center mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="flex-1 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    } ${!sidebarOpen ? 'justify-center px-2 py-3' : 'px-3 py-3'}`}
                  >
                    {tab.icon}
                    {sidebarOpen && <span className="font-medium">{tab.label}</span>}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="glass-panel border-b border-glass-border p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-foreground">SwasthyaAI Assistant</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <p className="text-sm text-muted-foreground">Online & Ready to Help</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="h-full custom-scrollbar overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 animate-fade-in ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={message.sender === 'user' ? 'bg-chat-user' : 'bg-primary'}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'chat-bubble-user rounded-tr-md'
                        : 'chat-bubble-bot rounded-tl-md'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-3 animate-fade-in">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="chat-bubble-bot rounded-tl-md px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="glass-panel border-t border-glass-border p-4">
            <div className="flex items-center gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about symptoms, diseases, or health advice..."
                className="flex-1 bg-glass border-glass-border focus:border-primary"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-primary hover:bg-primary-glow text-primary-foreground"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Suggestions */}
        <div className="w-80 glass-panel border-l border-glass-border">
          <div className="h-full overflow-y-auto custom-scrollbar p-4">
            {/* Monthly Suggestions Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-primary mb-2">
                {currentDate.toLocaleDateString('en-US', { month: 'long' })} Suggestions
              </h2>
              <p className="text-sm text-muted-foreground">Health tips and alerts for this month</p>
            </div>

            {/* Calendar */}
            {renderCalendar()}

            {/* Weather Alert */}
            <Card className="glass-card border-warning mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-warning" />
                  <CardTitle className="text-warning text-lg">Rainy Season Alert</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Increased risk of water-borne diseases during monsoon season.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-warning border-warning">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    High Alert
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Disease Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Common Diseases & Prevention
              </h3>
              
              {diseaseInfo.map((disease, index) => (
                <Card key={index} className="glass-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-foreground text-base">{disease.name}</CardTitle>
                      <Badge 
                        variant={disease.risk === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {disease.risk} risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium text-primary mb-1">Symptoms:</h5>
                      <div className="flex flex-wrap gap-1">
                        {disease.symptoms.map((symptom, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-primary mb-1">Prevention:</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {disease.prevention.map((tip, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-primary">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle className="text-primary text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Schedule Vaccination
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Emergency Contacts
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Health Checkup
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;