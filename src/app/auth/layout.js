import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import ModeToggle from '@/components/mode-toggle';
import { Toaster } from '@/components/ui/toaster';

export default function GridBackgroundDemo({ children }) {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="absolute top-3 right-3">
          <ModeToggle />
        </div>
        {children}
        <Toaster />
      </ThemeProvider>
    </div>
  );
}
