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
    <div className="w-xl mx-auto text-left mb-5">
      <IconButton
        icon={sort === 'created_time' ? 'clock' : 'a'}
        onClick={toggleSort}
      />

      <IconButton
        icon={ascending ? 'down arrow' : 'up arrow'}
        onClick={toggleAscending}
      />
    </div>
  );
}
