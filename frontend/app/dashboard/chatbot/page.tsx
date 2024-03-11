'use client'

// react 
import React, { useState, useEffect } from 'react';
// components
import SelectModel from '@/app/ui/chatbot/select-model';
import SelectFile from '@/app/ui/chatbot/select-file';
//font 
import { lato } from "@/app/ui/fonts";
import ChatInterface from '@/app/ui/chatbot/chat-interface';

// enums 
import { ReceiverType } from '@/app/lib/enum';
import { File } from '@/app/lib/models';


const Chatbot = () => {
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<string>("");


    return (
        <main className=' flex flex-col md:p-6  gap-10'>
            {/* <h1 className={`${lato.className} text-4xl`}>Chat</h1> */}
            <div className='h-auto w-full'>
                <div className='flex md:flex-row flex-col w-full h-[128px] md:space-x-2.5 md:space-y-0 space-y-2.5'>
                    <SelectModel selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
                    <SelectFile selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                </div>
            </div>
            <div className='flex-grow w-full'>
                <ChatInterface selectedModel={selectedModel} selectedFile={selectedFile} />
            </div>
        </main>
    );
}

export default Chatbot;