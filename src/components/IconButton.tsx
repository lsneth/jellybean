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
import { DotLoader } from 'react-spinners';

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
    | 'help'
    | 'placeholder';

  accent?: boolean;
  title?: string;
  loading?: boolean;
};

export default function IconButton({
  onClick,
  isSubmit = false,
  icon,
  accent = false,
  title = '',
  loading = false,
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
    case 'placeholder':
      svg = help;
      break;
    default:
      break;
  }
  return (
    <button
      onClick={onClick}
      className={`rounded-lg p-2 m-0.5 drop-shadow-xl w-11 h-11 sm:w-10 sm:h-10 ${
        icon === 'placeholder' ? 'opacity-0' : 'cursor-pointer'
      } ${
        accent
          ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-700'
          : 'border border-neutral-50 bg-neutral-900 hover:bg-neutral-700 active:bg-neutral-700'
      }`}
      type={isSubmit ? 'submit' : undefined}
      title={title === '' ? icon : title}
    >
      {loading ? (
        <div className="max-w-11 max-h-11 sm:max-w-10 sm:max-h-10">
          <DotLoader loading={loading} size={15} color="#fff" />
        </div>
      ) : (
        <img src={svg} />
      )}
    </button>
  );
}
