"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        setUploadStatus(null);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/upload`, formData);
            setUploadStatus({ type: 'success', message: 'File uploaded successfully!' });
        } catch (error) {
            setUploadStatus({ type: 'error', message: 'Upload failed. Please try again.' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upload Card */}
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                            <Upload size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Upload Policy</h3>
                    </div>
                    <div className="relative group">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleUpload}
                            disabled={uploading}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center group-hover:border-purple-500/50 transition-colors">
                            <FileText className="mx-auto text-white/40 mb-2 group-hover:text-purple-400 transition-colors" size={32} />
                            <p className="text-white/60 group-hover:text-white transition-colors">
                                {uploading ? 'Processing...' : 'Drop PDF here or click to upload'}
                            </p>
                        </div>
                    </div>
                    {uploadStatus && (
                        <div className={`mt-4 p-3 rounded-xl flex items-center gap-2 ${uploadStatus.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                            }`}>
                            {uploadStatus.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                            <span className="text-sm">{uploadStatus.message}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
