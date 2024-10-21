import { Button } from '@/components/ui/button';
import { File, ListFilter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import LoneFilter from './LoneFilter';

export default function Filters({ props }) {
  const user_designation = props.clever.user.designation;
  const hasJETs = user_designation === 'RC' || user_designation === 'DRC';
  const hasSup = user_designation === 'RM';
  const isFinance = user_designation === 'FIN';
  const isJET = user_designation === 'JET';

  const filters = {
    filter: props.filters,
    setfilters: props.setfilters,
  };
  // change state

  return (
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
          {/* filters for finance */}
          {!isJET && (
            <>
              <DropdownMenuSeparator />

              <LoneFilter filters={filters} value={'all'} />

              <DropdownMenuSeparator />
              <LoneFilter filters={filters} value={'posted'} />
              <LoneFilter filters={filters} value={'reviewed'} />
              <LoneFilter filters={filters} value={'rejected_supervisor'} />

              <DropdownMenuSeparator />

              <LoneFilter filters={filters} value={'approved_finance'} />
              <LoneFilter filters={filters} value={'rejected_finance'} />
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
