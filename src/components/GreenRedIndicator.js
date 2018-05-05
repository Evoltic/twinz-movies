import React from 'react';


const GreenRedIndicator = ({ value, maxValue, minValue, className }) => {
  const percentages = ((value - minValue) / (maxValue - minValue)) * 100;
  let red;
  let green;
  let blue;

  if (percentages < 50) {
    red = 100;
    green = percentages + 30;
    blue = 10;
  } else {
    green = 100;
    red = 100 - percentages;
    blue = 30;
  }

  return (
    <div
      className={className}
      style={{ backgroundColor: `rgba(${red}%, ${green}%, ${blue}%, 0.8)` }}
    />
  )
}


export default GreenRedIndicator;
