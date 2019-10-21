import React from 'react';
import { css } from 'emotion';

class BookingResult extends React.Component {

  render() {
    const data = this.props.data;
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    console.log(data)
    let startDate = new Date(data.startDate);
    let formattedStartDate = startDate.getDate() + ' ' + monthNames[startDate.getMonth()] + ' ' + startDate.getFullYear();
    let endDate = new Date(data.endDate);
    let formattedEndDate = endDate.getDate() + ' ' + monthNames[endDate.getMonth()] + ' ' + endDate.getFullYear();


    return (
      <div className={styles.booking__request}>
        <p>Thank you for your request, we will respond as soon as a ticket appears with the requested data:</p>
        <div className={styles.booking__request_ticket}>
          <div>
            {data.departure} → {data.arrival}
          </div>
          <div>
            {formattedStartDate}
            {data.endDate &&
              <span> — {formattedEndDate}</span>
            }
          </div>
          <div>
            {data.passengers} {data.passengers > 1 ? 'passengers' : 'passenger'}
          </div>
        </div>
      </div>
    )
  }
}


export default BookingResult;

const styles = {
  booking__request: css`
    max-width: 750px;
    width: 100%;
    margin: 0 auto;
    color: #fff;

    p {
      font-size: 30px;
    }
  `,

  booking__request_ticket: css`
    margin-top: 30px;
    font-size: 20px;

    div {
      margin: 5px 0;
    }
  `
}