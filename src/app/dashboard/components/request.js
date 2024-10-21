import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import MakeRequest from './Requests/MakeRequest';
import Approver from './Requests/approver';
import CommsData from './Requests/CommsData';

/**
 *
 * @param {props} param0
 * @returns DetailedRequest
 */
function DetailedRequest({
  setdetailedId,
  supercycle,
  user,
  setsubmitted,
  submitted,
  detailedId,
  isApprover,
  setisApprover,
}) {
  const [resData, setresData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  // props
  // function to fetch file

  /**
   * return file Blob
   */
  async function fetchFile() {
    try {
      const response = await axios.get(`/api/files/?id=${resData.file.id}`, {
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
    { value: 'C', title: 'Conference' },
    { value: 'A', title: 'Activity Request' },
    { value: 'P', title: 'Activity Planner' },
    { value: 'E', title: 'Expense Claim' },
    { value: 'R', title: 'Expense Return' },
  ];

  useEffect(() => {
    setloading(true);
    setisApprover(false);
    const fetchData = async () => {
      if (!exemptedPointsLite.includes(detailedId)) {
        try {
          const { data } = await axios.get(`api/requests/?id=${detailedId}`);

          console.log(data.nesteddata);

          // show the approve button if the user id is not the same as the
          // the id of the detailed request and the request is posted
          if (
            user.id !== data.nesteddata.user.id &&
            data.nesteddata.status === 'posted' &&
            user.designation !== 'FIN'
          ) {
            setisApprover(true);
          }
          //
          if (
            user.designation == 'FIN' &&
            data.nesteddata.status === 'reviewed'
          ) {
            setisApprover(true);
          }
          setresData(data.nesteddata);
          console.log(data.nesteddata);
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
  }, [submitted, detailedId]);

  if (loading) {
    return (
      <Card className="border-0 shadow-none dark:bg-transparent">
        <div className="flex h-screen flex-col space-y-3">
          <Skeleton className="h-[100px] w-[full] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[full]" />
            <Skeleton className="h-4 w-[full]" />
          </div>
          <Skeleton className="h-[100px] w-[full] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[full]" />
            <Skeleton className="h-4 w-[full]" />
          </div>
          <Skeleton className="h-[100px] w-[full] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[full]" />
            <Skeleton className="h-4 w-[full]" />
          </div>
          <Skeleton className="h-[100px] w-[full] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[full]" />
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    console.error(error);
    return <div>Error: {error}</div>;
  }
  if (detailedId === 'default') {
    return <CommsData />;
  }
  // Render MakeRequest if the ID is exempted
  for (const checkid of exemptedPoints) {
    if (checkid.value === detailedId) {
      return (
        <MakeRequest
          supercycle={supercycle}
          type={checkid.value}
          setdetailedId={setdetailedId}
          checkid={checkid}
          submitted={submitted}
          setsubmitted={setsubmitted}
        />
      );
    }
  }

  const expenseType = {
    P: 'Activity planner',
    C: 'Conference',
    A: 'Activity request',
    R: 'Expense return',
    E: 'Expense claim',
  };

  return (
    <>
      {resData && (
        <Card className="">
          <CardHeader className="bg-muted/50 py-3 flex justify-between flex-row items-baseline">
            <CardTitle>{expenseType[resData.type]}</CardTitle>
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
            <CardContent>
              <CardTitle>{resData.title}</CardTitle>
              <div className="py-2"></div>
              <CardDescription>{resData.description}</CardDescription>
              <div className="py-2"></div>
              <CardDescription>
                {resData.user.id !== user.id ? (
                  <>
                    Posted by:{' '}
                    {`${resData.user.first_name} ${resData.user.last_name}`}
                  </>
                ) : (
                  <div></div>
                )}
                <div>Region: {resData.user.region}</div>
                <div>
                  Date posted:{' '}
                  {format(new Date(resData.uploaded_at), 'yyyy-MM-dd')}
                </div>
              </CardDescription>
            </CardContent>
            <CardContent>
              <CardTitle>Attachments</CardTitle>
              <Separator className="my-2" />
              <div className="flex items-start">
                <div>{resData.file.file_name}</div>
                <Button className="ml-auto" variant="link" onClick={fetchFile}>
                  <ExternalLink />
                </Button>
              </div>
            </CardContent>

            {/* comments */}
            {resData.status !== 'posted' && (
              <CardContent>
                <CardTitle>Comments</CardTitle>
                <Separator className="my-2" />
                {resData.reviewed_by_sup && (
                  <>
                    <CardDescription className="my-2">
                      Supervisor {' : '} {resData.reviewed_by_sup.first_name}{' '}
                      {resData.reviewed_by_sup.last_name}
                    </CardDescription>

                    {resData.comment}
                  </>
                )}
                {resData.reviewed_by_finance && (
                  <>
                    <CardDescription className="my-2">
                      Finance {' : '} {resData.reviewed_by_finance.first_name}{' '}
                      {resData.reviewed_by_finance.last_name}
                    </CardDescription>

                    {resData.finance_comment}
                  </>
                )}
              </CardContent>
            )}

            {/* Approval */}
            {isApprover && (
              <CardContent>
                <CardTitle>Approvals</CardTitle>
                <Separator className="my-2" />
                <CardDescription>
                  After carefully inspecting the attachment and any other
                  pertinent details of the submission, choose one of the buttons
                  below to either approve or reject the request
                </CardDescription>
                <div className="my-2"></div>
                <div className="flex justify-end gap-2">
                  <Approver
                    supercycle={supercycle}
                    type={resData.type}
                    setdetailedId={setdetailedId}
                    submitted={submitted}
                    setsubmitted={setsubmitted}
                    id={resData.id}
                  />
                </div>
              </CardContent>
            )}
            <></>
          </CardContent>

          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">October 19, 2023</time>
            </div>
            {/* Pagination buttons */}
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default DetailedRequest;
