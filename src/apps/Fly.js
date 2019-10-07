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
      passengers: null
    },

    departures: [
      { value: 'Minsk', label: 'Minsk (MSQ), BY' },
      { value: 'Paris', label: 'Paris (PAR), FR' },
      { value: 'Amsterdam', label: 'Amsterdam (AMS), NL' }
    ],

    arrivals: [
      { value: 'Minsk', label: 'Minsk (MSQ), BY' },
      { value: 'Paris', label: 'Paris (PAR), FR' },
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
    let selectedDate = new Date(date);
    this.setState({ startDate: selectedDate.getTime() });
  };

  handleChangeEndDate = date => {
    let selectedDate = new Date(date);
    this.setState({ endDate: selectedDate.getTime() });
  };

  countPassengers = (type) => {
    let total = this.state.passengers.total;
    let adults = this.state.passengers.adults;
    let children = this.state.passengers.children;
    let infants = this.state.passengers.infants;

    if (type === 'incrementAdult') {
      if (adults < 5) {
        this.setState({
          passengers: {
            total: total + 1,
            adults: adults + 1,
            children: children,
            infants: infants
          }
        });
      }
    }

    else if (type === 'decrementAdult') {
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

    else if (type === 'incrementChildren') {
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

    else if (type === 'decrementChildren') {
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

    else if (type === 'incrementInfants') {
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

    else if (type === 'decrementInfants') {
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
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    this.setState({
      formData: {
        departure: this.state.selectedDeparture ? this.state.selectedDeparture.value : this.state.selectedDeparture,
        arrival: this.state.selectedArrival ? this.state.selectedArrival.value : this.state.selectedArrival,
        way: this.state.selectedWay,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        passengers: this.state.passengers
      }
    }, () => {
      console.log(this.state.formData);
    });

  }

  render() {
    const { passengers, selectedDeparture, departures, arrivals, selectedArrival, startDate, endDate } = this.state;

    const filteredArrivals = selectedDeparture ? arrivals.filter(country => country.value !== selectedDeparture.value) : arrivals;

    return (
      <div className={styles.booking}>
        {/* <p className={styles.booking__title}> Book Flights</p> */}
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
            <div className={styles.booking__date__wrapper}>
              <DatePicker
                className={styles.booking__date}
                selected={startDate}
                onChange={this.handleChangeStartDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Click to select a date"
              />
            </div>
            <div className={styles.booking__date__wrapper}>
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
          </div>

          <div ref={this.setWrapperRef} className={styles.booking__passengers}>
            <div onClick={this.isHidden} className={styles.booking__passengers__total}>
              <div className={styles.booking__passengers__total_text}>
                <p>{passengers.total} {passengers.total > 1 ? 'passengers' : 'passenger'}</p>
                <p>{passengers.adults} {passengers.adults > 1 ? 'adults, ' : 'adult, '}
                  {passengers.children} {passengers.children > 1 ? 'children, ' : 'child, '}
                  {passengers.infants} {passengers.infants > 1 ? 'infants' : 'infant'}</p>
              </div>
              <span></span>
              <div className={styles.booking__passengers__total_button}>
                <GetIcon type={Icons.arrowDown} color={Colors.grayLight} size={Size.exstraSmall} />
              </div>
            </div>
            {!this.state.isHidden &&
              <div className={styles.booking__passengers__menu}>
                <CouterPassengers passengers={passengers.adults} title='adult' pluralTitle='adults' description='from 12 years' onIncrement={() => this.countPassengers('incrementAdult')} onDecrement={() => this.countPassengers('decrementAdult')} />
                <CouterPassengers passengers={passengers.children} title='child' pluralTitle='children' description='2-11 years' onIncrement={() => this.countPassengers('incrementChildren')} onDecrement={() => this.countPassengers('decrementChildren')} />
                <CouterPassengers passengers={passengers.infants} title='infant' pluralTitle='infants' description='up to 2 year' onIncrement={() => this.countPassengers('incrementInfants')} onDecrement={() => this.countPassengers('decrementInfants')} />
              </div>
            }
          </div>
          <button className={styles.booking__button} onClick={e => this.onSubmitForm(e)} type="submit">Search</button>
        </form>
      </div >
    )
  }
}

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

export default Fly;

const styles = {

  booking: css`
    width: 100%;
  `,

  booking__form: css`
    max-width: 750px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
  `,

  booking__location: css`
    display: flex;

    @media (max-width: 569px) {
      flex-direction: column;
    }
  `,

  booking__location_select: css`
    width: 50%;
    margin: 0 20px;

    @media (max-width: 569px) {
      width: 100%;
      margin: 20px 0;
    }
  `,

  booking__way: css`
    margin: 40px 0;

    @media (max-width: 569px) {
      margin: 20px 0;
    }

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

      @media (max-width: 569px) {
        margin: 0 20px 0 0;
      }
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
    }
  
    input {
      width: 100%;
      border: none;
      height: 45px;
      font-size: 16px;
      padding: 2px 8px;
      border-radius: 5px;
      outline: none;
    }

    .react-datepicker-popper {
      z-index: 9;
    }
  `,

  booking__date__wrapper: css`
      width: 50%;
      margin: 0 20px;

      @media (max-width: 569px) {
      width: 100%;
      margin: 20px 0;
      }
  `,

  booking__passengers: css`
    display: inline-block;
    width: 100%;
    padding: 0 20px;
    position: relative;

     @media (max-width: 569px) {
      padding: 0;
    }
  `,

  booking__passengers__total: css`
    display: flex;
    justify-content: space-between;
    height: 45px;
    border-radius: 5px;
    margin: 40px 0;
    background: #fff;
    color: #000;

    @media (max-width: 569px) {
      margin: 0 0 20px 0;
    }

    span {
      display: block;
      background-color: hsl(0,0%,80%);
      margin-bottom: 8px;
      margin-top: 8px;
      width: 1px;
    }
  `,

  booking__passengers__total_text: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    padding: 2px 8px;

    p:last-of-type {
      font-size: 13px;
      color: rgb(154, 154, 154);
    }
  `,

  booking__passengers__total_button: css`
    width: 36px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      stroke-width: 29px;
    }
  `,

  booking__passengers__menu: css`
    width: calc(100% - 40px);
    margin-top: 5px;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    top: 90px;
    z-index: 99999;

    @media (max-width: 569px) {
      width: 100%;
      top: 55px;
    }
  `,

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
  `,

  booking__button: css`
    margin: 20px 20px;
    width: 100%;
    max-width: 200px;
    height: 40px;
    border: 2px solid #fff;
    border-radius: 6px;
    font-size: 20px;
    transition: 0.2s background;
    cursor: pointer;
    background: transparent;
    color: #fff;
    outline: none;

    @media (max-width: 569px) {
      margin: 40px 0 100px 0;
    }
        
    &:hover {
      color: #fff;
      background: #000;  
      transition: 0.2s background;
    }
  `
}

const customStyles = {
  container: () => ({
    position: 'relative'
  }),
  control: () => ({
    display: "flex",
    height: '45px',
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
    marginTop: '15px',
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