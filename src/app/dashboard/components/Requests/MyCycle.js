import axios from 'axios';
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
import { Button } from '@/components/ui/button';
export default function MyCycle({ props }) {
  // states
  const [conferenceId, setconferenceId] = useState('C');
  const [activityplannerId, setactivityplannerId] = useState('P');
  const [activityrequestId, setactivityrequestId] = useState('A');
  const [expenseclaimId, setexpenseclaimId] = useState('E');
  const [expensereturnId, setexpensereturnId] = useState('R');
  /**
   *
   * @param {*} theData
   */
  function setIds(theData) {
    for (const dataEntry of theData) {
      if (dataEntry.type === 'C') {
        console.log(dataEntry);
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

  const { data, isLoading, error } = useQuery({
    queryKey: ['myRequestsFortheCycle'], // Including filters in the queryKey to refetch when filters change
    queryFn: async () => {
      const response = await axios.get(
        `/api/requests/me/?supercycle=${props.clever.supercycle.id}`
      );
      if (response.data.nesteddata.length > 0) {
        setIds(response.data.nesteddata);
      }
      return response.data.nesteddata;
    },
    staleTime: 5,
    cacheTime: 10,
    // onSuccess: (fetchedData) => {
    //   console.log('I was called');
    //   if (fetchedData.length === 0) {
    //     props.setdetailedId('default');
    //     console.log('Setting default');
    //   } else {
    //     console.log('I was called');
    //     setIds(fetchedData);
    //   }
    // },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error.toString());
    return <div>Error...</div>;
  }
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <Button
        onClick={() => {
          props.setdetailedId(activityplannerId);
        }}
      >
        Activity Planner
      </Button>
      <Button
        onClick={() => {
          props.setdetailedId(activityrequestId);
        }}
      >
        Activity Request
      </Button>
      <Button
        onClick={() => {
          props.setdetailedId(conferenceId);
        }}
      >
        Conferences
      </Button>
      <Button
        onClick={() => {
          props.setdetailedId(expensereturnId);
        }}
      >
        Expense Request
      </Button>
      <Button
        onClick={() => {
          props.setdetailedId(expenseclaimId);
        }}
      >
        Expense Claim
      </Button>
    </Card>
  );
}
