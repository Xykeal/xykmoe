import React from 'react';
import Arc from './Arc';

const gradStart = '0%';
const gradMiddle = '40%';
const gradEnd = '100%';
const gradRadMultiplier = 1.15;
const animSpeed = '0.25s';

// return an arc comprised of multiple smaller arcs to be used in an svg
/*
arcs: array of arc objects, where first entry is the outermost arc and last entry in the innermost arc.
colors are two-color gradients, first at 0% and last at 100%
object format:
{
  color: [first, last],
  hoverColor: [first, last],
  clickColor: [first, last],
  thickness: 5,
  offset: 0,
  style: { ... }
},
*/
const MultiArc = ({ arcParams, cx, cy, radius, startAngle, endAngle, onMouseEnter, onMouseLeave, arcIdx = 0 }) => {
  const [hover, setHover] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const initRadius = radius;
  let arcs = [];

  for (const [idx, ring] of arcParams.entries()) {
    const [color, setColor] = React.useState(ring.color);

    React.useEffect(() => {
      setColor(hover ? ring.hoverColor : ring.color);
    }, [hover])

    React.useEffect(() => {
      if (clicked) {
        setColor(ring.clickColor)
      } else {
        setColor(hover ? ring.hoverColor : ring.color);
      }
    }, [clicked])

    // subtract to account for outer thickness
    radius -= ring.thickness / 2 + ring.offset;
    
    arcs.push(
      <React.Fragment key={idx}>
        <defs>
          <radialGradient id={`gradient${arcIdx}_${idx}`} cx={cx} cy={cy} r={initRadius * gradRadMultiplier} gradientUnits="userSpaceOnUse">
            <stop offset={gradStart} stopColor={color[0]} style={{ transition: animSpeed }} />
            <stop offset={gradMiddle} stopColor={color[0]} style={{ transition: animSpeed }} />
            <stop offset={gradEnd} stopColor={color[1]} style={{ transition: animSpeed }} />
          </radialGradient>
        </defs>
        <Arc
          cx={cx}
          cy={cy}
          radius={radius}
          startAngle={startAngle}
          endAngle={endAngle}
          strokeWidth={ring.thickness}
          stroke={`url(#gradient${arcIdx}_${idx})`}
          onMouseEnter={() => { setHover(true); onMouseEnter(); }}
          onMouseLeave={() => { setHover(false); onMouseLeave(); }}
          onMouseDown={() => setClicked(true)}
          onMouseUp={() => setClicked(false)}
          style={ ring.style }
        />
      </React.Fragment>
    )

    // subtract to account for inner thickness
    radius -= ring.thickness / 2;
  }
  return arcs;
}

export default MultiArc;
