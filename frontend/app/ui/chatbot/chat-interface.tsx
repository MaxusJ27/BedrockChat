
'use client'
import React, { useState, useEffect, useRef } from 'react';

// lib 
import { useDebounce } from 'use-debounce';
import clsx from 'clsx';
// component
import Button from "../neurobutton";

import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { createMessage } from '@/app/api/chatbot';
import ChatBubble from './chat-bubbles';
import { ReceiverType } from '@/app/lib/enum';

type Message = {
    receiver: ReceiverType;
    message: string;
};


const ChatInterface = ({ selectedModel, selectedFile }: { selectedModel: string, selectedFile: string }) => {
    const [value, setValue] = useState<string>("");
    const [userInput] = useDebounce(value, 300);
    const [message, setMessage] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (lastMessageRef.current as any) {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [message]);

    const sendMessage = async (event: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        event.preventDefault();
        setLoading(true);
        setMessage((prevMessages) => [...prevMessages, { receiver: ReceiverType.USER, message: userInput }]);
        const formData = new FormData();
        formData.append('message', userInput);
        formData.append('model', selectedModel);
        formData.append('file', selectedFile);
        const response = await createMessage(formData);
        setMessage((prevMessages) => [...prevMessages, { receiver: ReceiverType.BOT, message: response.message }]);
        setLoading(false);

    }


    return (
        <div className='flex flex-col h-[600px] w-full bg-black items-start'>
            <div className='flex-grow overflow-y-scroll w-full p-2'>
                {
                    message.map((msg, index) => {
                        return <ChatBubble key={index} receiver={msg.receiver} message={msg.message} ref={index === message.length - 1 ? lastMessageRef : null}
                        />
                    })
                }
            </div>


            <div className='flex flex-row w-full justify-center'>
                <input
                    type="text"
                    id="chatbot"
                    name="chatbot"
                    className='bg-gray-600 text-white w-full px-2 rounded-md'
                    onChange={(e: any) => {
                        setValue(e.target.value);
                    }}
                />
                <Button type="submit" disabled={loading} onClick={(event) => { sendMessage(event) }}
                    className={clsx('flex flex-row space-x-2.5 w-auto px-10 py-2 ',
                        { loading: 'shadow-none cursor-not-allowed text-orange-500 bg-gray-500' }
                    )}
                >Submit <ChatBubbleBottomCenterTextIcon className='text-white w-6 h-6' /></Button>
            </div>
        </div>
    )

}

export default ChatInterface;