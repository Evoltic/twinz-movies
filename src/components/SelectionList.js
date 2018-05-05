import React from 'react';

// selection list with results in an input field
const SelectionList = ({ list, onClick, className }) => (
  <div className={`o-selection-list ${className}`}>
    {
      list.length > 0
        ? list.map((item, index) => (

            <p
              className='o-selection'
              onClick={() => onClick(item)}
              key={'selection' + item.title + index}
            >
              <span> {item.title} </span>
              <span className='c-date'> {item.release_date.slice(0, 4)} </span>
            </p>

          ))

          : ''
    }
  </div>
)


export default SelectionList;
