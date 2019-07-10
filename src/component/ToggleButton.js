import React from 'react';
import {css} from 'emotion';

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHidden: true
        };

        this.toggleHidden = this.toggleHidden.bind(this);
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render() {
        return (
            <div className={styles.dashboard__item_dropdown}>
                <div onClick={this.toggleHidden}>
                    <span className={styles.dots}/>
                </div>
                {!this.state.isHidden &&
                <ul>
                    <li>Change image</li>
                    <li>Delete</li>
                </ul>
                }
            </div>
        )
    }
}

export default ToggleButton;

const styles = {
    dashboard__item_dropdown: css`
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
        
    ul {
    display: inline-block;
    list-style: none;
    background-color: white;
        li {
        font-size: 13px;
        padding: 5px;
        }
    }
    
    div {
    height: 23px;
    width: 40px;
    margin-left: auto;
    }
    `,
    dots: css`
     &, &:before, &:after {
     position: absolute;
     width: 7px;
     height: 7px;
     border-radius: 50%;
     background-color: #a5aeb7;
    }
    
    & {
     top: 10px;
     right: 15px;
    }
    
    &:before {
     content: "";
     top: 0;
     right: 10px;
    }
    
    &:after {
     content: "";
     top: 0;
     left: 10px;
    }

    `
};