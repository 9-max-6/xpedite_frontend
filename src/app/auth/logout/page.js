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
          router.push('/');
        }, 1000);
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
