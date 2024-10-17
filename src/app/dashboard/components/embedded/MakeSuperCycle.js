'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function MakeSuperCycle({ token }) {
  const [title, settitle] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`/api/cycles/super-cycles/`, {
        title: title,
      });
      router.push(`/dashboard?supercycleId=${res.data.nesteddata.id}`);
      console.log(res.data.nesteddata.id);
    } catch (e) {
      console.error(e.toString());
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Make supercycle</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Super Cycle</DialogTitle>
          <DialogDescription>
            Enter a title for the supercycle.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-4"
              onChange={(e) => {
                settitle(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              await handleSubmit();
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
