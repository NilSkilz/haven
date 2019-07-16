import React from 'react';

const Icon = ({
  style = {},
  fill = '#000f',
  stroke = '#fff',
  strokeWidth = '2',
  width = '100%',
  height = '100%',
  type = 'thermometer',
  className = '',
  viewBox = '0 0 48 48'
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    strokeWidth={strokeWidth}
    className={`svg-icon ${className || ''}`}
  >
    {type === 'thermometer' ? (
      <g id="thermometer">
        <g>
          <line
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="24"
            y1="9"
            x2="24"
            y2="35"
          />
          <path
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="
              M28,31.1V7c0-2.2-1.8-4-4-4h0c-2.2,0-4,1.8-4,4v24.1c-2.7,1.6-4.4,4.7-3.9,8.2c0.5,3.5,3.5,6.3,7,6.7c4.8,0.5,8.9-3.2,8.9-7.9
              C32,35,30.4,32.5,28,31.1z"
          />
          <circle cx="24" cy="38" r="5" />

          <line
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="33"
            y1="6"
            x2="35"
            y2="6"
          />

          <line
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="33"
            y1="11"
            x2="35"
            y2="11"
          />

          <line
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="33"
            y1="16"
            x2="35"
            y2="16"
          />

          <line
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="33"
            y1="21"
            x2="35"
            y2="21"
          />
          <path
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="
              M28,31.1V7c0-2.2-1.8-4-4-4h0c-2.2,0-4,1.8-4,4v24.1c-2.7,1.6-4.4,4.7-3.9,8.2c0.5,3.5,3.5,6.3,7,6.7c4.8,0.5,8.9-3.2,8.9-7.9
              C32,35,30.4,32.5,28,31.1z"
          />

          <line
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="33"
            y1="6"
            x2="35"
            y2="6"
          />

          <line
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="33"
            y1="11"
            x2="35"
            y2="11"
          />

          <line
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="33"
            y1="16"
            x2="35"
            y2="16"
          />

          <line
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="33"
            y1="21"
            x2="35"
            y2="21"
          />
          <path d="M20,41c0.9,1.2,2.3,2,4,2s3.1-0.8,4-2H20z" />
        </g>
      </g>
    ) : null}
    {type === 'power' ? (
      <g id="power">
        <g>
          <polygon
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="
        20.8,8 15.2,23.6 22.6,22.7 17.7,41.7 31.7,21 25.4,21 33.2,8 		"
          />
        </g>
      </g>
    ) : null}
    {type === 'bulb' ? (
      <g id="bulb">
        <g>
          <g>
            <path
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              d="
            M7.0294371,21.6104374c-5.6258116,5.6258125-5.4627523,14.8483448,0.4891791,20.2656612
            c5.1027694,4.6444283,13.067318,4.8267822,18.3608494,0.4010086c3.5206585-2.9435272,5.1905861-7.1517067,5.026186-11.3037453
            c-0.1282749-3.239666,0.6116543-6.4536304,2.3083076-9.216465l1.392643-2.2677803l-5.6568546-5.6568537l-2.2646179,1.3907003
            c-2.7872925,1.7116737-6.0315456,2.4179249-9.3005791,2.3072777
            C13.6514416,17.4038849,9.8798971,18.7599773,7.0294371,21.6104374z"
            />
            <path
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              d="
            M12.6862917,39.9952126c0,0,5.5734072,3.1051216,12.0208158-2.1213188"
            />
            <path
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              d="
            M35.8390312,9.5896225l3.0102119,3.01021c1.121376,1.1213751,1.121376,2.9394827,0,4.0608578l-3.5355339,3.5355339
            l-7.0710678-7.0710678l3.5355339-3.5355339C32.8995514,8.4682474,34.717659,8.4682474,35.8390312,9.5896225z"
            />
          </g>
        </g>
      </g>
    ) : null}
    {type === 'user' ? (
      <g id="user">
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
        M23.6666679,28.4822655c5.1118164,0,8.50877-6.7998562,9.0045242-8.5222263
        c0.0362549-0.1251526,0.8010826-0.5136089,0.865078-0.6267662c2.7670708-4.8967609-0.2575378-5.4533072-0.2575378-5.4533072
        s0.1417236-2.5803061-0.5002403-5.0045166c0,0-1.6209316-6.0166273-9.111824-6.0166273s-9.1118231,6.0166273-9.1118231,6.0166273
        c-0.641964,2.4242105-0.5002413,5.0045166-0.5002413,5.0045166s-3.0246096,0.5565462-0.2575359,5.4533072
        c0.0639944,0.1131573,0.8288212,0.5016136,0.8650761,0.6267662C15.1578989,21.6824093,18.5548515,28.4822655,23.6666679,28.4822655
        z"
        />
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
        M28.3596325,27.0204525c0,0,1.948597,1.9302864,5.6576519,3.1010551c5.2552795,1.6584682,9.7573586,4.7805805,10.1493835,13.020277
        c0,0-8.5051994,1.8310432-20.5,1.8310432s-20.5-1.8310432-20.5-1.8310432
        c0.3920448-8.2396965,4.894105-11.3618088,10.1493845-13.020277c3.709054-1.1707687,5.6576509-3.1010551,5.6576509-3.1010551"
        />
      </g>
    ) : null}
    {type === 'lock' ? (
      <g id="board-unblock">
        <g
          id="Page-1"
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g id="iPad" transform="translate(-137.000000, -535.000000)" stroke={stroke}>
            <g
              id="Document-&amp;-Folder_board-unloack"
              transform="translate(145.000000, 537.000000)"
            >
              <path
                d="M28.2407407,40 L5.64814815,40 C2.52876488,40 0,37.3883248 0,34.1666667 L0,16.6666667 L33.8888889,16.6666667 L33.8888889,34.1666667 C33.8888889,37.3883248 31.360124,40 28.2407407,40 Z"
                id="Shape"
                strokeWidth={strokeWidth}
              />
              <path
                d="M6.11111111,4.36518018 C12.0199222,-1.45506006 21.6000195,-1.45506006 27.5088302,4.36518018 C31.7651799,8.5577199 35.4391079,14.6266606 33.5634452,19.8687215"
                id="Shape"
                strokeWidth={strokeWidth}
              />
              <path
                d="M17.2522131,30.5866669 L17.2522131,24.3658363 C17.2522131,23.7979597 16.765709,23.3333333 16.1710929,23.3333333 C15.5764768,23.3333333 15.0899727,23.7979597 15.0899727,24.3658363 L15.0899727,30.5866669 C14.3602165,30.9996681 13.9007404,31.7998579 14.0358804,32.703298 C14.1710205,33.6067382 14.9818606,34.3294903 15.9278408,34.4327406 C17.2251851,34.5618034 18.3333333,33.6067382 18.3333333,32.3935471 C18.3333333,31.5933573 17.9008852,30.9480429 17.2522131,30.5866669 Z"
                id="Shape"
                strokeWidth={strokeWidth}
              />
            </g>
          </g>
        </g>
      </g>
    ) : null}
    {type === 'TV' ? (
      <g id="TV">
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeMiterlimit="10"
          d="M43,35H5
      c-0.5522847,0-1-0.4477158-1-1V7c0-0.5522847,0.4477153-1,1-1h38c0.5522842,0,1,0.4477153,1,1v27
      C44,34.5522842,43.5522842,35,43,35z"
        />
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeMiterlimit="10"
          d="M29,41H19v-1
      c2.2091389,0,4-1.7908592,4-4h2c0,2.2091408,1.7908611,4,4,4V41z"
        />

        <line
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeMiterlimit="10"
          x1="4"
          y1="30"
          x2="44"
          y2="30"
        />
      </g>
    ) : null}
    {type === 'play' ? (
      <g id="right-play">
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
          M37.5608482,24.827919L9.4523554,43.9426498C8.7883196,44.3924828,8,43.9167862,8,43.1147308V4.8852673
          c0-0.8020539,0.7883196-1.2777491,1.4523554-0.8279185L37.6150932,23.172081
          C38.2006302,23.5687351,38.1463852,24.4312649,37.5608482,24.827919z"
        />
      </g>
    ) : null}
    {type === 'pause' ? (
      <g
        id="pause"
        stroke={stroke}
        strokeWidth="1"
        fill={fill}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          id="Control-&amp;-Navigation_pause"
          transform="translate(1.000000, 1.000000)"
          stroke={stroke}
          strokeWidth="2"
        >
          <path
            d="M6,20 L2,20 C0.8954306,20 0,19.1045685 0,18 L0,2 C0,0.8954306 0.8954306,0 2,0 L6,0 C7.1045704,0 8,0.8954306 8,2 L8,18 C8,19.1045685 7.1045704,20 6,20 Z"
            id="Path"
          />
          <path
            d="M20,20 L16,20 C14.8954296,20 14,19.1045685 14,18 L14,2 C14,0.8954306 14.8954296,0 16,0 L20,0 C21.1045685,0 22,0.8954306 22,2 L22,18 C22,19.1045685 21.1045685,20 20,20 Z"
            id="Path"
          />
        </g>
      </g>
    ) : null}
    {type === 'back' ? (
      <g id="undo">
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
        M24.0013313,41.5239067c9.6782036,0,17.5239067-7.8457603,17.5239067-17.5239067
        c0-9.6782026-7.8457031-17.5239067-17.5239067-17.5239067c-9.358429,0-16.9810829,7.3416743-17.4760933,16.5766678"
        />

        <polyline
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="
        12.3606386,19.1803188 7,24 2,19.1803188 	"
        />
      </g>
    ) : null}
    {type === 'home' ? (
      <g id="home">
        <g>
          <path
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="
          M7,26v18c0,1.1045685,0.8954306,2,2,2h9V32h12v14h9c1.1045685,0,2-0.8954315,2-2V26"
          />

          <polyline
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="
          1,25 24,3 47,25 		"
          />

          <polyline
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="
          32,4 39,4 39,11 		"
          />
        </g>
      </g>
    ) : null}
    {type === 'directiondown' ? (
      <g id="down-arrow">
        <polygon
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="
		18,3 18,27 6.75,27 23.75,45.5 40.75,27 30,27 30,3 	"
        />
      </g>
    ) : null}
    {type === 'directionleft' ? (
      <g id="left-arrow">
        <polygon
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="
  45,18 21,18 21,7 2.5,24 21,41 21,30 45,30 	"
        />
      </g>
    ) : null}
    {type === 'directionright' ? (
      <g id="right-arrow">
        <polygon
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="
  2,30 26,30 26,41 44.5,24 26,7 26,18 2,18 	"
        />
      </g>
    ) : null}
    {type === 'directionup' ? (
      <g id="top-arrow">
        <polygon
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="
  30,45 30,21 40.75,21 23.75,2.5 6.75,21 18,21 18,45 	"
        />
      </g>
    ) : null}
    {type === 'navigate-back' ? (
      <g id="back">
        <polyline
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="
  34.9999847,46.0000076 12.9999847,24.0000076 34.9999847,2.0000072 	"
        />
      </g>
    ) : null}
    {type === 'motion' ? (
      <g id="wave">
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
        M27.5355339,20.4644661C28.4403553,21.3692875,29,22.6192875,29,24s-0.5596447,2.6307125-1.4644661,3.5355339"
        />
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
        M20.4644661,27.5355339C19.5596447,26.6307125,19,25.3807125,19,24s0.5596447-2.6307125,1.4644661-3.5355339"
        />
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
        M31.0710678,16.9289322C32.8807106,18.7385769,34,21.2385769,34,24s-1.1192894,5.2614231-2.9289322,7.0710678"
        />
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
        M16.9289322,31.0710678C15.1192884,29.2614231,14,26.7614231,14,24s1.1192884-5.2614231,2.9289322-7.0710678"
        />
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
        M34.6066017,13.3933983C37.3210678,16.1078644,39,19.8578644,39,24s-1.6789322,7.8921356-4.3933983,10.6066017"
        />
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
        M13.3933983,34.6066017C10.6789322,31.8921356,9,28.1421356,9,24s1.6789322-7.8921356,4.3933983-10.6066017"
        />
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
        M38.1421356,9.8578644C41.761425,13.4771528,44,18.4771519,44,24s-2.238575,10.5228462-5.8578644,14.1421356"
        />
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="
        M9.8578644,38.1421356C6.2385764,34.5228462,4,29.5228481,4,24S6.2385764,13.4771528,9.8578644,9.8578644"
        />
      </g>
    ) : null}
  </svg>
);

export default Icon;
