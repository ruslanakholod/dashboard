import React from 'react';
import { css, cx } from 'emotion';
import ImageUpload from './ImageUpload';
import SmallButton from "./SmallButton";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Colors, Icons, Size, GetIcon, GetApp } from '../variables';

function DashboardApp({ app, title, onHover, isActiveItem, id, onChangeInput, onDeleteItem, onChangeImage, image }) {

  let urlTitle = title.replace(/ /sg, '_').replace(/[,.:]+/g, "").toLowerCase();

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
        <div>
          <div className={css` ${styles.dashboard__item_img}; background-image: url(${image}); `}>
            {!image && <ImageUpload icon={Icons.fileUpload} color={Colors.grayLight} size={Size.big} onChange={onChangeImage} image={image} />
            }
            <Link
              style={{
                position: 'absolute',
                height: '100%',
                left: '0',
                top: '0',
                width: '100%'
              }}
              to={`/${urlTitle}`}>
            </Link>
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
            // onChange={onChangeInput}
            placeholder='Add some text'
            disabled="disabled"
          />
        </div>
      </div>
      <Route path={`/${urlTitle}`} render={(props) => <WindowApp {...props} title={title} app={app} />} />    </div>
  );
}

const WindowApp = ({ app, title }) => {
  return (
    <div className={styles.window_app}>
      <div className={styles.window_app__wrapper}>
        <div className={styles.window_app__close} >
          <Link to="/">
            <GetIcon type={Icons.close} color={Colors.white} size={Size.big} />
          </Link>
        </div>
        <p className={styles.window_app__title}>{title}</p>
        <div className={styles.app__wrapper}>
          <GetApp app={app} />
        </div>
      </div>
    </div>
  );
};

const styles = {


  dashboard__item_wrapper: css`
    position: relative;
    padding: 15px;
  `,

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
    padding: 10px;
    font-weight: 500;
    font-size: 16px;
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
  `,

  window_app: css`
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
    cursor: default;
  `,

  window_app__title: css`
    font-size: 49px;
    color: #fff;

    @media (max-width: 569px) {
      padding: 30px 50px 30px 30px;
      font-size: 30px;
    }
  `,

  window_app__wrapper: css`
    position: fixed;
    width: 100%;
    height: 100%;
    padding: 50px;
    background: black;

    @media (max-width: 569px) {
      padding: 30px 15px;
    }   
  `,

  app__wrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `,

  window_app__close: css`
    position: absolute;
    top: 50px;
    right: 50px;
    line-height: 0;
    margin-bottom: 40px;
  `,
};

export default DashboardApp;