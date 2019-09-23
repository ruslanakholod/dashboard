import React from "react";
import { css } from "emotion";
import '.././App.css';

class ImageUpload extends React.Component {
  render() {

    return (
      <label className={styles.image_upload}>
        <div className={styles.image_upload__wrapper}>

          <MyIcon type={this.props.icon} />
          <input
            type="file"
            onChange={this.props.onChange}
            accept="image/*" />
        </div>
      </label>
    )
  }
}

function MyIcon({ type }) {

}

export default ImageUpload;

const styles = {
  image_upload: css`
      display: block;
      cursor: pointer;
      padding: 30px;
      
      input[type=file] {
        outline: 0;
        opacity: 0;
        pointer-events: none;
        user-select: none
      }
    `,

  image_upload__wrapper: css`
      min-height: 120px;
      max-width: 170px;
      margin: 0 auto;
      text-align: center;
      border: 2px dashed rgb(206, 206, 206);
      
      svg {
        transform: translateY(40%);
      }
    `
};
