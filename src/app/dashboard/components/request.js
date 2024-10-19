import { ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paperclip } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MakeRequest from './Requests/MakeRequest';

function DetailedRequest({ id, setdetailedId, supercycle, user }) {
  const [resData, setresData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [isApprover, setisApprover] = useState(false);

  // props

  // function to fetch file

  async function fetchFile() {
    try {
      const response = await axios.get(`/api/files/?id=${resData.file}`, {
        responseType: 'arraybuffer',
      });

      console.log(response.data);
      const pdfBlob = new Blob([response.data], {
        type: 'application/pdf',
      });
      const pdfURL = URL.createObjectURL(pdfBlob);
      window.open(pdfURL, '_blank');

      setTimeout(() => {
        URL.revokeObjectURL(pdfURL);
      }, 10000);
    } catch (e) {
      console.log(e.toString());
    }
  }

  const exemptedPointsLite = ['', 'C', 'A', 'P', 'E', 'R', 'default'];
  const exemptedPoints = [
    { value: '', title: '' },
    { value: 'C', title: 'Conference' },
    { value: 'A', title: 'Activity Request' },
    { value: 'P', title: 'Activity Planner' },
    { value: 'E', title: 'Expense Claim' },
    { value: 'R', title: 'Expense Return' },
    { value: 'default', title: '' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!exemptedPointsLite.includes(id)) {
        try {
          const { data } = await axios.get(`api/requests/?id=${id}`);
          if (user.id != data.user) {
            setisApprover(true);
          }
          setresData(data.nesteddata);
        } catch (error) {
          seterror(error.message);
        } finally {
          setloading(false);
        }
      } else {
        setloading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error: {error}</div>;
  }

  // Render MakeRequest if the ID is exempted
  for (const checkid of exemptedPoints) {
    if (checkid.value === id) {
      return (
        <MakeRequest
          supercycle={supercycle}
          type={checkid.value}
          setdetailedId={setdetailedId}
          checkid={checkid}
        />
      );
    }
  }

  return (
    <>
      {resData && (
        <Card className="">
          <CardHeader className="flex justify-between flex-row items-start bg-muted/50">
            {resData.title}
            <Button
              variant={
                resData.status.startsWith('rejected')
                  ? 'destructive'
                  : 'default'
              }
            >
              {resData ? resData.status : 'Loading...'}
            </Button>
          </CardHeader>

          <CardContent className="p-6 text-sm">
            <div className="items-end">
              <div>Filename: {resData.file}</div>
              <Button variant="link" onClick={fetchFile}>
                <Paperclip />
              </Button>
              Click here to view file
            </div>
            <div>{resData.status !== 'posted' && <div>Comments</div>}</div>
            <div>{isApprover && <Button>Approve</Button>}</div>
          </CardContent>

          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">November 23, 2023</time>
            </div>
            {/* Pagination buttons */}
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default DetailedRequest;
