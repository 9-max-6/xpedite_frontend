import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';

/**
 *
 * @param {props} param0
 * @returns
 */
function LoneFilter({ filters, value }) {
  const setFilter = () => {
    filters.setfilters(value);
  };

  function getFilterName(value) {
    if (value === 'reviewed') {
      return 'Reviewed';
    }
    if (value === 'all') {
      return 'All';
    }
    if (value === 'posted') {
      return 'Posted';
    }
    if (value === 'rejected_supervisor') {
      return 'Rejected by supervisor';
    }
    if (value === 'approved_finance') {
      return 'Approved by finance';
    }
    if (value === 'rejected_finance') {
      return 'Rejected by finance';
    }
  }
  return (
    <DropdownMenuCheckboxItem
      onClick={() => {
        setFilter(value);
      }}
      checked={filters.filter === value}
    >
      {getFilterName(value)}
    </DropdownMenuCheckboxItem>
  );
}

export default LoneFilter;
