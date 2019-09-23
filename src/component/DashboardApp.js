import React from 'react';
import { css, cx } from 'emotion';
import ToggleButton from "./ToggleButton";
import '.././App.css';
import ImageUpload from './ImageUpload';
import SmallButton from "./SmallButton";
import { Colors, Icons, Size } from '../variables';


function DashboardApp({ img, title, onHover, isActiveItem, id, onChangeInput, onDeleteItem, onChangeImage, image }) {

  return (
    <div
      className={styles.dashboard__item}
      onMouseMove={onHover}
      id={id}
    >
      <div className={cx(
        { [cx(styles.dashboard__item_wrapper, 'active')]: isActiveItem },
        { [styles.dashboard__item_wrapper]: !isActiveItem }
      )}>
        <div className={css` ${styles.dashboard__item_img}; background-image: url(${image}); `}>
          {!image && <ImageUpload icon={Icons.fileUpload} color={Colors.grayLight} size={Size.big} onChange={onChangeImage} image={image} />
          }
          <SmallButton color={Colors.white} size={Size.small} icon={Icons.keypad}>
            <ul className={styles.list}>
              <li>
                <label>
                  <span>Change image</span>
                  <input
                    type="file"
                    onChange={onChangeImage}
                    accept="image/*" />
                </label>
              </li>
              <li onClick={onDeleteItem}>Delete</li>
            </ul>
          </SmallButton>
        </div>
        <input
          className={styles.dashboard__item_title}
          type="text"
          value={title}
          onChange={onChangeInput}
          placeholder='Add some text'
        />
      </div>
    </div>
  );
}

const styles = {
  dashboard__item: css`
      cursor: pointer;
      flex: 0 0 33.333333%;
      max-width: 33.333333%;
      padding: 10px;

      @media (max-width: 1023px) and (min-width: 570px) {
        flex: 0 0 50%;
        max-width: 50%;
      }

      @media (max-width: 569px) {
        flex: 0 0 100%;
        max-width: 100%;
      }
   `,

  dashboard__item_wrapper: css`
      position: relative;
      padding: 15px;
    `,

  dashboard__item_img: css`
    position: relative;
      min-height: 200px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      cursor: pointer;
    `,

  dashboard__item_title: css`
      width: 100%;
      border: none;
      outline-color: #566a77;
      padding: 5px 15px;
      font-weight: 500;
      font-size: 15px;
      color: white;
      background-color: #1b2125;
    `,

  list: css`
        
        display: inline-block;
        margin-right: 20px;
        list-style: none;
        background-color: #ffffffba;
        border-radius: 3px;
        
        li {
          font-size: 14px;
          padding: 8px;
          cursor: pointer;
          
          label {
            cursor: pointer;
          }
        }
        
        p {
          font-size: 14px;
          padding: 8px;
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
    
    `
};

export default DashboardApp;