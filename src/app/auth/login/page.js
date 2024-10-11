'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

export default function LoginForm() {
  // routing
  const router = useRouter();

  // password and email states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // logged in state

  // login toast
  const { toast } = useToast();

  const handleSubmit = () => {
    axios
      .post('/api/login', {
        email,
        password,
      })
      .then((response) => {
        toast({
          title: 'Success!',
          description: 'You have successfuly logged in.',
          variant: 'success',
        });

        router.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: 'Failed!',
          description: 'Invalid credentials, please try again.',
          variant: 'destructive',
        });
      });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your password below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => handleSubmit()}>
          Sign in
        </Button>
      </CardFooter>
      <div className="mb-4 text-center text-sm">
        New to Xpedite?{' '}
        <Link href="/auth/signup" className="underline">
          Sign up
        </Link>
      </div>
    </Card>
  );
}
