import React from "react";
import {css} from "emotion";
import { MdFileUpload } from "react-icons/md";
import {IconContext} from "react-icons";
import '.././App.css';

class ImageUpload extends React.Component {
    render() {

        return (
            <label className={styles.image_upload}>
                <div className={styles.image_upload__wrapper}>
                    <IconContext.Provider value={{color: "rgb(206, 206, 206)", size: "60px"}}>
                        <MdFileUpload/>
                    </IconContext.Provider>
                    <input
                           type="file"
                           onChange={this.props.onChange}
                           accept="image/*"/>
                </div>
            </label>
        )
    }
}

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

    image_upload__wrapper: css `
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

export default ImageUpload;