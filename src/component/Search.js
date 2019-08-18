import React from 'react';
import {css} from 'emotion';

class Search extends React.Component {

    state = {
        filtered: []
    };

    componentDidMount() {
        this.setState({
            filtered: this.props.apps
        });
    }


    handleChange = (e) => {
        let currentList = [];
        let newList = [];

        if (e.target.value !== "") {
            currentList = this.props.apps;

            const filter = e.target.value.trim().toLowerCase().split(' ');
            newList = currentList;

            filter.forEach(items => {
                newList = newList.filter(item => {
                    const lc = item.title.toLowerCase();
                    return lc.indexOf(items) !== -1;
                });
            })
        } else {
            newList = this.props.apps;
        }

        this.setState({
            filtered: newList
        });
    };

    handleAddApp = (id) => {
        let newApp = {};
        this.props.apps.forEach((item) => {
            if (item.id === id) {
                newApp = item;
            }
            return newApp;
        });
    };

    render() {
        return (
            <div className={styles.list__wrapper}>
                <div className={styles.list__search}>
                    <input type="text" className="input" onChange={this.handleChange} placeholder="Search..."/>
                </div>
                <ul>
                    {this.state.filtered.map(item => (
                        <li key={item.title}>
                            <p>{item.title}</p>
                            <div onClick={() => this.handleAddApp(item.id)} >Add</div>
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
            padding: 3px;
            border: 1px solid #00000099;
            border-radius: 3px;
            font-size: 15px;
        }
    `
};