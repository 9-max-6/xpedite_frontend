import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookX } from 'lucide-react';

/**
 *
 * @returns NothingHere
 */
export default function NothingHere() {
  return (
    <Card x-chunk="dashboard-05-chunk-3 h-auto">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent requests within the project.</CardDescription>
      </CardHeader>
      <CardContent className="m-7">
        <div className="flex  justify-center items-center w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-transparent border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div className="flex flex-col justify-center gap-2">
            <BookX className="h-[1] w-auto text-gray-500" />
            <CardDescription>
              Nothing here, try resetting the <b>filters</b>
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
