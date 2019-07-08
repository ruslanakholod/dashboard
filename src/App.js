import React from 'react';
import {injectGlobal, css} from 'emotion';
import DashboardItem from './component/DashboardItem';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            items: [
                {img: "/images/img_1.JPG", title: "Title1"},
                {img: "/images/img_2.JPG", title: "Title2"},
                {img: "/images/img_3.JPG", title: "Title3"},
                {img: "/images/img_4.JPG", title: "Title4"},
                {img: "/images/img_5.JPG", title: "Title5"},
                {img: "/images/img_6.JPG", title: "Title6"},
                {img: "/images/img_7.JPG", title: "Title7"},
                {img: "/images/img_8.JPG", title: "Title8"},
                {img: "/images/img_9.JPG", title: "Title9"}
            ],
            activeItem: 0
        };
    }

    handleHover(indexItem) {
        this.setState({
            activeItem: indexItem
        });
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    handleKeyPress = event => {
        event.preventDefault();
        const activeItem = this.state.activeItem;
        const lastItem = this.state.items.length - 1;
        let width = document.body.clientWidth;

        // Event on key press

        if (event.which === 38) {
            if (width >= 1024) {
                if (activeItem - 2 > 0) {
                    this.setState({activeItem: activeItem - 3});
                    window.scrollTo({
                        top: this.state.activeItem,
                        behavior: "smooth"
                    });
                } else if (activeItem === 0) {
                    this.setState({activeItem: lastItem});
                }
            } else if (1024 > width && width >= 570) {
                if (activeItem - 1 > 0) {
                    this.setState({activeItem: activeItem - 2});
                } else if (activeItem === 0) {
                    this.setState({activeItem: lastItem});
                }
            } else if (width < 570) {
                if (activeItem === 0) {
                    this.setState({activeItem: lastItem});
                } else {
                    this.setState({activeItem: activeItem - 1});
                }
            }
        }

        if (event.which === 40) {
            if (width >= 1024) {
                if (activeItem + 2 < lastItem) {
                    this.setState({activeItem: activeItem + 3});
                } else if (activeItem === lastItem) {
                    this.setState({activeItem: 0});
                }
            } else if (1024 > width && width >= 570) {
                if (activeItem + 1 < lastItem) {
                    this.setState({activeItem: activeItem + 2});
                } else if (activeItem === lastItem) {
                    this.setState({activeItem: 0});
                }
            } else if (width < 570) {
                if (activeItem === lastItem) {
                    this.setState({activeItem: 0});
                } else {
                    this.setState({activeItem: activeItem + 1});
                }
            }
        }

        if (event.which === 37) {
            if (activeItem === 0) {
                this.setState({activeItem: this.state.items.length - 1});
            } else {
                this.setState({activeItem: activeItem - 1});
            }
        }

        if (event.which === 39) {
            if (activeItem === this.state.items.length - 1) {
                this.setState({activeItem: 0});
            } else {
                this.setState({activeItem: activeItem + 1});
            }
        }

        // Scroll to active element

        const scrollElement = document.getElementById(this.state.activeItem + 1);
        const scrollToElement = scrollElement.offsetTop - 100;
        window.scrollTo({
            top: scrollToElement,
            behavior: "smooth"
        });
    };

    render() {
        const dashboardItems = this.state.items.map((item, index) => (
            <DashboardItem
                onKeyPress={this.handleKeyPress}
                img={item.img}
                title={item.title}
                key={item.title}
                onHover={() => this.handleHover(index)}
                isActiveItem={this.state.activeItem === index ? true : false}
                id={index + 1}
            />
        ));

        return (
            <div>
                <div style={container}>
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
    padding: "0 25px"
};

const styles = {
    dashboard__wrapper: css`
    display: flex;
    flex-wrap: wrap;
    padding: 50px 0;
  `
};
