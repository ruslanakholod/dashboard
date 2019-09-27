import React from 'react';
import { css, cx } from 'emotion';

/* eslint no-eval: 0 */

class Calculator extends React.Component {

    state = {
        result: '',
        decimalAdded: false
    };

    onClick = (e) => {
        let resultVal = this.state.result.toString();
        let btnVal = e.target.name.toString();
        const operators = ['+', '-', '*', '/', '+ / -'];
        let lastChar = resultVal[resultVal.length - 1];

        if (btnVal === 'C') {
            this.setState({
                result: '',
                decimalAdded: false
            })
        }

        else if (btnVal === 'CE') {
            this.setState({
                result: resultVal.slice(0, -1)
            })
        }

        else if (btnVal === '+ / -') {
            if (this.state.result < 0) {
                this.setState({
                    result: Math.abs(this.state.result).toString()
                })
            } else if (resultVal === '-') {
                this.setState({
                    result: '-'
                })
            } else {
                this.setState({
                    result: '-' + resultVal
                })
            }

            if (operators.indexOf(lastChar) !== -1) {
                this.setState({
                    result: resultVal
                })
            }
        }

        // Replace 'Infinity' or 'NaN' with the newly pressed operator

        else if (resultVal === "Infinity" || resultVal === "-Infinity" || resultVal === 'NaN') {
            this.setState({
                result: btnVal
            })
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

            if (operators.indexOf(lastChar) > -1 || lastChar === '.') {
                equation = equation.replace(/.$/, '');
            }

            if (equation) {
                this.setState({
                    result: eval(equation)
                })

                if (eval(equation).toString().indexOf('.') !== -1) {
                    this.setState({
                        decimalAdded: true
                    })
                } else {
                    this.setState({
                        decimalAdded: false
                    })
                }
            }
        }

        else if (operators.indexOf(btnVal) > -1) {

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
            let lastChar = resultVal[resultVal.length - 1];

            if (!this.state.decimalAdded) {
                if (operators.indexOf(lastChar) !== -1) {
                    this.setState({
                        result: resultVal
                    })
                } else {
                    this.setState({
                        result: this.state.result.toString() + btnVal,
                        decimalAdded: true
                    })
                }
            }

            if (resultVal === '') {
                this.setState({
                    result: '0.',
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

        const signs = [
            'C', 'CE', '+ / -', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='
        ];

        return (
            <div>
                <div className={styles.calculator}>
                    <div className={styles.calculator__result}>{this.state.result}</div>
                    <div className={styles.calculator__keypad}>
                        {signs.map((sign) => (
                            <button key={sign} name={sign}
                                className={cx(
                                    { [cx(styles.keypad_button)]: sign !== '=' || sign !== '+' || sign !== '-' || sign !== '/' || sign !== '*' || sign !== 'C' || sign !== 'CE' },
                                    { [css` ${styles.keypad_button}; ${styles.keypad_button_main}; `]: sign === '=' || sign === '+' || sign === '-' || sign === '/' || sign === '*' || sign === 'C' || sign === 'CE' || sign === '+ / -' },
                                    { [css` ${styles.keypad_button}; width: calc(100% / 2 - 6px); `]: sign === 0 }
                                )}
                                onClick={e => this.onClick(e)}>
                                {sign}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;

const styles = {
    calculator: css`
        max-width: 500px;
        width: 100%;
    `,
    calculator__result: css`
        height: 60px;
        margin: 3px;
        padding: 15px 15px;
        border: 2px solid black;
        border-radius: 5px;
        font-size: 20px;
        background: white;
    `,
    keypad_button: css`
        width: calc(100% / 4 - 6px);
        height: 45px;
        margin: 3px;
        font-size: 20px;
        font-weight: 700;
        border: 2px solid black;
        border-radius: 5px;
        background: #676666;
        color: #fff;
        outline: none;
        cursor: pointer;
    `,
    keypad_button_main: css`
        background: #cac7c7;
        color: #000;
    `
};