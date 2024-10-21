import { TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  NotebookPen,
  Landmark,
  Rocket,
  HandCoins,
  Handshake,
} from 'lucide-react';

/**
 *
 * @param {props} param0
 * @returns
 */
export default function MyCyclerow({ props }) {
  const iconSelector = {
    P: <NotebookPen className="text-blue-700 dark:text-blue-400" />,
    C: <Landmark className="text-blue-700 dark:text-blue-400" />,
    A: <Rocket className="text-blue-700 dark:text-blue-400" />,
    R: <Handshake className="text-blue-700 dark:text-blue-400" />,
    E: <HandCoins className="text-blue-700 dark:text-blue-400" />,
  };
  const expenseType = {
    P: 'Activity planner',
    C: 'Conference',
    A: 'Activity request',
    R: 'Expense return',
    E: 'Expense claim',
  };
  return (
    <>
      <TableCell>{iconSelector[props.type]}</TableCell>
      <TableCell className="font-medium">{expenseType[props.type]}</TableCell>
      <TableCell>
        <Badge
          className="text-xs"
          variant={
            props.status.startsWith('rejected') ? 'destructive' : 'primary'
          }
        >
          {props.status ? props.status : '-'}
        </Badge>
      </TableCell>{' '}
      <TableCell className="hidden md:table-cell">
        {props.uploaded_at === 'pending'
          ? ''
          : format(new Date(props.uploaded_at), 'yyyy-MM-dd')}
      </TableCell>
      <TableCell className="text-right">
        {props.total === '' ? '' : `Kes ${props.total}`}
      </TableCell>
    </>
  );
}
