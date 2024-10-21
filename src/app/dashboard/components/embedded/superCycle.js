'use client';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 *
 * @param {current supercycle} param0
 * @returns
 */

export default function SuperCycleMap({ currSuper }) {
  const dashboardURL = 'https://xpedite-frontend.vercel.app/';
  const currCycleCreatedAt = new Date(currSuper.curr.created_at);
  const formattedDate = format(currCycleCreatedAt, "do MMMM, yyyy 'at' h a");
  const isMatch = currSuper.curr.id === currSuper.supercycle.id;

  return (
    <a href={`${dashboardURL}?supercycleId=${currSuper.curr.id}`}>
      <Card
        className={`w-full my-5 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-200 ${
          isMatch ? 'border-2 border-blue-500 dark:border-blue-400' : ''
        }`}
      >
        <CardHeader className="mb-5">
          <CardTitle>{currSuper.curr.title}</CardTitle>
          <CardDescription>Date created: {formattedDate}</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </a>
  );
}
