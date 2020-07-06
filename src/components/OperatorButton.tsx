import * as React from 'react';

interface OperatorButtonProps {
  value: string;
  onClick(): void;
}

const OperatorButton: React.FC<OperatorButtonProps> = (props) => {

  return (
    <button onClick={props.onClick}>{props.value}</button>
  )
}

export default OperatorButton;
