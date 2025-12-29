"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
    role: 'user' | 'bot';
    content: string;
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', content: 'Hello! I am your HR Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/chat`, { query: userMessage });
            setMessages(prev => [...prev, { role: 'bot', content: response.data.answer }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`p-2 rounded-full ${msg.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                            {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
                        </div>
                        <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'user'
                            ? 'bg-blue-500/20 text-blue-100 rounded-tr-none'
                            : 'bg-purple-500/20 text-purple-100 rounded-tl-none'
                            }`}>
                            <div className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown>
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-purple-500">
                            <Bot size={20} className="text-white" />
                        </div>
                        <div className="p-4 rounded-2xl bg-purple-500/20 text-purple-100 rounded-tl-none flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" /> Thinking...
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 bg-black/20 border-t border-white/10">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask about HR policies..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
