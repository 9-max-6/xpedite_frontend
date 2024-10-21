import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUpload } from '@/components/ui/file-upload';
import { RequestUploadButton } from '@/components/ui/request-upload';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Approver({
  type,
  setdetailedId,
  supercycle,
  submitted,
  setsubmitted,
  id,
}) {
  const [comments, setcomments] = useState('');
  const [approve, setapprove] = useState('');

  // upload state
  const [uploading, setuploading] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    console.log('Approver: I mounted');
  });
  const { toast } = useToast();
  async function handleSubmit() {
    setuploading(true);
    try {
      // Make the request
      const body = {
        status: approve,
        comment: comments,
      };
      const response = await axios.patch(
        `/api/requests/?id=${id}&supercycle=${supercycle}`,
        body
      );
      toast({
        title: 'Success!',
        description: 'Updated request',
        variant: 'success',
        position: 'bottom-left', // Set the position
        style: {
          backgroundColor: 'green', //
        },
      });
      setdetailedId(id);
      setuploading(false);
      setsubmitted(!submitted);
      setisOpen(false);
    } catch (e) {
      console.log('Make request', e);

      setuploading(false);
      toast({
        title: 'Failure!',
        description: 'Request did not go through.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog
      className="w-full"
      open={isOpen}
      onOpenChange={(isOpen) => {
        setisOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setisOpen(true);
            setapprove('approve');
          }}
        >
          Approve
        </Button>
      </DialogTrigger>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          onClick={() => {
            setisOpen(true);
            setapprove('reject');
          }}
        >
          Reject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-1/2">
        <DialogHeader>
          <DialogTitle>TA Payment Submissions</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Add comments and click submit to confirm your changes.
        </DialogDescription>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              placeholder="Type here to enter your comments"
              onChange={(e) => {
                setcomments(e.target.value);
              }}
            />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full flex gap-2 justify-center"
          >
            <Button
              type="submit"
              variant={approve === 'approve' ? 'default' : 'destructive'}
            >
              {uploading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {approve === 'approve' ? 'Approve request' : 'Reject request'}
                </>
              )}
            </Button>
          </form>
        </div>
        <div className="mt-4 text-center text-sm"></div>
      </DialogContent>
    </Dialog>
  );
}
