import React from 'react';
import { Link } from '@mui/material';
import MultiArc from './MultiArc';

const imageSize = 65;
const fontSize = 50;
const textColor = 'rgba(255, 255, 255, 1)';

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
  { color: [light, light], hoverColor: [gradientLight, gradientLight], clickColor: [gradientLight, gradientLight], thickness: 5, offset: 0, filter: {} },
  { color: [medium, medium], hoverColor: [gradientDark, gradientDark], clickColor: [gradientDark, gradientDark], thickness: 10, offset: 0, style: { filter: 'drop-shadow(0px 5px 2px rgba(90, 90, 90, 0.5))' }},
  { color: [dark, dark], hoverColor: [gradientLight, gradientDark], clickColor: [gradientLightDarker, gradientDarkDarker], thickness: 80, offset: 0, filter: {} },
  { color: [medium, medium], hoverColor: [gradientDark, gradientDark], clickColor: [gradientDark, gradientDark], thickness: 10, offset: 0, style: { filter: 'drop-shadow(0px -5px 2px rgba(90, 90, 90, 0.5))' }},
  { color: [light, light], hoverColor: [gradientLight, gradientLight], clickColor: [gradientLight, gradientLight], thickness: 5, offset: 0, filter: {} },
  { color: [none, none], hoverColor: [white, white], clickColor: [white, white], thickness: 10, offset: 0, filter: {} },
  { color: [light, light], hoverColor: [light, light], clickColor: [light, light], thickness: 10, offset: 0, filter: {} },
];

const Wheel = ({ pages, wheelSize = 450, dividerLength = 200 }) => {
  const [selectedPage, setSelectedPage] = React.useState('');
  const wheelRadius = wheelSize / 2;
  
  // start at the last ring
  const dividerOffset = rings.reduce((accum, curr) => accum + curr.thickness, -25);
  const viewboxSize = Math.max(wheelSize, wheelRadius + dividerOffset + dividerLength);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${viewboxSize}px`} height={`${viewboxSize}px`}>
      {pages.map((page, idx) =>
        <React.Fragment key={idx}>
          <Link to={page.link}>
            <MultiArc
              arcParams={rings}
              cx={viewboxSize / 2}
              cy={viewboxSize / 2}
              radius={wheelRadius}
              startAngle={idx * 360 / pages.length}
              endAngle={(idx + 1) * 360 / pages.length}
              arcIdx={idx}
              onMouseEnter={() => setSelectedPage(page.name)}
              onMouseLeave={() => setSelectedPage('')}
            />
          </Link>
          <line
            x1={viewboxSize / 2}
            y1={0}
            x2={viewboxSize / 2}
            y2={viewboxSize / 2 - dividerOffset}
            stroke={light}
            strokeWidth={1}
            transform={`rotate(${(idx + 1) * 360 / pages.length} ${viewboxSize / 2} ${viewboxSize / 2})`}
          />
          <image
            pointerEvents='none'
            x={viewboxSize / 2 - imageSize / 2}
            y={viewboxSize / 2 - wheelRadius - imageSize / 2 + (5 + 10 + 40)} // + first 2 loops + half of big loop to place in the middle of the big loop
            width={imageSize}
            height={imageSize}
            // rotate about center, then rotate self back to correct orientation
            transform={`
              rotate( ${(idx + 0.5) * 360 / pages.length} ${viewboxSize / 2} ${viewboxSize / 2})
              rotate(-${(idx + 0.5) * 360 / pages.length} ${viewboxSize / 2} ${viewboxSize / 2 - wheelRadius + (5 + 10 + 40)})
            `}
            href={page.image}
          />
        </React.Fragment>
      )}

      <text x={viewboxSize / 2} y={viewboxSize / 2} style={{ fontSize }} fill={textColor} dominantBaseline="middle" textAnchor="middle">
        {selectedPage}
      </text>
    </svg>
  );
};

export default Wheel;
