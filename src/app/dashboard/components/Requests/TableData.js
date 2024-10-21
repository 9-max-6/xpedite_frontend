import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

/**
 *
 * @param {props} param0
 * @returns
 */
export default function TableData({ filteredData, props }) {
  const types = {
    A: 'Activity request',
    R: 'Expense return',
    P: 'Activity planner',
    E: 'Explain claim',
    C: 'Conference',
  };
  const getType = (checkType) => {
    return types[checkType];
  };

  return (
    <>
      {filteredData.length > 0 &&
        filteredData.map((value) => {
          const highlighted = value.id == props.detailedId;
          return (
            <>
              <TableRow
                key={value.id}
                className={`hover:bg-blue-100 my-5 rounded-lg h-10 dark:hover:bg-muted cursor-pointer ${
                  highlighted ? 'bg-muted' : ''
                }`}
                onClick={() => {
                  props.setdetailedId(value.id);
                }}
              >
                <TableCell>
                  <div className="font-medium">
                    {`${value.user.first_name} ${value.user.last_name}`}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline"></div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {getType(value.type)}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    className="text-xs"
                    variant={
                      value.status.startsWith('rejected')
                        ? 'destructive'
                        : 'primary'
                    }
                  >
                    {value.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(value.uploaded_at), 'yyyy-MM-dd')}
                </TableCell>
                <TableCell className="text-right">
                  {`Kes: ${value.total}`}
                </TableCell>
              </TableRow>
            </>
          );
        })}
    </>
  );
}
