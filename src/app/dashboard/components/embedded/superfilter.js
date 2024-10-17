import axios from 'axios';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SuperCycleMap from './superCycle';
import MakeSuperCycle from './MakeSuperCycle';
export default async function SuperCycle({ clever }) {
  // get a list of all the current supercycles

  let supercycles;
  try {
    const res = await axios.get(
      `${process.env.API_URL}api/cycles/super-cycles/`,
      {
        headers: {
          Authorization: `Bearer ${clever.token}`,
        },
        withCredentials: true,
      }
    );
    supercycles = res.data;
  } catch (e) {
    console.log(e.toString());
  }

  const isFin = clever.user.designation === 'FIN';
  const millisecondsElapsedSinceCreation =
    new Date() - new Date(clever.supercycle.created_at);
  const fourteenDaysInMilliseconds = 14 * 24 * 60 * 60 * 1000;
  // const fourteenDaysInMilliseconds = 14 * 1000;
  const canMakeNew =
    fourteenDaysInMilliseconds <= millisecondsElapsedSinceCreation;

  return (
    <Sheet className="relative">
      <SheetTrigger asChild>
        <Button>Supercycles</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          {canMakeNew && isFin && (
            <>
              <SheetTitle>Choose a Supercyle</SheetTitle>
              <SheetDescription>
                View all the bi-weekly supercycles here and apply a super filter
                to your dashboard to view requests by supercycle
              </SheetDescription>
              <MakeSuperCycle token={clever.token} />
            </>
          )}
        </SheetHeader>
        <SheetHeader className="my-5 sticky">
          <SheetTitle>Choose a Supercyle</SheetTitle>
          <SheetDescription>
            View all the bi-weekly supercycles here and apply a super filter to
            your dashboard to view requests by supercycle
          </SheetDescription>
        </SheetHeader>
        {supercycles.map((curr) => {
          const currSuper = {
            curr: curr,
            supercycle: clever.supercycle,
            user: clever.user,
          };
          return <SuperCycleMap key={curr.id} currSuper={currSuper} />;
        })}
      </SheetContent>
    </Sheet>
  );
}
