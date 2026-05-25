'use client';
import { useEffect, useState } from 'react';

interface Options {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfter?: number;
}

export function useTypewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseAfter = 1500,
}: Options) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed,
        );
      } else {
        timeout = setTimeout(() => setPhase('deleting'), pauseAfter);
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deleteSpeed,
        );
      } else {
        setPhase('typing');
        setWordIndex((i) => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typeSpeed, deleteSpeed, pauseAfter]);

  return text;
}
