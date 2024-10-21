import React from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

/**
 *
 * @returns Landing page
 */
export default function Home() {
  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="absolute top-5 right-5">
        <Link href="/auth/login/">
          <Button>Login </Button>
        </Link>
      </div>
      <Spotlight className="top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          <span className="text-blue-500">Xpedite</span> <br /> payment
          submissions
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Xpedite makes it easier for project managers to process payment
          submissions from their subordinates
        </p>
        <div className="flex gap-2 my-5 w-full justify-center items-center">
          <div className="text-blue-500">Get started</div>
          <Link href="/auth/signup/">
            <MoveRight className="text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
