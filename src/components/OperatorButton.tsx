import * as React from 'react';

interface OperatorButtonProps {
  value: string;
  style?: any;
  onClick(): void;
}

const OperatorButton: React.FC<OperatorButtonProps> = (props) => {

  return (
    <button className="calculator-button operator-text" onClick={props.onClick} style={props.style}>{props.value}</button>
  )
}

export default OperatorButton;
