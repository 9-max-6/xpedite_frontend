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
export default function CommsData() {
  return (
    <Card className="h-[750px]">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent requests within the project.</CardDescription>
      </CardHeader>
      <CardContent className="m-7">
        <div className="flex  justify-center items-center w-full h-[600px] max-w-4xl mx-auto min-h-96 border border-dashed bg-transparent border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div className="flex flex-col justify-center gap-2">
            <BookX className="h-[1] w-auto text-gray-500" />
            <CardDescription>
              Nothing here, navigate to one of the tabs on the left to see
              content
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
