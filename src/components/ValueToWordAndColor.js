import React from 'react';


const ValueToWordAndColor = ({ value, maxValue, minValue, className }) => {
  const percentages = ((value - minValue) / (maxValue - minValue)) * 100;
  let word;
  let green = 100;
  let red = 100 - percentages;
  let blue = 30;

  if (percentages < 80) {
    red = 100;
    green = percentages + 30;
    blue = 10;
  }

  switch (true) {
    case percentages < 50:
      word = 'Okay';
      break;
    case percentages >= 80:
      word = 'Great';
      break;
    case percentages < 80:
      word = 'Good';
      break;
    default:
      word = ''
  }

  if (word) {
    return (
      <div
        className={className}
        style={{ color: `rgba(${red}%, ${green}%, ${blue}%, 0.75)` }}
      >
        <h4>{ `${word}` }</h4>
      </div>
    )
  }

  return <div />;
}


export default ValueToWordAndColor;
