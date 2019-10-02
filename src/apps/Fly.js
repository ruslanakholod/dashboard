import React, { useState } from 'react';
import { css, cx } from 'emotion';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Colors, Icons, Size, GetIcon } from '../variables';


class Fly extends React.Component {

  state = {

    formData: {
      departure: null,
      arrival: null,
      way: null,
      startDate: null,
      endDate: null,

    },

    departures: [
      { value: 'Minsk', label: 'Minsk (MSQ), BY' },
      { Paris: 'Paris', label: 'Paris (PAR), FR' },
      { value: 'Amsterdam', label: 'Amsterdam (AMS), NL' }
    ],

    arrivals: [
      { value: 'Minsk', label: 'Minsk (MSQ), BY' },
      { Paris: 'Paris', label: 'Paris (PAR), FR' },
      { value: 'Amsterdam', label: 'Amsterdam (AMS), NL' }
    ],

    selectedDeparture: null,
    selectedArrival: null,
    selectedWay: "oneWay",
    startDate: null,
    endDate: null,
    passengers: {
      total: 1,
      adults: 1,
      children: 0,
      infants: 0
    },

    isHidden: true
  };

  isHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }


  handleChangeDeparture = selectedDeparture => {
    this.setState({ selectedDeparture });
  };

  handleChangeArrival = selectedArrival => {
    this.setState({ selectedArrival });
  };

  handleChangeWay = e => {
    this.setState({
      selectedWay: e.target.value
    });
  };

  handleChangeStartDate = date => {
    this.setState({ startDate: new Date(date) });
    console.log(this.state.startDate)
  };

  handleChangeEndDate = date => {
    this.setState({ endDate: new Date(date) });
  };

  incrementAdult = () => {
    let adults = this.state.passengers.adults;
    let total = this.state.passengers.total;

    if (adults < 5) {
      this.setState({
        passengers: {
          total: total + 1,
          adults: adults + 1,
          children: this.state.passengers.children,
          infants: this.state.passengers.infants
        }
      });
    }
  }

  decrementAdult = () => {
    let total = this.state.passengers.total;
    let adults = this.state.passengers.adults;
    let children = this.state.passengers.children;
    let infants = this.state.passengers.infants;

    if (adults > 1 && total > 1 && infants < 1) {
      this.setState({
        passengers: {
          total: total - 1,
          adults: adults - 1,
          children: children,
          infants: infants
        }
      });
    } else if (adults > 1 && total > 1 && infants > 1) {
      this.setState({
        passengers: {
          total: total - 2,
          adults: adults - 1,
          infants: infants - 1,
          children: children
        }
      });
    }
  }

  incrementChildren = () => {
    let total = this.state.passengers.total;
    let adults = this.state.passengers.adults;
    let children = this.state.passengers.children;
    let infants = this.state.passengers.infants;

    if (children < 3 && children + infants < 5 && total < 10 && adults + children < 5) {
      this.setState({
        passengers: {
          total: total + 1,
          children: children + 1,
          adults: adults,
          infants: infants
        }
      });
    }
  }

  decrementChildren = () => {
    let total = this.state.passengers.total;
    let adults = this.state.passengers.adults;
    let children = this.state.passengers.children;
    let infants = this.state.passengers.infants;

    if (children > 0) {
      this.setState({
        passengers: {
          total: total - 1,
          children: children - 1,
          adults: adults,
          infants: infants
        }
      });
    }
  }


  incrementInfants = () => {
    let total = this.state.passengers.total;
    let adults = this.state.passengers.adults;
    let children = this.state.passengers.children;
    let infants = this.state.passengers.infants;

    if (infants < adults) {
      this.setState({
        passengers: {
          total: total + 1,
          infants: infants + 1,
          adults: adults,
          children: children
        }
      });
    }
  }

  decrementInfants = () => {
    let total = this.state.passengers.total;
    let adults = this.state.passengers.adults;
    let children = this.state.passengers.children;
    let infants = this.state.passengers.infants;

    if (infants > 0) {
      this.setState({
        passengers: {
          total: total - 1,
          infants: infants - 1,
          children: children,
          adults: adults
        }
      });
    }
  }

  render() {
    const { passengers, selectedDeparture, departures, arrivals, selectedArrival, startDate, endDate } = this.state;

    const filteredArrivals = selectedDeparture ? arrivals.filter(country => country.value !== selectedDeparture.value) : arrivals;

    return (
      <div className={styles.booking}>
        <p className={styles.booking__title}> Book Flights</p>
        <form className={styles.booking__form}>
          <div className={styles.booking__location}>
            <div className={styles.booking__location_select}>
              <Select
                styles={customStyles}
                value={selectedDeparture}
                onChange={this.handleChangeDeparture}
                options={departures}
              />
            </div>
            <div className={styles.booking__location_select}>
              <Select
                styles={customStyles}
                value={selectedArrival}
                onChange={this.handleChangeArrival}
                options={filteredArrivals}
              />
            </div>
          </div>

          <div className={styles.booking__way}>
            <ul>
              <li>
                <input
                  id="oneWay"
                  type="radio"
                  name="oneWay"
                  value="oneWay"
                  checked={this.state.selectedWay === "oneWay"}
                  onChange={this.handleChangeWay} />
                <label htmlFor="oneWay">One-way</label>
                <div className="check"></div>
              </li>
              <li>
                <input
                  id="return"
                  type="radio"
                  name="return"
                  value="return"
                  checked={this.state.selectedWay === "return"}
                  onChange={this.handleChangeWay} />
                <label htmlFor="return">Return</label>
                <div className="check"></div>
              </li>
            </ul>
          </div>

          <div className={styles.booking__date}>
            <DatePicker
              className={styles.booking__date}
              selected={startDate}
              onChange={this.handleChangeStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Click to select a date"
            />
            {this.state.selectedWay === 'return' &&
              <DatePicker
                selected={endDate}
                onChange={this.handleChangeEndDate}
                selectsEnd
                endDate={endDate}
                minDate={startDate}
                placeholderText="Click to select a date"
              />
            }
          </div>

          <div className={styles.booking__passengers}>
            <div onClick={this.isHidden} className={styles.booking__passengers__total}>
              <div className={styles.booking__passengers__total_text}>{passengers.total} passengers</div>
              <span></span>
              <div className={styles.booking__passengers__total_button}>
                <GetIcon type={Icons.arrowDown} color={Colors.grayLight} size={Size.exstraSmall} />
              </div>
            </div>
            {!this.state.isHidden &&
              <div>
                <div className={styles.booking__passengers__count}>
                  <div className={styles.booking__passengers__count_title}>
                    <span>{passengers.adults} Adults</span> from 12 years
                </div>
                  <div className={styles.booking__passengers__count_buttons}>
                    <div onClick={this.incrementAdult} >
                      <GetIcon type={Icons.circlePlus} color={Colors.white} size={Size.small} />
                    </div>
                    <div onClick={this.decrementAdult}>
                      <GetIcon type={Icons.circleMinus} color={Colors.white} size={Size.small} />
                    </div>
                  </div>
                </div>
                <div className={styles.booking__passengers__count}>
                  <div className={styles.booking__passengers__count_title}>
                    <span>{passengers.children} Children</span> 2-11 years
                </div>
                  <div className={styles.booking__passengers__count_buttons}>
                    <div onClick={this.incrementChildren} >
                      <GetIcon type={Icons.circlePlus} color={Colors.white} size={Size.small} />
                    </div>
                    <div onClick={this.decrementChildren}>
                      <GetIcon type={Icons.circleMinus} color={Colors.white} size={Size.small} />
                    </div>
                  </div>
                </div>
                <div className={styles.booking__passengers__count}>
                  <div className={styles.booking__passengers__count_title}>
                    <span>{passengers.infants} Infants</span> up to 2 years
                </div>
                  <div className={styles.booking__passengers__count_buttons}>
                    <div onClick={this.incrementInfants} >
                      <GetIcon type={Icons.circlePlus} color={Colors.white} size={Size.small} />
                    </div>
                    <div onClick={this.decrementInfants}>
                      <GetIcon type={Icons.circleMinus} color={Colors.white} size={Size.small} />
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </form>
      </div>
    )
  }
}


export default Fly;

const styles = {
  booking__passengers: css`
  margin: 0 20px;
  `,

  booking__passengers__total: css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 350px;
    height: 36px;
    border-radius: 5px;
    background: #fff;
    color: #000;
  `,

  booking__passengers__total_text: css`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 2px 8px;
    
  `,

  booking__passengers__total_button: css`
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  
  `,

  booking__form: css`
    padding: 50px;
  `,

  booking__location: css`
    display: flex;
    margin-bottom: 20px;

    @media (max-width: 569px) {
      flex-direction: column;
    }
  `,

  booking__location_select: css`
    width: 100%;
    max-width: 350px;
    margin: 0 20px;

    @media (max-width: 569px) {
      max-width: 100%;
      margin: 10px 0;
    }
  `,

  booking__way: css`
    margin: 20px 0;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    ul li{
      color: #AAAAAA;
      display: inline-block;
      position: relative;
      margin: 0 20px;
    }

    ul li input[type=radio]{
      position: absolute;
      visibility: hidden;
    }

    ul li label{
      display: block;
      position: relative;
      z-index: 9;
      padding: 5px 0 5px 30px;
      cursor: pointer;
      -webkit-transition: all 0.25s linear;
    }

    ul li .check{
      display: block;
      position: absolute;
      border: 2px solid #AAAAAA;
      border-radius: 100%;
      height: 20px;
      width: 20px;
      top: 3px;
      left: 0;
      z-index: 5;
      transition: border .25s linear;
      -webkit-transition: border .25s linear;
    }

    ul li .check::before {
      display: block;
      position: absolute;
      content: '';
      border-radius: 100%;
      height: 10px;
      width: 10px;
      top: 3px;
      left: 3px;
      margin: auto;
      transition: background 0.25s linear;
      -webkit-transition: background 0.25s linear;
    }

    input[type=radio]:checked ~ .check {
      border: 2px solid #fff;
    }

    input[type=radio]:checked ~ .check::before{
      background: #fff;
    }

    input[type=radio]:checked ~ label{
      color: #fff;
    }
  `,

  booking__date: css`
    display: flex;

    @media (max-width: 569px) {
      flex-direction: column;
    }

    .react-datepicker-wrapper {
      width: 100%;
      max-width: 350px;
      margin: 0 20px;

      @media (max-width: 569px) {
      max-width: 100%;
      margin: 10px 0;
      }
    }
  
    input {
      width: 100%;
      border: none;
      height: 36px;
      font-size: 16px;
      padding: 2px 8px;
      border-radius: 5px;
      outline: none;
    }
  `
}

const customStyles = {
  container: () => ({
    position: 'relative'
  }),
  control: () => ({
    display: "flex",
    borderRadius: "5px",
    background: '#fff'
  }),
  option: () => ({
    borderBottom: '1px solid black',
    color: 'black',
    padding: 10
  }),
  menu: () => ({
    width: '100%',
    marginTop: '5px',
    background: '#fff',
    borderRadius: "5px",
    position: 'absolute',
    top: '41px',
    zIndex: 99999
  }),
  menuList: () => ({
    padding: 0,
    maxHeight: '200px',
    overflow: 'auto'
  }),
}