'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DashIcon } from '@radix-ui/react-icons';

export default function SuperCycleMap({ curr }) {
  // const dashboardURL = process.env.NEXT_PUBLIC_DASHBOARD_URL
  //   ? process.env.NEXT_PUBLIC_DASHBOARD_URL
  //   : 'http://localhost:3000/';
  const dashboardURL = 'http://localhost:3000/dashboard/';
  console.log(dashboardURL);
  return (
    <Card className="w-full my-5 hover:bg-gray-100 hover:shadow-lg transition-all duration-200">
      <CardHeader className="mb-5">
        <CardTitle>{curr.title}</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <a href={`${dashboardURL}?supercycleId=${curr.id}`}>
          <Button>Apply</Button>
        </a>
      </CardFooter>
    </Card>
  );
}
