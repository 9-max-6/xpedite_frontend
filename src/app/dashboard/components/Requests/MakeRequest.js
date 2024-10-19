import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

export default function MakeRequest({
  type,
  setdetailedId,
  checkid,
  supercycle,
}) {
  const [files, setFiles] = useState([]);
  const [total, setTotal] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // upload state
  const [uploading, setuploading] = useState(false);

  function handleFileUpload(newFiles) {
    setFiles(newFiles);
    console.log(newFiles);
  }

  const { toast } = useToast();
  async function handleSubmit() {
    setuploading(true);
    try {
      const file = files[0]; // Assuming files is an array of File objects
      const formData = new FormData();

      formData.append('file', file);
      formData.append('total', total);
      formData.append('description', description);
      formData.append('type', type);
      formData.append('title', title);

      // Make the request
      const response = await axios.post(
        `/api/requests/?supercycle=${supercycle}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast({
        title: 'Success!',
        description: 'You have successfuly logged in.',
        variant: 'success',
      });
      console.log(response.data.nesteddata);
      setdetailedId(response.data.nesteddata.id);
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
    <Card className="" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <CardTitle className="w-full text-center capitalize">
          {checkid.title.toLowerCase()}
        </CardTitle>
      </CardHeader>
      <CardHeader></CardHeader>
      <CardContent className="p-6 text-sm">
        <Dialog className="w-full">
          <DialogTrigger asChild>
            <RequestUploadButton />
          </DialogTrigger>
          <DialogContent className="sm:max-w-1/2">
            <DialogHeader>
              <DialogTitle>TA Payment Submissions</DialogTitle>
            </DialogHeader>

            <DialogDescription>
              Enter the details of the request
            </DialogDescription>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="...August"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="This is a conference request..."
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="total">Total</Label>
                <Input
                  id="total"
                  type="number"
                  placeholder="Kes: 5000"
                  onChange={(e) => setTotal(e.target.value)}
                  required
                />
              </div>
              <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={handleFileUpload} />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent default form submission behavior (e.g., page reload)
                  handleSubmit(); // Call your custom handleSubmit function
                }}
                className="w-full"
              >
                <Button type="submit" className="w-full">
                  {uploading ? <Loader2 /> : <>Post request</>}
                </Button>
              </form>
            </div>
            <div className="mt-4 text-center text-sm"></div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardHeader>
        <CardTitle className="center">Terms and conditions</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <CardDescription className="flex my-2 gap-4 p-4">
          <div>
            <ul className="list-disc flex flex-col gap-4">
              <li>
                File Attachments: Requests must include relevant files in
                specified formats (e.g., PDF, DOCX, images).
              </li>
              <li>
                Submission Deadlines: Requests must be submitted within set
                timeframes based on the event or activity date.
              </li>
              <li>
                Clear Descriptions: Each request should provide a detailed
                description of its purpose and details.
              </li>
            </ul>
          </div>
          <div>
            <ul className="list-disc flex flex-col gap-4">
              <li>
                Validation of Expenses: Include verifiable documents for
                financial requests, such as quotes or receipts.
              </li>
              <li>
                Adherence to Formats: Follow a standard submission format with
                required fields and character limits.
              </li>
              <li>
                Accurate Information: All data provided in requests should be
                accurate and reflect the current details.
              </li>
            </ul>
          </div>
        </CardDescription>
      </CardContent>

      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">October 19, 2024</time>
        </div>
      </CardFooter>
    </Card>
  );
}
