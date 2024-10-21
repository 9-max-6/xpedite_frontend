'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 *
 * @returns CommsData
 */
export default function CommsData() {
  return (
    <Card className="relative" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <CardTitle className="w-full text-center capitalize">
          Jiinue Growth Program
        </CardTitle>
      </CardHeader>
      <CardHeader></CardHeader>
      <CardContent className="p-6 h-96 text-sm">
        <div className="relative h-full w-full dark:bg-black bg-white  dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_2%,black)]"></div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">October 19, 2024</time>
        </div>
      </CardFooter>
    </Card>
  );
}
