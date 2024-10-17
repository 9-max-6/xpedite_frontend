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
export default async function SuperCycle({ clever }) {
  // get a list of all the current supercycles

  console.log(clever.token);
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

  console.log(supercycles);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Supercycles</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Choose a Supercyle</SheetTitle>
          <SheetDescription>
            View all the bi-weekly supercycles here and apply a super filter to
            your dashboard to view requests by supercycle
          </SheetDescription>
        </SheetHeader>
        {supercycles.map((curr) => {
          return <SuperCycleMap key={curr.id} curr={curr} />;
        })}
      </SheetContent>
    </Sheet>
  );
}
