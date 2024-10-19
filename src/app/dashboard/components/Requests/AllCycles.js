import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AllCycles({ props }) {
  const [resData, setresData] = useState([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['allCycles'],
    queryFn: async () => {
      const response = await axios.get(
        `/api/requests/list/?supercycle=${props.clever.supercycle.id}`
      );
      setresData(response.data.nesteddata);
      return response.data.nesteddata;
    },
    refetchOnWindowFocus: true, // Automatically refetch data when window gains focus
  });
  if (isLoading || resData.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
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
              <TableRow>
                <TableCell>
                  <div className="font-medium">Olivia Smith</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {resData[0].user.name}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Refund</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="outline">
                    Declined
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-24
                </TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  if (error) {
    return <div>Error</div>;
  }
}
