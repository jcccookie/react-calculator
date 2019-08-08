import React from 'react';
import Display from './Display/Display';
import Keypad from './Keypad/Keypad';

const Operations = {
   '+': (prevValue, nextValue) => prevValue + nextValue,
   '-': (prevValue, nextValue) => prevValue - nextValue,
   '*': (prevValue, nextValue) => prevValue * nextValue,
   '/': (prevValue, nextValue) => prevValue / nextValue,
   '=': (prevValue, nextValue) => nextValue
}

class Calculator extends React.Component {
   state = {
      displayValue: '0',
      value: 0,
      operator: '',
      waitingOperand: false
   }

   onClearAll = () => {
      this.setState(() => ({
         displayValue: '0',
         value: 0,
         operator: '',
         waitingOperand: false
      }));
   }

   onClear = () => {
      this.setState(() => ({ displayValue: '0' }));
   }

   onDelete = () => {
      this.setState((prevState) => ({ 
         displayValue: prevState.displayValue.substring(0, prevState.displayValue.length - 1) || '0'
      }))
   }

   onHandleDigit = (digit) => {
      let { displayValue, waitingOperand } = this.state;

      if (displayValue.length >= 10) {
         displayValue = displayValue.substring(0, 10);
      }

      if (waitingOperand) {
         this.setState(() => ({ displayValue: String(digit), waitingOperand: false }));
      } else {
         //Empty display value
         if (displayValue === '0') {
            this.setState(() => ({ displayValue: String(digit) }));
         } else {
            this.setState(() => ({
               displayValue: displayValue + digit,
               waitingOperand: false
            }))
         }
      }
   }

   onHandleDot = () => {
      const { displayValue } = this.state;
      //regex to prevent more than one dot
      const regex = /\./;
      const result = displayValue.match(regex);

      if (!result) {
         this.setState((prevState) => ({
            displayValue: prevState.displayValue + '.'
         }))
      }
   }

   onHandleSign = () => {
      const { displayValue } = this.state;
      const intValue = parseInt(displayValue, 10);
      const result = intValue * -1;

      this.setState(() => ({
         displayValue: String(result)
      }))
   }

   onHandlePercentage = () => {
      const { displayValue } = this.state;
      const result = parseInt(displayValue, 10) / 100;

      this.setState(() => ({
         displayValue: String(result)
      }))
   }

   onPerformOperation = (inputOperator) => {
      const { displayValue, value, operator } = this.state;
      const inputValue = parseFloat(displayValue);

      if (inputOperator !== '=') {
         this.setState(() => ({
            value: inputValue
         }))
      } else if (operator !== '=') {
         const result = Operations[operator](value, inputValue);
         this.setState(() => ({
            value: result,
            displayValue: String(result)
         }))
      } 

      this.setState(() => ({
          operator: inputOperator,
          waitingOperand: true
      }))
   }

   //Handle key pressings
   onHandleKeydown = (e) => {
      let { key } = e;

      if (key === 'Enter') {
         key = '=';
      }

      if ((/\d/).test(key)) {
         this.onHandleDigit(parseInt(key));
      } else if (key in Operations) {
         this.onPerformOperation(key);
      } else if (key === '.') {
         this.onHandleDot();
      } else if (key === 'Backspace') {
         this.onDelete();
      } else if (key === '%') {
         this.onHandlePercentage();
      } else if (key === 'Escape') {
         this.state.displayValue === '0' ? this.onClearAll() : this.onClear()
      }
      
   }

   componentDidMount() {
      document.addEventListener('keydown', this.onHandleKeydown);
   }

   componentWillUnmount() {
      document.removeEventListener('keydown', this.onHandleKeydown);
   }

   render() {
      return (
         <div className='calculator'>
            <Display displayValue={this.state.displayValue} />
            <Keypad
               displayValue={this.state.displayValue}
               onHandleDigit={this.onHandleDigit}
               onHandleDot={this.onHandleDot}
               onHandleSign={this.onHandleSign}
               onHandlePercentage={this.onHandlePercentage}
               onPerformOperation={this.onPerformOperation}
               onClearAll={this.onClearAll}
               onClear={this.onClear}
            />
         </div>
      )
   }
}

export default Calculator;