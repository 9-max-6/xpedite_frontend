import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect } from 'react';

export default function MyCycle({ props }) {
  const [cycleData, setcycleData] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['myData'], // Including filters in the queryKey to refetch when filters change
    queryFn: async () => {
      const response = await axios.get('/api/cycles/me/');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    onSuccess: (fetchedData) => {
      setcycleData(fetchedData);
    },
  });

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* {data.map((value) => {
          <div>{value}</div>;
        })}{' '} */}
        {<div>{cycleData}</div>}
      </CardContent>
    </Card>
  );
}
