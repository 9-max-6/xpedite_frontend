'use client';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';

export default function Comms() {
  const words = [
    {
      text: 'X',
    },
    {
      text: 'p',
    },
    {
      text: 'e',
    },
    {
      text: 'd',
    },
    {
      text: 'i',
    },
    {
      text: 't',
    },
    {
      text: 'e',
    },
  ];
  return (
    <div className="flex flex-col h-[40rem]  ">
      <TypewriterEffectSmooth words={words} />
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Receive updates on this tab
      </p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4"></div>
    </div>
  );
}
