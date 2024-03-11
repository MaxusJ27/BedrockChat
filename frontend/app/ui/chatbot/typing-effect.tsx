'use client'
import { useState, useEffect } from 'react';

interface TypingEffectProps {
    text: string;
    delay?: number;
}
// add delay when displaying texts
const TypingEffect = (props: TypingEffectProps) => {
    const { text, delay = 100 } = props;
    const textList = text.split(" ");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    useEffect(() => {
        const typing = setTimeout(() => {
            if (currentIndex < textList.length) {
                setCurrentIndex((prev) => prev + 1);
            }
        }, delay);

        return () => clearTimeout(typing);
    }, [currentIndex]);

    return <h1 className='h-[28px] whitespace-normal'>{textList.slice(0, currentIndex).join(" ")}</h1>;
}

export default TypingEffect;