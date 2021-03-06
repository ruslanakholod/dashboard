import React from 'react';
import { injectGlobal, css, cx } from 'emotion';
import DashboardApp from './component/DashboardApp';
import Search from './component/Search';
import RoundButton from './component/RoundButton';
import { Colors, Icons, Size } from './variables';

let id = 1;

class App extends React.Component {

  state = {
    addedApps: [],
    apps: [
      { id: 'calculator', image: "/images/img_1.JPG", title: "Calculator", component: 'Calculator' },
      { id: 'fly', image: "/images/img_6.JPG", title: "BookFly", component: 'Fly' },
      { id: 'ga', image: "/images/img_5.JPG", title: "Pets: Cats, Dogs, and Beyond", component: 'NoApp' },
      { id: id++, image: "/images/img_1.JPG", title: "Title1", component: 'NoApp' },
      { id: id++, image: "/images/img_2.JPG", title: "Title2", component: 'NoApp' },
      { id: id++, image: "/images/img_5.JPG", title: "Title5", component: 'NoApp' },
      { id: id++, image: "/images/img_6.JPG", title: "Title6", component: 'NoApp' },
      { id: id++, image: "/images/img_7.JPG", title: "Title7", component: 'NoApp' },
      { id: id++, image: "/images/img_8.JPG", title: "Title8", component: 'NoApp' }
    ],
    activeItem: 0
  };


  componentDidUpdate() {
    localStorage.setItem('addedApps', JSON.stringify(this.state.addedApps));
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    let apps = JSON.parse(localStorage.getItem('addedApps'));

    this.setState({
      addedApps: apps
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleHover = indexApp => {
    this.setState({
      activeItem: indexApp
    });
  };

  handleDeleteApp = (id) => {
    const newItems = this.state.addedApps.filter(item => item.id !== id);
    this.setState({ addedApps: newItems });
  };

  // handleChangeInput = (event, id) => {
  //     event.stopPropagation();
  //     const newItems = this.state.addedApps.map((item) => item.id === id ? { ...item, title: event.target.value } : item);
  //     this.setState({ addedApps: newItems });
  // };

  handleKeyPress = event => {
    if (event.which === 37 || event.which === 38 || event.which === 39 || event.which === 40) {
      event.preventDefault();
      const activeItem = this.state.activeItem;
      const lastItem = this.state.addedApps.length - 1;
      let width = document.body.clientWidth;
      let firstItem = document.getElementsByClassName('dashboard')[0].firstChild;
      let widthItem = firstItem.clientWidth;
      let row = parseInt(width / widthItem);

      /* Event on key press */

      // Press arrow up

      if (event.which === 38) {
        if (activeItem - row >= 0) {
          this.setState({ activeItem: activeItem - row });
        } else if (activeItem === 0) {
          this.setState({ activeItem: lastItem });
        }
      }

      // Press arrow down

      if (event.which === 40) {
        if (activeItem + row <= lastItem) {
          this.setState({ activeItem: activeItem + row });
        } else if (activeItem === lastItem) {
          this.setState({ activeItem: 0 });
        }
      }

      // Press arrow left

      if (event.which === 37) {
        if (activeItem === 0) {
          this.setState({ activeItem: this.state.addedApps.length - 1 });
        } else {
          this.setState({ activeItem: activeItem - 1 });
        }
      }

      // Press arrow right

      if (event.which === 39) {
        if (activeItem === this.state.addedApps.length - 1) {
          this.setState({ activeItem: 0 });
        } else {
          this.setState({ activeItem: activeItem + 1 });
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
      const newItems = this.state.addedApps.map((item) => item.id === id ? { ...item, image: reader.result } : item);
      this.setState({ addedApps: newItems });
    };
    reader.readAsDataURL(file);

  };

  addAppToDashboard = (id) => {
    const app = this.state.apps.find(app => app.id === id);
    if (this.state.addedApps) {
      this.setState({ addedApps: [app, ...this.state.addedApps] })
    } else {
      this.setState({ addedApps: [app] })
    }

  };

  render() {
    let dashboardApps;
    if (this.state.addedApps !== null) {
      dashboardApps = this.state.addedApps.map((app, index) => (
        <DashboardApp
          onKeyPress={this.handleKeyPress}
          image={app.image}
          title={app.title}
          key={app.id}
          app={app.component}
          onHover={() => this.handleHover(index)}
          isActiveItem={this.state.activeItem === index}
          id={app.id}
          // onChangeInput={event => this.handleChangeInput(event, app.id)}
          onChangeImage={event => this.handleImageChange(event, app.id)}
          onDeleteItem={() => this.handleDeleteApp(app.id)}
        />
      ));
    }

    return (
      <div>
        <div style={container}>
          <div className={styles.dashboard__button}>
            <RoundButton icon={Icons.circlePlus} color={Colors.white} size={Size.big}
              search={<Search addApp={(id) => this.addAppToDashboard(id)}
                apps={this.state.apps} addedApps={this.state.addedApps} />} />
          </div>
          <div className={cx(styles.dashboard__wrapper, 'dashboard')}>{dashboardApps}</div>
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
      font-family: Helvetica, Arial, sans-serif;       
    }

    button:disabled {
      cursor: not-allowed;
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
              padding: 30px 15px;
            `,

  dashboard__button: css`
              text-align: right;
              margin: 50px 35px 0 0;
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

  window_app: css`
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4);
    `,

  window_app__wrapper: css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 600px;
        width: 100%;
        padding: 80px 50px;
        border-radius: 10px;
        border: 2px solid gray;
        background: black;
    `,
};
