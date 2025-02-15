import IconButton from './IconButton';

type PropTypes = {
  sort: 'flavor' | 'created_time';
  toggleSort: () => void;
  ascending: boolean;
  toggleAscending: () => void;
};

export default function SortButtons({
  sort,
  toggleSort,
  ascending,
  toggleAscending,
}: PropTypes) {
  return (
    <div className="text-left mb-7">
      <IconButton
        icon={sort === 'created_time' ? 'chronological' : 'alphabetical'}
        onClick={toggleSort}
      />

      <IconButton
        icon={ascending ? 'descending' : 'ascending'}
        onClick={toggleAscending}
      />
    </div>
  );
}
