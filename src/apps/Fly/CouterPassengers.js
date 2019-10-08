import React from 'react';
import { css } from 'emotion';
import { Colors, Icons, Size, GetIcon } from '../../variables';

function CouterPassengers({ passengers, title, pluralTitle, description, onIncrement, onDecrement }) {
  return (
    <div className={styles.booking__passengers__count}>
      <div className={styles.booking__passengers__count_title}>
        {passengers} {passengers > 1 ? pluralTitle : title} <span>{description}</span>
      </div>
      <div className={styles.booking__passengers__count_buttons}>
        <div onClick={onIncrement} >
          <GetIcon type={Icons.circlePlus} color={Colors.black} size={Size.small} />
        </div>
        <div onClick={onDecrement}>
          <GetIcon type={Icons.circleMinus} color={Colors.black} size={Size.small} />
        </div>
      </div>
    </div>
  )
}

export default CouterPassengers;

const styles = {
  booking__passengers__count: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid black;
    color:black;
    padding:10px;

    * {
      user-select: none; 
    }
  `,

  booking__passengers__count_title: css`
    
    span {
      font-size: 13px;
      color: rgb(154, 154, 154);
    }
  `,

  booking__passengers__count_buttons: css`
    display: flex;
    
    div {
      margin-left: 10px;
      line-height: 0;
    }
  `
}