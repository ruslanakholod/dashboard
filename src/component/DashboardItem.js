import React from 'react';
import {css} from 'emotion';
import Title from "./Title";

function DashboardItem({img, title, onHover, isActiveItem, id, handleChange}) {

    return (
        <div
            className={styles.dashboard__item}
            onMouseMove={onHover}
            style={isActiveItem ? active : null}
            id={id}
        >
            <div className={css`
          ${styles.dashboard__item_img};
          background-image: url(${img});
        `}
            />
            <Title title={title}/>
        </div>
    );
}

export default DashboardItem;


const active = {
    border: "2px solid #176d8e",
    borderRadius: "5px",
    padding: "23px"
};

const styles = {

    dashboard__item: css`
    cursor: pointer;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    padding: 25px;

    @media (max-width: 1023px) and (min-width: 570px) {
      flex: 0 0 50%;
      max-width: 50%;
    }

    @media (max-width: 569px) {
      flex: 0 0 100%;
      max-width: 100%;
    }

    p {
      padding: 5px 15px;
      font-weight: 500;
      font-size: 15px;
      color: white;
      background-color: #1b2125;
    }
  `,

    dashboard__item_img: css`
    min-height: 200px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
  `
};
