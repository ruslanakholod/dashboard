import React from 'react';
import {injectGlobal, css} from 'emotion';
import DashboardItem from './component/DashboardItem';

let id = 1;

class App extends React.Component {

    state = {
        items: [
            {id: id++, img: "/images/img_1.JPG", title: "Title1"},
            {id: id++, img: "/images/img_2.JPG", title: "Title2"},
            {id: id++, img: "/images/img_3.JPG", title: "Title3"},
            {id: id++, img: "/images/img_4.JPG", title: "Title4"},
            {id: id++, img: "/images/img_5.JPG", title: "Title5"},
            {id: id++, img: "/images/img_6.JPG", title: "Title6"},
            {id: id++, img: "/images/img_7.JPG", title: "Title7"},
            {id: id++, img: "/images/img_8.JPG", title: "Title8"},
            {id: id++, img: "/images/img_9.JPG", title: "Title9"}
        ],
        activeItem: 0
    };

    handleHover = indexItem => {
        this.setState({
            activeItem: indexItem
        });
    };

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    addNewItem = () => {
        const newItems = this.state.items.map(item => ({...item, id: item.id + 1 }));
        const item = {
            id: 1,
            title: '',
            img: '',
        };
        newItems.unshift(item);
        this.setState({items: newItems});
    };

    handleKeyPress = event => {

        if (event.which === 37 || event.which === 38 || event.which === 39 || event.which === 40) {
            event.preventDefault();
            const activeItem = this.state.activeItem;
            const lastItem = this.state.items.length - 1;
            let width = document.body.clientWidth;
            let widthItem = document.getElementById(1).clientWidth;
            let row = parseInt(width / widthItem);


            /* Event on key press */

            // Press arrow up

            if (event.which === 38) {
                if (activeItem - row >= 0) {
                    this.setState({activeItem: activeItem - row});
                } else if (activeItem === 0) {
                    this.setState({activeItem: lastItem});
                }
            }

            // Press arrow down

            if (event.which === 40) {
                if (activeItem + row <= lastItem) {
                    this.setState({activeItem: activeItem + row});
                } else if (activeItem === lastItem) {
                    this.setState({activeItem: 0});
                }
            }

            // Press arrow left

            if (event.which === 37) {
                if (activeItem === 0) {
                    this.setState({activeItem: this.state.items.length - 1});
                } else {
                    this.setState({activeItem: activeItem - 1});
                }
            }

            // Press arrow right

            if (event.which === 39) {
                if (activeItem === this.state.items.length - 1) {
                    this.setState({activeItem: 0});
                } else {
                    this.setState({activeItem: activeItem + 1});
                }
            }

            /* Scroll to active element */

            const scrollElement = document.getElementById(this.state.activeItem + 1);
            const scrollToElement = scrollElement.offsetTop - 100;
            window.scrollTo({
                top: scrollToElement,
                behavior: "smooth"
            });

        }

    };

    handleChangeInput = (event, id) => {
        event.stopPropagation();
        const newItems = this.state.items.map((item) => item.id === id ? {...item, title: event.target.value} : item);
        this.setState({items: newItems});
    };


    render() {
        const dashboardItems = this.state.items.map((item, index) => (
            <DashboardItem
                onKeyPress={this.handleKeyPress}
                img={item.img}
                title={item.title}
                key={item.id}
                onHover={() => this.handleHover(index)}
                isActiveItem={this.state.activeItem === index}
                id={item.id}
                onChangeInput={event => this.handleChangeInput(event, item.id)}
            />
        ));

        const Button = (
            <button onClick={this.addNewItem}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     width="40px" height="40px" viewBox="0 0 612 612">
                    <path d="M306,0C136.992,0,0,136.992,0,306s136.992,306,306,306s306-137.012,306-306S475.008,0,306,0z M306,573.75
                                C158.125,573.75,38.25,453.875,38.25,306C38.25,158.125,158.125,38.25,306,38.25c147.875,0,267.75,119.875,267.75,267.75
                                C573.75,453.875,453.875,573.75,306,573.75z M420.75,286.875h-95.625V191.25c0-10.557-8.568-19.125-19.125-19.125
                                c-10.557,0-19.125,8.568-19.125,19.125v95.625H191.25c-10.557,0-19.125,8.568-19.125,19.125c0,10.557,8.568,19.125,19.125,19.125
                                h95.625v95.625c0,10.557,8.568,19.125,19.125,19.125c10.557,0,19.125-8.568,19.125-19.125v-95.625h95.625
                                c10.557,0,19.125-8.568,19.125-19.125C439.875,295.443,431.307,286.875,420.75,286.875z"
                          fill='white'/>
                </svg>
            </button>
        );

        return (
            <div>
                <div style={container}>
                    <div className={styles.dashboard__button}>
                        {Button}
                    </div>
                    <div className={styles.dashboard__wrapper}>{dashboardItems}</div>
                </div>
            </div>
        );
    }
}

export default App;

injectGlobal`
  body {
    background-color: #111518;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif, sans-serif;
  }
`;

const container = {
    maxWidth: "1550px",
    margin: "0 auto",
    padding: "0 15px"
};

const styles = {
    dashboard__wrapper: css`
    display: flex;
    flex-wrap: wrap;
    padding: 30px 0 50px 0;
  `,
    dashboard__button: css`
    text-align: right;
    
    button {
    height: 40px;
    margin: 20px 25px 0 0;
    border: 0;
    background: none;
    cursor: pointer;
    }
    `
};
