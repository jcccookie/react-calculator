import React from 'react';
import Key from './Key';

class Keypad extends React.Component {
   
   render() {
      const isDisplayZero = this.props.displayValue === '0';

      return (
         <div className='keypad'>
            <div className='input-keys'>
               <div className='function-keys'>
                  <Key 
                     value={isDisplayZero ? 'AC' : 'C'}   className='key'
                     onClick={() => 
                        isDisplayZero ? this.props.onClearAll() : this.props.onClear()   
                     }
                  />
                  <Key 
                     value={'±'} className='key'
                     onClick={() => this.props.onHandleSign()}
                  />
                  <Key 
                     value={'%'} className='key'
                     onClick={() => this.props.onHandlePercentage()}
                  />
               </div>
               <div className='digit-keys'>
                  <Key value={'0'} className='key key-0' onClick={() => this.props.onHandleDigit(0)}/>
                  <Key value={'.'} className='key' onClick={() => this.props.onHandleDot()}/>
                  <Key value={'1'} className='key' onClick={() => this.props.onHandleDigit(1)}/>
                  <Key value={'2'} className='key' onClick={() => this.props.onHandleDigit(2)}/>
                  <Key value={'3'} className='key' onClick={() => this.props.onHandleDigit(3)}/>
                  <Key value={'4'} className='key' onClick={() => this.props.onHandleDigit(4)}/>
                  <Key value={'5'} className='key' onClick={() => this.props.onHandleDigit(5)}/>
                  <Key value={'6'} className='key' onClick={() => this.props.onHandleDigit(6)}/>
                  <Key value={'7'} className='key' onClick={() => this.props.onHandleDigit(7)}/>
                  <Key value={'8'} className='key' onClick={() => this.props.onHandleDigit(8)}/>
                  <Key value={'9'} className='key' onClick={() => this.props.onHandleDigit(9)}/>
               </div>
            </div>
            <div className='operator-keys'>
               <Key value={'÷'} className='key' onClick={() => this.props.onPerformOperation('/')}/>
               <Key value={'x'} className='key' onClick={() => this.props.onPerformOperation('*')}/>
               <Key value={'-'} className='key' onClick={() => this.props.onPerformOperation('-')}/>
               <Key value={'+'} className='key' onClick={() => this.props.onPerformOperation('+')}/>
               <Key value={'='} className='key' onClick={() => this.props.onPerformOperation('=')}/>
            </div>
         </div>
      )
   }
   
}

export default Keypad;