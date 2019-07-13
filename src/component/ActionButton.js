import React from 'react';
import {IoIosAddCircleOutline} from "react-icons/io";
import {IconContext} from "react-icons";

class ActionButton extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClick} style={{display: 'inline-block', cursor: 'pointer'}}>
                <IconContext.Provider value={{color: 'white', size: '40px'}}>
                    <IoIosAddCircleOutline/>
                </IconContext.Provider>
            </div>
        )
    }
}

export default ActionButton;

