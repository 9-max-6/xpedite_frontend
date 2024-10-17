'use client';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
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
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
/**
 *
 * @param {*} param
 * @returns
 */
export default function Cycles({ clever }) {
  const user_designation = clever.user.designation;
  const hasMe = user_designation !== 'FIN';
  const hasJETs = user_designation === 'RC' || user_designation === 'DRC';
  const hasSup = user_designation === 'RM';
  const isFinance = user_designation === 'FIN';

  // filter logic
  const [filters, setfilters] = useState('Posted');

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
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              {/* filters are according to designation too
              a finance person will see approved by RCs and DRCs */}
              {isFinance && (
                <>
                  <DropdownMenuCheckboxItem checked>
                    Pending approval by Finance
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Approved by finance
                  </DropdownMenuCheckboxItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Posted
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>
                Pending approval by Finance
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Rejected by RC
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Rejected by RC
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Rejected</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div>
      <TabsContent value="me">
        <MyCycle />
      </TabsContent>
      <TabsContent value="comms">
        <MyCycle />
      </TabsContent>
      <TabsContent value="all">
        <AllCycles />
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
