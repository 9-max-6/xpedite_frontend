import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import MakeSuperCycle from './MakeSuperCycle';
import SuperCycleMap from './superCycle';

/**
 *
 * @param {*} param0
 * @returns
 */
export default function SuperCycle({ clever }) {
  // get a list of all the current supercycles

  const {
    data: supercycles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['superCycles'],
    queryFn: async () => {
      const response = await axios.get('/api/cycles/super-cycles/');
      return response.data.nesteddata;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  // props
  const isFin = clever.user.designation === 'FIN';
  const millisecondsElapsedSinceCreation =
    new Date() - new Date(clever.supercycle?.created_at || 0);
  const fourteenDaysInMilliseconds = 14 * 24 * 60 * 60 * 1000;
  const canMakeNew =
    fourteenDaysInMilliseconds <= millisecondsElapsedSinceCreation;

  // Error state
  if (error) {
    console.error('Error fetching supercycles:', error);
    return <div>Error fetching supercycles. Please try again later.</div>;
  }

  return (
    <Sheet className="relative">
      <SheetTrigger asChild>
        <Button>
          {isLoading ? <Loader2 className="animate-spin" /> : <>Supercycles</>}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          {canMakeNew && isFin && (
            <>
              <SheetTitle>Choose a Supercycle</SheetTitle>
              <SheetDescription>
                View all the bi-weekly supercycles here and apply a super filter
                to your dashboard to view requests by supercycle.
              </SheetDescription>
              <MakeSuperCycle token={clever.token} />
            </>
          )}
        </SheetHeader>
        <SheetHeader className="my-5 sticky">
          <SheetTitle>Choose a Supercycle</SheetTitle>
          <SheetDescription>
            View all the bi-weekly supercycles here and apply a super filter to
            your dashboard to view requests by supercycle.
          </SheetDescription>
        </SheetHeader>
        {supercycles.length > 0 ? (
          supercycles.map((curr) => {
            const currSuper = {
              curr: curr,
              supercycle: clever.supercycle,
              user: clever.user,
            };
            return <SuperCycleMap key={curr.id} currSuper={currSuper} />;
          })
        ) : (
          <div>No supercycles available.</div> // Handle case when no supercycles are returned
        )}
      </SheetContent>
    </Sheet>
  );
}
