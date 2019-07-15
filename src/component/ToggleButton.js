import React from 'react';
import {css} from 'emotion';
import {IoIosKeypad} from "react-icons/io";
import {IconContext} from "react-icons";

class ToggleButton extends React.Component {
    state = {
        isHidden: true
    };

    toggleHidden = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    };

    render() {
        return (
            <div className={styles.dashboard__item_dropdown}>
                <div onClick={this.toggleHidden}>
                    <IconContext.Provider value={{color: "rgb(206, 206, 206)", size: "30px"}}>
                        <IoIosKeypad/>
                    </IconContext.Provider>
                </div>
                {!this.state.isHidden &&
                <ul>
                    <li>
                        <label>
                            <p>Change image</p>
                            <input
                                   type="file"
                                   onChange={this.props.onChange}
                                   accept="image/*"/>
                        </label>
                    </li>
                    <li onClick={this.props.onClick}>Delete</li>
                </ul>
                }
            </div>
        )
    }
}

const styles = {
    dashboard__item_dropdown: css`
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
        
      ul {
        display: inline-block;
        margin-right: 10px;
        list-style: none;
        background-color: #ffffffba;
        border-radius: 3px;
        
        li {
          font-size: 13px;
          padding: 5px;
        }
        
        p {
          font-size: 13px;
          padding: 5px;
        }
        
        input[type=file] {
          position: absolute;
          z-index: -1;
          width: 1px;
          height: 1px;
          outline: 0;
          opacity: 0;
          pointer-events: none;
          user-select: none
        }
      }
    
      div {
        height: 30px;
        margin: 10px 10px 0 auto;
        background: #00000036;
        border-radius: 5px;
      }
    `
};

export default ToggleButton;