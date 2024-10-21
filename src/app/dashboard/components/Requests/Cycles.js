'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MyCycle from './MyCycle';
import AllCycles from './AllCycles';
import AllSups from './AllSups';
import AllJets from './AllJets';
import Comms from './Comms';
import Filters from './Filter';
/**
 *
 * @param {props} param
 * @returns
 */
export default function Cycles({ props }) {
  const user_designation = props.clever.user.designation;
  const hasMe = user_designation !== 'FIN';
  const hasJETs = user_designation === 'RC' || user_designation === 'DRC';
  const hasSup = user_designation === 'RM';
  const isFinance = user_designation === 'FIN';
  const isJET = user_designation === 'JET';

  // state
  const [showfilters, setshowfilters] = useState(false);

  return (
    <Tabs defaultValue="comms">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="comms">comms</TabsTrigger>
          {hasMe && <TabsTrigger value="me">me</TabsTrigger>}
          {hasJETs && <TabsTrigger value="jets">JETs</TabsTrigger>}
          {hasSup && <TabsTrigger value="sup">RCs & DRCs</TabsTrigger>}
          {isFinance && <TabsTrigger value="all">All requests</TabsTrigger>}
        </TabsList>
        {!isJET && showfilters && <Filters props={props} />}
      </div>
      <TabsContent value="me">
        <MyCycle props={props} />
      </TabsContent>
      <TabsContent value="comms">
        <Comms
          props={props}
          showfilters={showfilters}
          setshowfilters={setshowfilters}
        />
      </TabsContent>
      <TabsContent value="all">
        <AllCycles props={props} setshowfilters={setshowfilters} />
      </TabsContent>
      <TabsContent value="jets">
        <AllJets props={props} setshowfilters={setshowfilters} />
      </TabsContent>
      <TabsContent value="sup">
        <AllSups props={props} setshowfilters={setshowfilters} />
      </TabsContent>
    </Tabs>
  );
}
