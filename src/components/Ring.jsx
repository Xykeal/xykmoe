import React from 'react';

// https://stackoverflow.com/a/18473154
export const polarToCartesian = (centerX, centerY, radius, angleDeg) => {
  const angleRad = (angleDeg - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleRad)),
    y: centerY + (radius * Math.sin(angleRad))
  };
}

// get the 'd' attribute for an arc
export const arcPath = (x, y, radius, startAngle, endAngle) => {
    let start = polarToCartesian(x, y, radius, endAngle);
    let end = polarToCartesian(x, y, radius, startAngle);
    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;       
}

const Ring = ({ cx, cy, radius, startAngle, endAngle, strokeWidth, stroke, ...restProps }) => {
  return (
    <path
      fill="none"
      stroke={stroke}
      strokeWidth={`${strokeWidth}px`}
      d={arcPath(cx, cy, radius, startAngle, endAngle)}
      {...restProps}
    />
  );
}

export default Ring;
