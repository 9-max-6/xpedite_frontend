import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SuperCycle from './embedded/superfilter';

function GreetingCard({ clever }) {
  return (
    <Card className="sm:col-span-3" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>Hi, {clever.user.first_name}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          We're thrilled to have you onboard. With Xpedite, now you can{' '}
          <b>file or approve </b>expenses and plans with ease.
        </CardDescription>
        <CardDescription>Click the button below to get started</CardDescription>
      </CardHeader>
      <CardFooter>
        <SuperCycle clever={clever} />
      </CardFooter>
    </Card>
  );
}

export default GreetingCard;
