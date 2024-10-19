'use client';
import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { File, ListFilter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import MyCycle from './MyCycle';
import AllCycles from './AllCycles';
import AllSups from './AllSups';
import AllJets from './AllJets';
import Comms from './Comms';
import Filters from './Filter';
/**
 *
 * @param {*} param
 * @returns
 */
export default function Cycles({ props }) {
  // props
  const user_designation = props.clever.user.designation;
  const hasMe = user_designation !== 'FIN';
  const hasJETs = user_designation === 'RC' || user_designation === 'DRC';
  const hasSup = user_designation === 'RM';
  const isFinance = user_designation === 'FIN';
  const isJET = user_designation === 'JET';

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
        {/* This div should be a component of it's own carryi9nhg the filters that
        can be used to rerender any of the components in this section */}
        {!isJET && <Filters props={props} />}
      </div>
      <TabsContent value="me">
        <MyCycle props={props} />
      </TabsContent>
      <TabsContent value="comms">
        <Comms />
      </TabsContent>
      <TabsContent value="all">
        <AllCycles props={props} />
      </TabsContent>
      <TabsContent value="jets">
        <AllJets />
      </TabsContent>
      <TabsContent value="sup">
        <AllSups />
      </TabsContent>
    </Tabs>
  );
}
