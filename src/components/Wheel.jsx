import React from 'react';
import Ring from './Ring';
import { Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Primogem from '/primogem.png';

const getRingPaths = (cx, cy, radius, layers, startAngle, endAngle, ringIdx, onMouseEnter, onMouseLeave) => {
  const [hover, setHover] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  let rings = [];

  for (const [idx, ring] of layers.entries()) {
    const [color, setColor] = React.useState(ring.color);
    React.useEffect(() => {
      if (hover) {
        setColor(ring.hoverColor)
      } else {
        setColor(ring.color)
      }
    }, [hover])

    React.useEffect(() => {
      if (clicked) {
        setColor(ring.clickColor)
      } else if (hover) {
        setColor(ring.hoverColor)
      } else {
        setColor(ring.color)
      }
    }, [clicked])

    // subtract to account for outer thickness
    radius -= ring.thickness / 2 + ring.offset;
    rings.push(
      <React.Fragment key={idx}>
        <defs>
          <radialGradient id={`${ringIdx}gradient${idx}`} cx={cx} cy={cy} r={radius * 1.5} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={color[0]} style={{ transition: '0.25s' }} />
            <stop offset="40%" stopColor={color[0]} style={{ transition: '0.25s' }} />
            <stop offset="100%" stopColor={color[1]} style={{ transition: '0.25s' }} />
          </radialGradient>
        </defs>
        <Ring
          cx={cx}
          cy={cy}
          radius={radius}
          startAngle={startAngle}
          endAngle={endAngle}
          strokeWidth={ring.thickness}
          stroke={`url(#${ringIdx}gradient${idx})`}
          onMouseEnter={() => { setHover(true); onMouseEnter(); }}
          onMouseLeave={() => { setHover(false); setClicked(false); onMouseLeave(); }}
          onMouseDown={() => setClicked(true)}
          onMouseUp={() => setClicked(false)}
          style={{
            filter: ring.filter,
          }}
        />
      </React.Fragment>
    )
    // subtract to account for inner thickness
    radius -= ring.thickness / 2;
  }
  return rings;
}

const Wheel = ({ pages, wheelSize = 450, dividerLength = 200 }) => {
  const [selectedPage, setSelectedPage] = React.useState('');

  const wheelRadius = wheelSize / 2;
  
  const light = 'rgba(150, 150, 150, 0.5)';
  const medium = 'rgba(90, 90, 90, 0.5)';
  const dark = 'rgba(50, 50, 50, 0.5)';

  const none = 'rgba(0, 0, 0, 0)';
  const white = 'rgba(255, 255, 255, 0.8)';

  const gradientLight = 'rgba(235, 249, 249, 0.75)';
  const gradientDark = 'rgba(33, 201, 243, 0.75)';

  const gradientLightDarker = 'rgba(235, 249, 249, 1)';
  const gradientDarkDarker = 'rgba(33, 201, 243, 1)';

  const rings = [
    { color: [light, light], hoverColor: [gradientLight, gradientLight], clickColor: [gradientLight, gradientLight], thickness: 5, offset: 0, filter: '' },
    { color: [medium, medium], hoverColor: [gradientDark, gradientDark], clickColor: [gradientDark, gradientDark], thickness: 10, offset: 0, filter: 'drop-shadow(0px 5px 2px rgba(90, 90, 90, 0.5))' },
    { color: [dark, dark], hoverColor: [gradientLight, gradientDark], clickColor: [gradientLightDarker, gradientDarkDarker], thickness: 80, offset: 0, filter: '' },
    { color: [medium, medium], hoverColor: [gradientDark, gradientDark], clickColor: [gradientDark, gradientDark], thickness: 10, offset: 0, filter: 'drop-shadow(0px -5px 2px rgba(90, 90, 90, 0.5))' },
    { color: [light, light], hoverColor: [gradientLight, gradientLight], clickColor: [gradientLight, gradientLight], thickness: 5, offset: 0, filter: '' },
    { color: [none, none], hoverColor: [white, white], clickColor: [white, white], thickness: 10, offset: 0, filter: '' },
    { color: [light, light], hoverColor: [light, light], clickColor: [light, light], thickness: 10, offset: 0, filter: '' },
  ];

  // start at the last ring
  const dividerOffset = rings.reduce((accum, curr) => accum + curr.thickness, -25);
  const viewboxSize = Math.max(wheelSize, wheelRadius + dividerOffset + dividerLength);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${viewboxSize}px`} height={`${viewboxSize}px`}>
      {pages.map((page, idx) =>
        <React.Fragment key={idx}>
          <Link to={page.link}>
            {getRingPaths(viewboxSize / 2, viewboxSize / 2, wheelRadius, rings, idx * 360 / pages.length, (idx + 1) * 360 / pages.length, idx, () => setSelectedPage(page.name), () => setSelectedPage(''))}
          </Link>
          <line
            x1={`${viewboxSize / 2}`}
            y1={3} // some padding for linecap
            x2={`${viewboxSize / 2}`}
            y2={`${viewboxSize / 2 - dividerOffset}`}
            stroke="rgba(150, 150, 150, 0.25)"
            strokeWidth="1"
            transform={`rotate(${(idx + 1) * 360 / pages.length} ${viewboxSize / 2} ${viewboxSize / 2})`}
          />
          {/* + first 2 loops + half of big loop */}
          <image pointerEvents='none' x={viewboxSize / 2 - 30} y={viewboxSize / 2 - wheelRadius + 55 - 30} width="60" height="60" transform={`rotate(${(idx + 0.5) * 360 / pages.length} ${viewboxSize / 2} ${viewboxSize / 2}) rotate(-${(idx + 0.5) * 360 / pages.length} ${viewboxSize / 2} ${viewboxSize / 2 - wheelRadius + 55})`} href={Primogem} />
        </React.Fragment>
      )}
      <text x={`${viewboxSize / 2}`} y={`${viewboxSize / 2}`} style={{ fontSize: 50 }} fill='#fff' dominantBaseline="middle" textAnchor="middle">
        {selectedPage}
      </text>
    </svg>
  );
};

export default Wheel;
