import React from 'react';
import {css} from 'emotion';
import {IoIosAddCircleOutline} from "react-icons/io";
import {IconContext} from "react-icons";

class RoundButton extends React.Component {

    state = {
        isHidden: false
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                isHidden: true
            })
        }
    };

    toggleHidden = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    };

    render() {
        return (
            <div className={styles.apps}>
                <div ref={this.setWrapperRef} style={{display: 'inline-block'}}>
                    {!this.state.isHidden &&
                    <div  className={styles.apps_list}>
                        {this.props.search}
                    </div>
                    }
                    <div className={styles.apps_button} onClick={this.toggleHidden}>
                        <IconContext.Provider value={{color: 'white', size: '40px'}}>
                            <IoIosAddCircleOutline/>
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoundButton;

const styles = {
    apps: css `
        display: flex;
        justify-content: flex-end;
        position: relative;
    `,

    apps_button: css `
        display: inline-block;
        cursor: pointer;
    `,

    apps_list: css `
        position: absolute;
        right: 60px;
        max-width: 600px;
        width: 100%;
        min-height: 80px;
        z-index: 9;
        background: white;
        
        @media (max-width: 767px) {
            top: 60px;
            right: 0;
            max-width: 100%;
        }   
        `
};

