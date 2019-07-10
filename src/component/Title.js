import React from 'react';
import {css} from 'emotion';

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
        };
    }

    handleNameChange = (event) => {
        this.setState({ title: event.target.value });
    };

    render() {
        return (
            <div >
                <input
                    className={styles.dashboard__item_title}
                    type="text"
                    value={this.state.title}
                    onChange={this.handleNameChange}
                />
            </div>
        );
    }
}

export default Title;

const styles = {
    dashboard__item_title: css`
      width: 100%;
      border: none;
      outline-color: #566a77;
      padding: 5px 15px;
      font-weight: 500;
      font-size: 15px;
      color: white;
      background-color: #1b2125;
  `
};