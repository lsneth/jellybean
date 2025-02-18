import { JellybeanColor } from '../types';

type PropTypes = {
  color: JellybeanColor;
};

export default function JellybeanIcon({ color }: PropTypes) {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 400 400"
      xmlSpace="preserve"
      fill="#ffffff"
      transform="matrix(-1, 0, 0, 1, 0, 0)"
      className="max-w-10 max-h-10"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#CCCCCC"
        stroke-width="5.63982"
      ></g>
      <g id="SVGRepo_iconCarrier" transform="translate(40, -110)">
        <g>
          <path
            style={{ fill: color }}
            d="M243.244,390.569c40.25-40.25,63.11-86.647,64.37-130.646c1.424-49.723-29.001-90.198-72.344-96.242 c-3.869-0.539-7.804-0.813-11.696-0.813c-42.418,0-77.792,30.78-82.283,71.597c-1.847,16.787-6.645,27.678-16.559,37.592 c-9.914,9.914-20.805,14.711-37.592,16.559c-21.261,2.339-40.364,13.128-53.789,30.378c-13.938,17.91-20.133,41.092-16.994,63.602 c5.848,41.941,44.992,72.386,93.074,72.39c1.078-0.024,2.107-0.016,3.167-0.046C156.596,453.679,202.994,430.819,243.244,390.569z M178.427,194.516c12.543-10.734,28.577-16.646,45.146-16.646c4.142,0,7.5,3.357,7.5,7.5s-3.358,7.5-7.5,7.5 c-12.995,0-25.564,4.632-35.393,13.043c-1.414,1.21-3.148,1.802-4.873,1.802c-2.116,0-4.218-0.89-5.702-2.624 C174.912,201.944,175.28,197.21,178.427,194.516z M90.42,318.436c-0.278,0.03-0.555,0.046-0.829,0.046 c-3.775,0-7.023-2.842-7.446-6.681c-0.453-4.117,2.518-7.822,6.635-8.275c19.967-2.196,34.327-8.631,46.559-20.862 c12.23-12.231,18.665-26.59,20.861-46.558c0.453-4.117,4.156-7.076,8.275-6.635c4.117,0.453,7.088,4.158,6.635,8.275 c-2.596,23.591-10.357,40.715-25.165,55.523C131.137,308.08,114.012,315.841,90.42,318.436z"
          />
          <path
            style={{ fill: '#ffffff' }}
            d="M171.111,237.747c0.453-4.117-2.518-7.822-6.635-8.275c-4.12-0.441-7.822,2.518-8.275,6.635 c-2.197,19.968-8.631,34.326-20.861,46.558c-12.232,12.231-26.591,18.666-46.559,20.862c-4.118,0.453-7.088,4.158-6.635,8.275 c0.422,3.839,3.671,6.681,7.446,6.681c0.274,0,0.551-0.016,0.829-0.046c23.591-2.595,40.716-10.356,55.525-25.166 C160.754,278.462,168.515,261.337,171.111,237.747z"
          />
          <path
            style={{ fill: '#ffffff' }}
            d="M183.307,207.714c1.725,0,3.459-0.592,4.873-1.802c9.828-8.411,22.397-13.043,35.393-13.043 c4.142,0,7.5-3.357,7.5-7.5s-3.358-7.5-7.5-7.5c-16.569,0-32.602,5.912-45.146,16.646c-3.147,2.693-3.515,7.428-0.822,10.574 C179.088,206.825,181.191,207.714,183.307,207.714z"
          />
        </g>
      </g>
    </svg>
  );
}
