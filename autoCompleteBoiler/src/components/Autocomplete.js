import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../redux/actions';
import {Alert} from './Alert';
import {Loader} from './Loader';

class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userInput: '', filteredUsers: [], activeIndex: 0}
    }

    changeInputHandler = event => {
        event.persist();
        const {users} = this.props;
        const value = event.target.value;
        let filteredUsers = [];
        if (!!value.trim().length) {
            const regex = new RegExp(`^${value}`, 'i');
            filteredUsers = users.slice().filter(o => regex.test(o.name));
        }
        this.setState(() => ({userInput: value, filteredUsers, activeIndex: 0}))
    };

    onKeyDown = event => {
        const {filteredUsers, activeIndex} = this.state;
        if (event.keyCode === 13 && !!filteredUsers.length && filteredUsers[activeIndex]) {
            this.setState({userInput: filteredUsers[activeIndex].name, filteredUsers: [], activeIndex: 0})
        } else if (event.keyCode === 38 && activeIndex) {
            this.setState({activeIndex: activeIndex - 1})
        } else if (event.keyCode === 40 && activeIndex < filteredUsers.length - 1) {
            this.setState({activeIndex: activeIndex + 1})
        }
    };

    onClickUser = (event, user) => {
        event.preventDefault();
        this.setState({userInput: user.name, filteredUsers: [], activeIndex: 0})
    };

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        const {
            onKeyDown,
            changeInputHandler,
            onClickUser,
            props: {loading, alert},
            state: {userInput, filteredUsers, activeIndex}
        } = this;
        let usersList;

        if (loading) {
            return <Loader/>
        }

        if (!!filteredUsers.length) {
            usersList = (
                <ul className="autocomplete__users">
                    {filteredUsers.map((user, index) => {
                        let className = ['autocomplete__user'];
                        if (index === activeIndex) className.push('autocomplete__user_active');
                        return (
                            <li className={className.join(' ')} key={user.id} onClick={(e) => onClickUser(e, user)}>
                                {user.name}
                            </li>
                        )
                    })}
                </ul>
            )
        }

        return (
            <div className="autocomplete">
                <div className="autocomplete__form">
                    <label htmlFor="input">Auto Completed</label>
                    <input type="text"
                           id="input"
                           value={userInput}
                           placeholder={'Name'}
                           autoComplete="off"
                           onKeyDown={onKeyDown}
                           onChange={changeInputHandler}/>
                </div>
                {usersList}
                {alert && <Alert text={alert}/>}
            </div>
        )
    }
}

const mapDispatchToProps = {
    fetchUsers
};

const mapStateToProps = state => ({
    users: state.users.fetchedUsers,
    loading: state.app.loading,
    alert: state.app.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete)