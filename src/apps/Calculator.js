import React from 'react';
import {css} from 'emotion';

/* eslint no-eval: 0 */

class Calculator extends React.Component {

    state = {
        result: '',
        decimalAdded: false
    };
    
    onClick = (e) => {
        let resultVal = this.state.result.toString();
        let btnVal = e.target.name.toString();
        const operators = ['+', '-', '*', '/'];

        if (btnVal === 'C') {
            this.setState({
                result: '',
                decimalAdded: false
            })
        } else if (btnVal === 'CE') {
            this.setState({
                result: resultVal.slice(0, -1)
            })
        }

        // Replace 'Infinity' or 'NaN' with the newly pressed operator

        else if (resultVal === "Infinity" || resultVal === "-Infinity" || resultVal === 'NaN') {
            this.setState({
                    result: btnVal
                }
            )
        }

        else if (btnVal === '0' && resultVal === '0') {
            this.setState({
                result: '0'
            })
        }

        // If eval key is pressed, calculate and display the result

        else if (btnVal === '=') {
            let equation = resultVal;
            let lastChar = equation[equation.length - 1];

            if (operators.indexOf(lastChar) > -1 || lastChar === '.')
                equation = equation.replace(/.$/, '');

            if (equation) {
                this.setState({
                    result: eval(equation)
                })
            }

            this.setState({
                decimalAdded: false
            })
        } else if (operators.indexOf(btnVal) > -1) {

            // last character from the equation

            let lastChar = resultVal[resultVal.length - 1];

            // Add operator if input is not empty and there is no operator at the last

            if (resultVal !== '' && operators.indexOf(lastChar) === -1) {
                this.setState({
                    result: resultVal + btnVal
                })
            }

            // Replace the last operator (if exists) with the newly pressed operator

            if (operators.indexOf(lastChar) > -1 && resultVal.length > 1) {

                // '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator

                this.setState({
                    result: resultVal.replace(/.$/, btnVal)
                })
            }

            this.setState({
                decimalAdded: false
            })
        }

        // Prevent more decimals to be added once it's set (It will be reset when an operator, eval or clear key is pressed)

        else if (btnVal === '.') {
            if (!this.state.decimalAdded) {
                this.setState({
                    result: this.state.result.toString() + btnVal,
                    decimalAdded: true
                })
            }
        } else {
            this.setState({
                result: this.state.result.toString() + btnVal
            })
        }
        e.preventDefault();
    };


    render() {
        return (
            <div>
                <div className={styles.calculator}>
                    <div className={styles.calculator__result}>{this.state.result}</div>
                    <div className={styles.calculator__keypad}>

                        <button name="C" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `}
                                onClick={e => this.onClick(e)}>C
                        </button>
                        <button name="CE" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `}
                                onClick={e => this.onClick(e)}>CE
                        </button>
                        <button name="=" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `}
                                onClick={e => this.onClick(e)}>=
                        </button>

                        <button name="7" className={styles.keypad_button} onClick={e => this.onClick(e)}>7</button>
                        <button name="8" className={styles.keypad_button} onClick={e => this.onClick(e)}>8</button>
                        <button name="9" className={styles.keypad_button} onClick={e => this.onClick(e)}>9</button>
                        <button name="4" className={styles.keypad_button} onClick={e => this.onClick(e)}>4</button>
                        <button name="5" className={styles.keypad_button} onClick={e => this.onClick(e)}>5</button>
                        <button name="6" className={styles.keypad_button} onClick={e => this.onClick(e)}>6</button>
                        <button name="1" className={styles.keypad_button} onClick={e => this.onClick(e)}>1</button>
                        <button name="2" className={styles.keypad_button} onClick={e => this.onClick(e)}>2</button>
                        <button name="3" className={styles.keypad_button} onClick={e => this.onClick(e)}>3</button>
                        <button name="." className={styles.keypad_button} onClick={e => this.onClick(e)}>.</button>
                        <button name="0" className={styles.keypad_button} onClick={e => this.onClick(e)}>0</button>

                        <button name="+" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `}
                                onClick={e => this.onClick(e)}>+
                        </button>
                        <button name="-" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `}
                                onClick={e => this.onClick(e)}>-
                        </button>
                        <button name="*" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `}
                                onClick={e => this.onClick(e)}>x
                        </button>
                        <button name="/" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `}
                                onClick={e => this.onClick(e)}>÷
                        </button>

                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;

const styles = {
    calculator: css`
        max-width: 800px;
        width: 100%;
    `,
    calculator__result: css`
        height: 60px;
        padding: 15px 15px;
        border: 2px solid black;
        border-radius: 5px;
        font-size: 20px;
        background: white;
    `,
    calculator__keypad: css`
        
    `,
    keypad_button: css`
        width: calc(100% / 3);
        height: 45px;
        font-size: 20px;
        font-weight: 700;
        border: 2px solid black;
        border-radius: 5px;
        background: #676666;
        color: #fff;
    `,
    keypad_button_main: css`
        background: #cac7c7;
        color: #000;
    `
};