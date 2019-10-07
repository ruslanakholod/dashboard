import React from 'react';
import { css } from 'emotion';
import { GetIcon } from '../variables';

class SmallButton extends React.Component {
  state = {
    isHidden: true
  };

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  componentDidMount() {
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

  render() {
    return (
      <div ref={this.setWrapperRef} className={styles.dashboard__item_dropdown}>
        <div className={styles.button} onClick={this.toggleHidden}>
          <GetIcon type={this.props.icon} color={this.props.color} size={this.props.size} />
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

export default SmallButton;

const styles = {
  dashboard__item_dropdown: css`
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      z-index: 1;
  `,

  button: css`
      height: 40px;
      padding: 5px;
      margin: 20px 20px 5px auto;
      background: #00000036;
      border-radius: 5px;
  `
};