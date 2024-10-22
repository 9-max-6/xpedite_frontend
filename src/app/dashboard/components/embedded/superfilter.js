import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import MakeSuperCycle from './MakeSuperCycle';
import SuperCycleMap from './superCycle';

/**
 *
 * @param {*} param0
 * @returns
 */
export default function SuperCycle({ clever }) {
  const [supercycles, setSupercycles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupercycles = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/cycles/super-cycles/');
        setSupercycles(response.data.nesteddata);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupercycles();
  }, []);

  const isFin = clever.user.designation === 'FIN';
  const millisecondsElapsedSinceCreation =
    new Date() - new Date(clever.supercycle?.created_at || 0);
  const fourteenDaysInMilliseconds = 60 * 1000;
  const canMakeNew =
    fourteenDaysInMilliseconds <= millisecondsElapsedSinceCreation;

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
              <SheetTitle>Create a Supercycle</SheetTitle>
              <SheetDescription>
                To start a new cycle for the supervisors and trainers, click the
                button below.
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
