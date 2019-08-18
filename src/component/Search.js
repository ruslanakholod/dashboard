import React from 'react';
import {css} from 'emotion';

class Search extends React.Component {

    state = {
        list: [
            "Go to the store",
            "Netflix and Chill",
            "Pets: Cats, Dogs, and Beyond"
        ],
        filtered: []
    };

    componentDidMount() {
        this.setState({
            filtered: this.state.list
        });
    }

    handleChange = (e) => {
        let currentList = [];
        let newList = [];

        if (e.target.value !== "") {
            currentList = this.state.list;

            const filter = e.target.value.trim().toLowerCase().split(' ');
            newList = currentList;

            filter.forEach(items => {
                newList = newList.filter(item => {
                    const lc = item.toLowerCase();
                    return lc.indexOf(items) !== -1;
                });
            })
        } else {
            newList = this.state.list;
        }

        this.setState({
            filtered: newList
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
                        <li key={item}>
                            {item}
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