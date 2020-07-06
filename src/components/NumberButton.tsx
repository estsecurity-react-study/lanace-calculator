import * as React from 'react';

interface NumberButtonProps {
  value: string | number;
  style?: any;

  onClick(value: string | number): void;
}

const NumberButton: React.FC<NumberButtonProps> = (props) => {
  return (
    <button className="calculator-button number-text" onClick={props.onClick.bind(undefined, props.value)} style={props.style}>{props.value}</button>
  )
}

export default NumberButton;
