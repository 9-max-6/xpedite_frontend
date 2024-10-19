import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';

function LoneFilter({ filters, value }) {
  const setFilter = () => {
    filters.setfilters(value);
  };

  return (
    <DropdownMenuCheckboxItem
      onClick={() => {
        setFilter();
      }}
      checked={filters.filter === value}
    >
      {value}
    </DropdownMenuCheckboxItem>
  );
}

export default LoneFilter;
