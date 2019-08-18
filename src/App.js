import React from 'react';
import {injectGlobal, css, cx} from 'emotion';
import DashboardItem from './component/DashboardItem';
import ActionButton from './component/ActionButton';

let id = 1;

class App extends React.Component {
    state = {
        items: [
            {id: id++, image: "/images/img_1.JPG", title: "Title1"},
            {id: id++, image: "/images/img_2.JPG", title: "Title2"},
            {id: id++, image: "/images/img_3.JPG", title: "Title3"},
            {id: id++, image: "/images/img_4.JPG", title: "Title4"},
            {id: id++, image: "/images/img_5.JPG", title: "Title5"},
            {id: id++, image: "/images/img_6.JPG", title: "Title6"},
            {id: id++, image: "/images/img_7.JPG", title: "Title7"},
            {id: id++, image: "/images/img_8.JPG", title: "Title8"},
            {id: id++, image: "/images/img_9.JPG", title: "Title9"}
        ],
        apps: [
            {id: 'la', image: "/images/img_9.JPG", title: "Go to the store"},
            {id: 'da', image: "/images/img_6.JPG", title: "Netflix and Chill"},
            {id: 'ga', image: "/images/img_5.JPG", title: "Pets: Cats, Dogs, and Beyond"}
        ],
        activeItem: 0
    };

    handleHover = indexItem => {
        this.setState({
            activeItem: indexItem
        });
    };

    // handleAddItem = () => {
    //     const newItems = [{id: id++, title: '', image: ''}, ...this.state.items];
    //     this.setState({items: newItems});
    // };
    handleAddApp = (id) => {
        console.log(this.state.apps.map((item) => item.id ))
    };

    handleDeleteItem = (id) => {
        const newItems = this.state.items.filter(item => item.id !== id);
        this.setState({items: newItems});
    };

    handleChangeInput = (event, id) => {
        event.stopPropagation();
        const newItems = this.state.items.map((item) => item.id === id ? {...item, title: event.target.value} : item);
        this.setState({items: newItems});
    };

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    handleKeyPress = event => {
        if (event.which === 37 || event.which === 38 || event.which === 39 || event.which === 40) {
            event.preventDefault();
            const activeItem = this.state.activeItem;
            const lastItem = this.state.items.length - 1;
            let width = document.body.clientWidth;
            let firstItem = document.getElementsByClassName('dashboard')[0].firstChild;
            let widthItem = firstItem.clientWidth;
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

            const scrollElement = document.getElementsByClassName('active')[0];
            const scrollToElement = scrollElement.offsetTop - 100;
            window.scrollTo({
                top: scrollToElement,
                behavior: "smooth"
            });
        }
    };

    handleImageChange = (event, id) => {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            const newItems = this.state.items.map((item) => item.id === id ? {...item, image: reader.result} : item);
            this.setState({items: newItems});
        };
        reader.readAsDataURL(file);
    };

    render() {
        const dashboardItems = this.state.items.map((item, index) => (
            <DashboardItem
                onKeyPress={this.handleKeyPress}
                image={item.image}
                title={item.title}
                key={item.id}
                onHover={() => this.handleHover(index)}
                isActiveItem={this.state.activeItem === index}
                id={item.id}
                onChangeInput={event => this.handleChangeInput(event, item.id)}
                onChangeImage={event => this.handleImageChange(event, item.id)}
                onDeleteItem={() => this.handleDeleteItem(item.id)}
            />
        ));

        return (
            <div>
                <div style={container}>
                    <div className={styles.dashboard__button}>
                        <ActionButton apps={this.state.apps} addApp={() => this.handleAddApp(this.state.apps.id)}/>
                    </div>
                    <div className={cx(styles.dashboard__wrapper, 'dashboard')}>{dashboardItems}</div>
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
      margin: 20px 25px 0 0;
    `
};
