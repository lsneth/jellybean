import pencil from '../assets/pencil.svg';
import trash from '../assets/trash.svg';
import plus from '../assets/plus.svg';
import check from '../assets/check.svg';
import a from '../assets/a.svg';
import clock from '../assets/clock.svg';
import downArrow from '../assets/down-arrow.svg';
import upArrow from '../assets/up-arrow.svg';

type PropTypes = {
  onClick?: () => void;
  isSubmit?: boolean;
  icon:
    | 'pencil'
    | 'trash'
    | 'plus'
    | 'check'
    | 'down arrow'
    | 'up arrow'
    | 'a'
    | 'clock';
};

export default function IconButton({
  onClick,
  isSubmit = false,
  icon,
}: PropTypes) {
  let svg;
  switch (icon) {
    case 'pencil':
      svg = pencil;
      break;
    case 'trash':
      svg = trash;
      break;
    case 'plus':
      svg = plus;
      break;
    case 'check':
      svg = check;
      break;
    case 'a':
      svg = a;
      break;
    case 'clock':
      svg = clock;
      break;
    case 'down arrow':
      svg = downArrow;
      break;
    case 'up arrow':
      svg = upArrow;
      break;
    default:
      break;
  }
  return (
    <button
      onClick={onClick}
      className="border border-neutral-50 rounded-lg p-2 m-0.5 hover:cursor-pointer hover:bg-neutral-900"
      type={isSubmit ? 'submit' : undefined}
    >
      <img src={svg} className="w-5" />
    </button>
  );
}
