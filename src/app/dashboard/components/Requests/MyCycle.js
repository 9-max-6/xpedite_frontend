import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import MyCyclerow from '../MyCyclerow';

export default function MyCycle({ props }) {
  // states
  const [conferenceId, setconferenceId] = useState('C');
  const [activityplannerId, setactivityplannerId] = useState('P');
  const [activityrequestId, setactivityrequestId] = useState('A');
  const [expenseclaimId, setexpenseclaimId] = useState('E');
  const [expensereturnId, setexpensereturnId] = useState('R');

  // data effects
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  const [resData, setresData] = useState(null);
  /**
   *
   * @param {*}
   */
  function setIds(theData) {
    for (const dataEntry of theData) {
      if (dataEntry.type === 'C') {
        setconferenceId(dataEntry.id);
      }
      if (dataEntry.type === 'A') {
        setactivityrequestId(dataEntry.id);
      }
      if (dataEntry.type === 'R') {
        setexpensereturnId(dataEntry.id);
      }
      if (dataEntry.type === 'P') {
        setactivityplannerId(dataEntry.id);
      }
      if (dataEntry.type === 'E') {
        setexpenseclaimId(dataEntry.id);
      }
    }
  }

  /**
   *
   * @param {*} rowType
   * @param {*} theData
   * @returns
   */
  function getRow(rowType, theData) {
    for (const item of theData) {
      if (item.type === rowType) {
        return item;
      }
    }
    return {
      status: 'missing',
      uploaded_at: 'pending',
      type: rowType,
      total: '',
    };
  }

  useEffect(() => {
    axios
      .get(`/api/requests/me/?supercycle=${props.clever.supercycle.id}`)
      .then((res) => {
        setIds(res.data.nesteddata);
        setresData(res.data.nesteddata);
        setloading(false);
      })
      .catch((e) => {
        seterror(e);
      })
      .finally(() => {
        setloading(false);
      });
  }, [props.detailedId]);

  if (error) {
    console.log(error.toString());
    return <div>Error...</div>;
  }

  if (!loading) {
    return (
      <Card className="border-0 shadow-none w-full h-auto max-w-4xl mx-auto">
        <CardHeader className="px-7">
          <CardTitle></CardTitle>
          <CardDescription>Recent requests from you.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 text-sm overflohw-y-auto max-h-[420px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Activity planner */}
              <TableRow
                className={`hover:bg-blue-100 my-5 rounded-lg h-10 dark:hover:bg-muted cursor-pointer ${
                  props.detailedId === activityplannerId ? 'bg-muted' : ''
                }`}
                onClick={() => {
                  props.setdetailedId(activityplannerId);
                }}
              >
                <MyCyclerow props={getRow('P', resData)} />
              </TableRow>

              {/* activity request */}

              <TableRow
                className={`hover:bg-blue-100 my-5 rounded-lg h-10 dark:hover:bg-muted cursor-pointer ${
                  props.detailedId === activityrequestId ? 'bg-muted' : ''
                }`}
                onClick={() => {
                  props.setdetailedId(activityrequestId);
                }}
              >
                <MyCyclerow props={getRow('A', resData)} />
              </TableRow>

              {/* Conference */}
              <TableRow
                className={`hover:bg-blue-100 my-5 rounded-lg h-10 dark:hover:bg-muted cursor-pointer ${
                  props.detailedId === conferenceId ? 'bg-muted' : ''
                }`}
                onClick={() => {
                  props.setdetailedId(conferenceId);
                }}
              >
                <MyCyclerow props={getRow('C', resData)} />
              </TableRow>

              {/* Expense return */}
              <TableRow
                className={`hover:bg-blue-100 my-5 rounded-lg h-10 dark:hover:bg-muted cursor-pointer ${
                  props.detailedId === expensereturnId ? 'bg-muted' : ''
                }`}
                onClick={() => {
                  props.setdetailedId(expensereturnId);
                }}
              >
                <MyCyclerow props={getRow('R', resData)} />
              </TableRow>

              {/* Expense claim */}
              <TableRow
                className={`hover:bg-blue-100 my-5 rounded-lg h-10 dark:hover:bg-muted cursor-pointer ${
                  props.detailedId == expenseclaimId ? 'bg-muted' : ''
                }`}
                onClick={() => {
                  props.setdetailedId(expenseclaimId);
                }}
              >
                <MyCyclerow props={getRow('E', resData)} />
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    );
  }
  return (
    <Card className="shadow-none border-0">
      <div className="flex flex-col space-y-3">
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
      </div>
    </Card>
  );
}
