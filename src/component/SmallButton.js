import React from 'react';
import {css} from 'emotion';
import * as Icons from 'react-icons/io';
import {IconContext} from "react-icons";

class SmallButton extends React.Component {
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
                <div style={this.props.styleButton} onClick={this.toggleHidden}>
                    <IconContext.Provider value={{color: "rgb(241, 241, 241)", size: "30px"}}>
                        <MyIcon type={this.props.icon}/>
                    </IconContext.Provider>
                </div>
                {!this.state.isHidden &&
                <div>
                    {this.props.children}
                </div>
                }
            </div>
        )
    }
}

function MyIcon({type}) {
    if (type === 'keypad') {
        return <Icons.IoIosKeypad/>;
    }
}

export default SmallButton;

const styles = {
    dashboard__item_dropdown: css`
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
    `
};