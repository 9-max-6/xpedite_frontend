import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import TableData from './TableData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import NothingHere from '../NothingHere';

export default function AllCycles({ props, setshowfilters }) {
  const [resData, setresData] = useState([]);
  const [loading, setloading] = useState(false);
  const [errorData, seterror] = useState(null);

  function filterData() {
    const filters = props.filters;
    if (filters === 'all') {
      return resData;
    }
    const filteredData = resData.filter((value) => {
      return value.status === filters;
    });
    return filteredData;
  }

  useEffect(() => {
    setloading(true);
    setshowfilters(true);
    axios
      .get(`/api/requests/list/?supercycle=${props.clever.supercycle.id}`)
      .then((res) => {
        setresData(res.data.nesteddata);
      })
      .catch((e) => {
        console.log(e.toString());
        seterror(e.toString());
      })
      .finally(() => {
        setloading(false);
      });
  }, [props.submitted]);

  if (loading || resData.length === 0) {
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
          <Skeleton className="h-[100px] w-[full] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[full]" />
            <Skeleton className="h-4 w-[full]" />
          </div>
        </div>
      </Card>
    );
  }
  if (errorData) {
    return <div>Error</div>;
  }

  if (!loading && !errorData) {
    const filteredData = filterData(resData);
    if (filteredData.length === 0) {
      return <NothingHere />;
    } else {
      return (
        <Card className="w-full h-auto max-w-4xl mx-auto">
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 text-sm overflow-y-auto max-h-[420px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableData props={props} filteredData={filteredData} />
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );
    }
  }
}
