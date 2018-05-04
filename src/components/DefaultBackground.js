import React from 'react';
import defaultIcon from '../svg/image.svg';

const DefaultBackground = ({ className }) => (
  <div
    className={className}
    style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}
  >
    <img className="def-image" src={defaultIcon} />
  </div>
)


export default DefaultBackground;
