import React from 'react';

const Key = (props) => (
   <button onClick={props.onClick} className={props.className}>
      {props.value}
   </button>
);

export default Key;