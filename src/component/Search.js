import React from 'react';
import {css} from 'emotion';

class Search extends React.Component {

    state = {
        result: this.props.apps
    };

    handleChange = (e) => {
        let searchResult = [];
        const searchRequest = e.target.value.trim().toLowerCase().split(' ');

        if(e.target.value.charAt(0) === ' ') {
            e.target.value = '';
        }

        searchRequest.forEach(request => {
            searchResult = this.props.apps.filter(app => {
                const appTitle = app.title.toLowerCase();
                return appTitle.indexOf(request) !== -1;
            });
        });

        this.setState({
            result: searchResult
        });
    };

    render() {
        return (
            <div className={styles.list__wrapper}>
                <div className={styles.list__search}>
                    <input type="text" className="input" onChange={this.handleChange} placeholder="Search..."/>
                </div>
                <ul>
                    {this.state.result.map(app => (
                        <li className={styles.list__app} key={app.title}>
                            <div className={styles.list__app_left}>
                                <div className={css`  ${styles.list__app_img}; background-image: url(${app.image}); `}/>
                                <p className={styles.list__app_title}>{app.title}</p>
                            </div>
                            <div className={styles.list__app_button} onClick={() => this.props.addApp(app.id)}>Add</div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Search;

const styles = {
    list__wrapper: css`
        text-align: left;
        padding: 15px;
        
        ul {
            padding-top: 10px;
            list-style: none;
        }
    `,
    list__search: css`
        input {
            width: 100%;
            padding: 8px;
            border: 1px solid #00000099;
            border-radius: 8px;
            font-size: 17px;
            outline: none;
        }
    `,

    list__app: css `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
    `,

    list__app_left: css `
        display: flex;
        align-items: center;
    `,

    list__app_img: css `
        flex-shrink: 0;
        margin-right: 20px;
        width: 65px;
        height: 65px;
        border: 2px solid #000;
        border-radius: 50%;
        background-position: center;
        background-size: cover;
        
        @media (max-width: 569px) {
             width: 45px;
             height: 45px;
        }   
    `,

    list__app_title: css `
        font-size: 20px;
        
        @media (max-width: 569px) {
             font-size: 16px;
        } 
    `,
    list__app_button: css `
        padding: 5px 10px 4px 10px;
        border: 2px solid #000;
        border-radius: 6px;
        font-size: 18px;
        transition: 0.2s background;
        cursor: pointer;
        
        @media (max-width: 569px) {
             margin-left: 5px;
             padding: 5px 8px 4px 8px;
             font-size: 16px;
        } 
        
        &:hover {
            color: #fff;
            background: #000;
            transition: 0.2s background;
        }
    `
};