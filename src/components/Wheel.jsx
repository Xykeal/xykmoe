import React from 'react';
import Ring from './Ring';
import { Link } from '@mui/material';

const getRingPaths = (x, y, radius, layers, startAngle, endAngle, rotation, ringIdx) => {
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
          <linearGradient id={`${ringIdx}gradient${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color[0]} style={{ transition: '0.2s' }} />
            <stop offset="100%" stopColor={color[1]} style={{ transition: '0.2s' }} />
          </linearGradient>
        </defs>
        <Ring
          x={x}
          y={y}
          radius={radius}
          startAngle={startAngle}
          endAngle={endAngle}
          strokeWidth={ring.thickness}
          stroke={`url(#${ringIdx}gradient${idx})`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => { setHover(false); setClicked(false); }}
          onMouseDown={() => setClicked(true)}
          onMouseUp={() => setClicked(false)}
          style={{
            filter: ring.filter,
          }}
          transform={`rotate(${rotation} ${x} ${y})`}
        />
      </React.Fragment>
    )
    // subtract to account for inner thickness
    radius -= ring.thickness / 2;
  }
  return rings;
}

const Wheel = () => {
  const wheelSize = 450;
  const wheelRadius = wheelSize / 2;
  
  const rings = [
    { color: ['rgba(150, 150, 150, 0.5)', 'rgba(150, 150, 150, 0.5)'], hoverColor: ['rgba(228, 155, 15, 0.5)', 'rgba(251, 206, 177, 0.5)'], clickColor: ['rgba(228, 155, 15, 0.5)', 'rgba(251, 206, 177, 0.5)'], thickness: 5, offset: 0, filter: '' },
    { color: ['rgba(90, 90, 90, 0.5)', 'rgba(90, 90, 90, 0.5)'], hoverColor: ['rgba(228, 155, 15, 0.5)', 'rgba(251, 206, 177, 0.5)'], clickColor: ['rgba(228, 155, 15, 0.5)', 'rgba(251, 206, 177, 0.5)'], thickness: 10, offset: 0, filter: 'drop-shadow(0px 5px 2px rgba(90, 90, 90, 0.5))' },
    { color: ['rgba(50, 50, 50, 0.5)', 'rgba(50, 50, 50, 0.5)'], hoverColor: ['rgba(228, 155, 15, 0.5)', 'rgba(251, 206, 177, 0.5)'], clickColor: ['rgba(248, 175, 35, 0.5)', 'rgba(271, 226, 17, 0.5)'], thickness: 80, offset: 0, filter: '' },
    { color: ['rgba(90, 90, 90, 0.5)', 'rgba(90, 90, 90, 0.5)'], hoverColor: ['rgba(228, 155, 15, 0.5)', 'rgba(251, 206, 177, 0.5)'], clickColor: ['rgba(228, 155, 15, 0.5)', 'rgba(251, 206, 177, 0.5)'], thickness: 10, offset: 0, filter: 'drop-shadow(0px -5px 2px rgba(90, 90, 90, 0.5))' },
    { color: ['rgba(150, 150, 150, 0.5)', 'rgba(150, 150, 150, 0.5)'], hoverColor: ['rgba(228, 155, 15, 0.5)', 'rgba(251, 206, 177, 0.5)'], clickColor: ['rgba(228, 155, 15, 0.5)', 'rgba(251, 206, 177, 0.5)'], thickness: 5, offset: 0, filter: '' },
    
    { color: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)'], hoverColor: ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.8)'], clickColor: ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.8)'], thickness: 10, offset: 0, filter: '' },
    { color: ['rgba(150, 150, 150, 0.5)', 'rgba(150, 150, 150, 0.5)'], hoverColor: ['rgba(150, 150, 150, 0.5)', 'rgba(150, 150, 150, 0.5)'], clickColor: ['rgba(150, 150, 150, 0.5)', 'rgba(150, 150, 150, 0.5)'], thickness: 10, offset: 0, filter: '' },
  ];

  // start at the last ring
  const dividerOffset = rings.reduce((accum, curr) => accum + curr.thickness, -10);
  const dividerLength = 200;
  const viewboxSize = Math.max(wheelSize, wheelRadius + dividerOffset + dividerLength);

  const links = [
    "/uwu",
    "/uwu",
    "/uwu",
    "/uwu",
    "/uwu",
    "/uwu",
    "/uwu",
    "/uwu",
  ]

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${viewboxSize}px`} height={`${viewboxSize}px`}>
      <React.Fragment>
      </React.Fragment>
      {links.map((link, idx) =>
        <React.Fragment key={idx}>
          <Link to={link}>
            {getRingPaths(viewboxSize / 2, viewboxSize / 2, wheelRadius, rings, 0, 1 * 360 / links.length, (idx + 1) * 360 / links.length, idx)}
          </Link>
          <line
            x1={`${viewboxSize / 2}`}
            y1={3} // some padding for linecap
            x2={`${viewboxSize / 2}`}
            y2={`${viewboxSize / 2 - dividerOffset}`}
            stroke="rgba(150, 150, 150, 0.25)"
            strokeWidth="1"
            transform={`rotate(${(idx + 1) * 360 / links.length} ${viewboxSize / 2} ${viewboxSize / 2})`}
          />
        </React.Fragment>
      )}
    </svg>
  );
};

export default Wheel;
