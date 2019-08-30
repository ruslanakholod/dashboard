import React from 'react';
import {css} from 'emotion';

class Calculator extends React.Component {

    state = {
        result: ''
    };

    equal = () => {
        let checkResult = this.state.result;
        this.setState({
            result: (eval(checkResult))
        })
    };

    onClick = (e) => {
        let result = this.state.result.toString();
        let value = e.target.name.toString();

        if (value === '=') {
            this.equal();
        } else if (value === 'C') {
            this.setState({
                result: ''
            })
        } else if (value === 'CE') {
            this.setState({
                result: result.slice(0, -1)
            })
        } else if (value === '0' && result === '0') {
            this.setState({
                result: '0'
            })
        } else if (value === '.') {
            if (result.indexOf(value) !== -1) {
                this.setState({
                    result: result
                })
            } else {
                this.setState({
                    result: result + value
                })
            }
        } else {
            if (result === '0' && value !== '.' && value !== '-' && value !== '/' && value !== '*') {
                this.setState({
                        result: value
                    }
                )
            } else if (result === "Infinity" || result === "-Infinity" || result === 'NaN' ) {
                this.setState({
                        result: value
                    }
                )
            } else {
                this.setState({
                        result: result + value
                    }
                )
            }
        }
    };


    render() {
        return (
            <div>
                <div className={styles.calculator}>
                    <div className={styles.calculator__result}>{this.state.result}</div>
                    <div className={styles.calculator__keypad}>

                        <button name="C" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `} onClick={e => this.onClick(e)}>C</button>
                        <button name="CE" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `} onClick={e => this.onClick(e)}>CE</button>
                        <button name="=" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `} onClick={e => this.onClick(e)}>=</button>

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

                        <button name="+" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `} onClick={e => this.onClick(e)}>+</button>
                        <button name="-" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `} onClick={e => this.onClick(e)}>-</button>
                        <button name="*" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `} onClick={e => this.onClick(e)}>x</button>
                        <button name="/" className={css` ${styles.keypad_button}; ${styles.keypad_button_main}; `} onClick={e => this.onClick(e)}>÷</button>

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
}