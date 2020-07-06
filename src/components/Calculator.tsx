import * as React from 'react';
import ResultBoard from './ResultBoard';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import OperatorType from '../base/OperatorType';

import '../styles/calculator.css';

const Calculator: React.FC<{}> = (props) => {

  const [input, setInput] = React.useState<string>('');
  const [calStack, setCalStack] = React.useState<(number | OperatorType)[]>([]);

  const onNumberClick = (value: number | string) => {
    setInput(`${input}${value}`)
  }

  const onOperatorClick = (op: OperatorType) => {
    var value = parseInt(input);

    if (value) {
      setCalStack([
        ...calStack,
        value,
        op
      ]);
    }

    setInput('');
  }

  React.useEffect(() => {
    const lastInput = calStack[calStack.length - 1];
    if (lastInput === OperatorType.Result) {
      calculateResult();
    } else if (lastInput === OperatorType.Clear) {
      setInput('');
      setCalStack([]);
    }
  }, [calStack]);

  const calculateResult = () => {
    let result: number = 0;
    let op: OperatorType | undefined = undefined;
    calStack.map((val: number | OperatorType) => {
      console.log(val);
      if (!op && typeof val === 'number') {
        result = val;
      } else if (typeof val === 'number') {
        switch(op) {
          case OperatorType.Plus:
            result += val;
            break;
          case OperatorType.Minus:
            result -= val;
            break;
          case OperatorType.Multiple:
            result *= val;
            break;
          case OperatorType.Divide:
            result /= val;
            break;
        }
      } else {
        op = val;
      }
    });

    setInput(result.toString());
    setCalStack([]);
  }

  const getGridPosition = (x: number, y: number, height?: number, width?: number) => {
    return {
      gridColumnStart: y,
      gridColumnEnd: y + (height || 0),
      gridRowStart: x,
      gridRowEnd: x + (width || 0)
    };
  }

  return (
    <div className="calculator-container">
      <div className="calculator-result" style={getGridPosition(1, 1, 4)}>
        {
          calStack.map(val => {
            return (
              <span key={val}> {val} </span>
            )
          })
        }
        {input}
      </div>
      
      <OperatorButton value={'AC'} onClick={onNumberClick.bind(undefined, 'AC')} style={getGridPosition(2, 1)}/>
      <OperatorButton value={'+/-'} onClick={onNumberClick.bind(undefined, '+/-')} style={getGridPosition(2, 2)}/>
      <OperatorButton value={'%'} onClick={onNumberClick.bind(undefined, '%')} style={getGridPosition(2, 3)}/>
      <OperatorButton value={'/'} onClick={onOperatorClick.bind(undefined, OperatorType.Divide)} style={getGridPosition(2, 4)}/>
    
      <NumberButton value={7} onClick={onNumberClick} style={getGridPosition(3, 1)}/>
      <NumberButton value={8} onClick={onNumberClick} style={getGridPosition(3, 2)}/>
      <NumberButton value={9} onClick={onNumberClick} style={getGridPosition(3, 3)}/>
      <OperatorButton value={'x'} onClick={onOperatorClick.bind(undefined, OperatorType.Multiple)} style={getGridPosition(3, 4)}/>
    
      <NumberButton value={4} onClick={onNumberClick} style={getGridPosition(4, 1)}/>
      <NumberButton value={5} onClick={onNumberClick} style={getGridPosition(4, 2)}/>
      <NumberButton value={6} onClick={onNumberClick} style={getGridPosition(4, 3)}/>
      <OperatorButton value={'-'} onClick={onOperatorClick.bind(undefined, OperatorType.Minus)} style={getGridPosition(4, 4)}/>

      <NumberButton value={1} onClick={onNumberClick} style={getGridPosition(5, 1)}/>
      <NumberButton value={2} onClick={onNumberClick} style={getGridPosition(5, 2)}/>
      <NumberButton value={3} onClick={onNumberClick} style={getGridPosition(5, 3)}/>
      <OperatorButton value={'+'} onClick={onOperatorClick.bind(undefined, OperatorType.Plus)} style={getGridPosition(5, 4)}/>
      
      <NumberButton value={0} onClick={onNumberClick} style={getGridPosition(6, 1, 2)}/>
      <NumberButton value={'.'} onClick={onNumberClick} style={getGridPosition(6, 3)}/>
      <OperatorButton value={'='} onClick={onOperatorClick.bind(undefined, OperatorType.Result)} style={getGridPosition(6, 4)}/>
    </div>
  )
}

export default Calculator;
