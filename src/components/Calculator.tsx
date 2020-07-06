import * as React from 'react';
import ResultBoard from './ResultBoard';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import OperatorType from '../base/OperatorType';

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
    if (calStack[calStack.length - 1] === OperatorType.Result) {
      calculateResult();
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

  return (
    <div>
      <div>
        {
          calStack.map(val => {
            return (
              <span key={val}> {val} </span>
            )
          })
        }
        {input}
      </div>
      <ResultBoard></ResultBoard>
      
      <div>
        <OperatorButton value={'AC'} onClick={onNumberClick.bind(undefined, 'AC')}/>
        <OperatorButton value={'+/-'} onClick={onNumberClick.bind(undefined, '+/-')}/>
        <OperatorButton value={'%'} onClick={onNumberClick.bind(undefined, '%')}/>
        <OperatorButton value={'/'} onClick={onOperatorClick.bind(undefined, OperatorType.Divide)}/>
      </div>
      
      <div>
        <NumberButton value={7} onClick={onNumberClick}/>
        <NumberButton value={8} onClick={onNumberClick}/>
        <NumberButton value={9} onClick={onNumberClick}/>
        <OperatorButton value={'x'} onClick={onOperatorClick.bind(undefined, OperatorType.Multiple)}/>
      </div>
      
      <div>
        <NumberButton value={4} onClick={onNumberClick}/>
        <NumberButton value={5} onClick={onNumberClick}/>
        <NumberButton value={6} onClick={onNumberClick}/>
        <OperatorButton value={'-'} onClick={onOperatorClick.bind(undefined, OperatorType.Minus)}/>
      </div>

      <div>
        <NumberButton value={1} onClick={onNumberClick}/>
        <NumberButton value={2} onClick={onNumberClick}/>
        <NumberButton value={3} onClick={onNumberClick}/>
        <OperatorButton value={'+'} onClick={onOperatorClick.bind(undefined, OperatorType.Plus)}/>
      </div>
      
      <div>
        <NumberButton value={0} onClick={onNumberClick}/>
        <NumberButton value={'.'} onClick={onNumberClick}/>
        <OperatorButton value={'='} onClick={onOperatorClick.bind(undefined, OperatorType.Result)}/>
      </div>
    </div>
  )
}

export default Calculator;
