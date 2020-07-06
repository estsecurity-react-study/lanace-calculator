import * as React from 'react';

interface NumberButtonProps {
  value: string | number;
  onClick(value: string | number): void;
}

const NumberButton: React.FC<NumberButtonProps> = (props) => {
  return (
    <button onClick={props.onClick.bind(undefined, props.value)}>{props.value}</button>
  )
}

export default NumberButton;
