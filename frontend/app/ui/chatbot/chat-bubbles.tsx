// react
import React from 'react';
// libraries 
import clsx from 'clsx';
// enums
import { ReceiverType } from '@/app/lib/enum';
import TypingEffect from './typing-effect';

interface ChatBubbleProps {
    receiver: ReceiverType;
    message: string;
}
// forward the reference for scrollIntoView property 
const ChatBubble = React.forwardRef((props: ChatBubbleProps, ref) => {
    const { receiver, message } = props;

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className={clsx(
            'flex flex-row w-full mt-4 text-white rounded-lg p-6',
            {
                'bg-gray-600': receiver == ReceiverType.USER,
                'bg-gray-800 font-light': receiver == ReceiverType.BOT,
            }

        )}>
            {
                receiver===ReceiverType.BOT ?
                    <TypingEffect text={message} delay={200} /> :
                    <h1 >{message}</h1>
            }
        </div>
    );
});

export default ChatBubble;