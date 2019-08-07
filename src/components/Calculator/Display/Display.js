import React from 'react';

const Display = (props) => (
   <div className='display'>
      <div className='display__value'>
         {props.displayValue}
      </div>
   </div>
)

export default Display;