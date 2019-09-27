import React from 'react';
import { css, cx } from 'emotion';

/* eslint no-eval: 0 */

class Calculator extends React.Component {

    state = {
        result: '',
        current: '',
        action: ''
    };

    onClick = (e) => {
        let resultVal = this.state.result.toString();
        let currentVal = this.state.current.toString();
        let actionVal = this.state.action.toString();
        let btnVal = e.target.name.toString();
        const operators = ['+', '-', '*', '/', '÷', '×'];
        let lastChar = resultVal[resultVal.length - 1];

        if (btnVal === 'C') {
            this.setState({
                result: '',
                current: '',
                action: ''
            })
        }

        else if (operators.indexOf(btnVal) > -1) {

            if (btnVal === '÷') {
                btnVal = '/';
            }

            if (btnVal === '×') {
                btnVal = '*';
            }


            if (actionVal !== '' && currentVal !== '') {
                let result = resultVal;

                if (result.match(/--/g)) {
                    result = result.replace(/--/g, "+")
                }

                this.setState({
                    result: eval(result) + btnVal,
                    current: '',
                    action: btnVal
                })
            } else if (operators.indexOf(lastChar) > -1 && resultVal.length > 1) {
                this.setState({
                    result: resultVal.replace(/.$/, btnVal),
                    action: btnVal,
                    current: ''
                })
            } else if (resultVal === '') {
                this.setState({
                    result: '',
                    action: btnVal,
                    current: ''
                })
            } else {
                this.setState({
                    result: this.state.result + btnVal,
                    action: btnVal,
                    current: ''
                })
            }
        }

        else if (btnVal === '+/–') {

            let length = currentVal.length;
            console.log(-length)
            if (parseFloat(this.state.current) < 0) {
                if (actionVal !== '') {
                    this.setState({
                        result: resultVal.slice(0, -length) + Math.abs(parseFloat(currentVal)).toString(),
                        current: Math.abs(parseFloat(currentVal)).toString()
                    })
                } else {
                    this.setState({
                        result: Math.abs(parseFloat(currentVal)).toString(),
                        current: Math.abs(parseFloat(currentVal)).toString()
                    })
                }
            } else if (parseFloat(currentVal) >= 0) {
                if (actionVal !== '') {
                    this.setState({
                        result: resultVal.slice(0, -length) + (parseFloat(this.state.current) * -1).toString(),
                        current: (parseFloat(this.state.current) * -1).toString()
                    })
                } else {
                    this.setState({
                        result: (parseFloat(this.state.current) * -1).toString(),
                        current: (parseFloat(this.state.current) * -1).toString()
                    })
                }
            } if (currentVal === '0.') {
                this.setState({
                    result: resultVal,
                    current: currentVal
                })
            }

        } else if (btnVal === '0') {

            if (currentVal === '' || currentVal === '0') {
                if (actionVal !== '') {
                    if (resultVal[resultVal.length - 1] === '0') {
                        this.setState({
                            result: resultVal.replace(/.$/, btnVal),
                            current: currentVal.replace(/.$/, btnVal)
                        })
                    } else {
                        this.setState({
                            result: resultVal + btnVal,
                            current: currentVal + btnVal
                        })
                    }
                } else {
                    this.setState({
                        result: btnVal,
                        current: btnVal
                    })
                }
            } else {
                this.setState({
                    result: resultVal + btnVal,
                    current: currentVal + btnVal
                })
            }

        }

        else if (btnVal === '=') {
            let result = resultVal;

            if (result.match(/--/g)) {
                result = result.replace(/--/g, "+")
            }

            this.setState({
                result: eval(result),
                current: '',
                action: ''
            })

        }

        else if (btnVal === '.') {
            if (currentVal === '') {
                if (actionVal === '') {
                    this.setState({
                        result: '0.',
                        current: '0.'
                    })
                } else {
                    this.setState({
                        result: resultVal + '0.',
                        current: '0.'
                    })
                }
            }
            else if (currentVal.indexOf(btnVal) !== -1) {
                this.setState({
                    current: currentVal
                })
            }
            else {
                this.setState({
                    result: this.state.result + btnVal,
                    current: currentVal + btnVal
                })
            }
        }

        else {
            if (actionVal === '') {
                this.setState({
                    result: this.state.current + btnVal,
                    current: this.state.current + btnVal
                })
            } else {
                this.setState({
                    result: this.state.result + btnVal,
                    current: this.state.current + btnVal
                })
            }
        }
    }


    render() {

        const signs = [
            'C', '', '+/–', '÷', 7, 8, 9, '×', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='
        ];

        return (
            <div>
                <div className={styles.calculator}>
                    <div className={styles.calculator__result}>{this.state.result}</div>
                    <div className={styles.calculator__keypad}>
                        {signs.map((sign) => (
                            <button key={sign} name={sign}
                                className={cx(
                                    { [cx(styles.keypad_button)]: sign !== '=' || sign !== '+' || sign !== '-' || sign !== '÷' || sign !== '×' || sign !== 'C' || sign !== 'CE' },
                                    { [css` ${styles.keypad_button}; ${styles.keypad_button_main}; `]: sign === '=' || sign === '+' || sign === '-' || sign === '÷' || sign === '×' || sign === 'C' || sign === 'CE' || sign === '+/–' },
                                    { [css` ${styles.keypad_button}; width: calc(100% / 2 - 6px); `]: sign === 0 },
                                    { [css` width: calc(100% / 4 - 6px); height: 0; background: none; cursor: default `]: sign === '' }
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
        max-width: 400px;
        width: 100%;
        margin: 0 auto;
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
        font-family: system-ui;
        font-size: 20px;
        font-weight: 700;
        border: 2px solid black;
        border-radius: 5px;
        background: #676666;
        color: #fff;
        outline: none;
        cursor: pointer;
        user-select: none; 
    `,
    keypad_button_main: css`
        background: #cac7c7;
        color: #000;
        font-size: 23px;
    `
};