'use client';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import ModeToggle from '@/components/mode-toggle';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({ children }) {
  const queryclient = new QueryClient();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <div className="h-full relative overflow-auto w-full relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <QueryClientProvider client={queryclient}>
              {children}
            </QueryClientProvider>
            <div className="absolute top-4 right-4">
              <ModeToggle />
            </div>
            <Toaster />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
