'use client';
import axios from 'axios';
import { useEffect } from 'react';
import { CardDescription } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 *
 * @returns Nothing
 */
export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    axios
      .post('/api/logout')
      .then(() => {
        setTimeout(() => {
          // Here, you would call your logout function (e.g., API call)
          console.log('User logged out'); // Replace with your actual logout logic

          // Redirect to the home page or login page
          router.push('/'); // Adjust the path as needed
        }, 1000); // 1000ms = 1 second delay
      })
      .catch((e) => {});
  });

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <CardDescription>Redirecting to home page...</CardDescription>
      <div className="my-2"></div>
      <Loader className="animate-spin" />
    </div>
  );
}
