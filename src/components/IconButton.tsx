import edit from '../assets/pencil.svg';
import remove from '../assets/trash.svg';
import add from '../assets/plus.svg';
import confirm from '../assets/check.svg';
import alphabetical from '../assets/a.svg';
import chronological from '../assets/hourglass.svg';
import descending from '../assets/down-arrow.svg';
import ascending from '../assets/up-arrow.svg';
import close from '../assets/x.svg';
import logIn from '../assets/log-in.svg';
import logOut from '../assets/log-out.svg';
import help from '../assets/question-mark.svg';

type PropTypes = {
  onClick?: () => void;
  isSubmit?: boolean;
  icon:
    | 'edit'
    | 'remove'
    | 'add'
    | 'confirm'
    | 'descending'
    | 'ascending'
    | 'alphabetical'
    | 'chronological'
    | 'close'
    | 'log in'
    | 'log out'
    | 'help';

  accent?: boolean;
};

export default function IconButton({
  onClick,
  isSubmit = false,
  icon,
  accent = false,
}: PropTypes) {
  let svg;
  switch (icon) {
    case 'edit':
      svg = edit;
      break;
    case 'remove':
      svg = remove;
      break;
    case 'add':
      svg = add;
      break;
    case 'confirm':
      svg = confirm;
      break;
    case 'alphabetical':
      svg = alphabetical;
      break;
    case 'chronological':
      svg = chronological;
      break;
    case 'descending':
      svg = descending;
      break;
    case 'ascending':
      svg = ascending;
      break;
    case 'close':
      svg = close;
      break;
    case 'log in':
      svg = logIn;
      break;
    case 'log out':
      svg = logOut;
      break;
    case 'help':
      svg = help;
      break;
    default:
      break;
  }
  return (
    <button
      onClick={onClick}
      className={`rounded-lg p-2 m-0.5 hover:cursor-pointer drop-shadow-xl ${
        accent
          ? 'bg-amber-600 hover:bg-amber-700'
          : 'border border-neutral-50 bg-neutral-900 hover:bg-neutral-700'
      }`}
      type={isSubmit ? 'submit' : undefined}
      title={icon}
    >
      <img src={svg} className="w-7 sm:w-5" />
    </button>
  );
}
