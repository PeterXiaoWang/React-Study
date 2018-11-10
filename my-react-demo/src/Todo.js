import React, { Component } from 'react';
import './App.css';

class Message extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.index = this.props.index;
        this.props.onItemDone(event);
    }

    render() {
        const message = this.props.message;
        const done = this.props.state;
        if (done) {
            return (<div>
                <li>
                    <i className="message-done">
                        {message}
                    </i>
                    <button onClick={this.handleClick}>
                        UNDONE
                    </button>
                </li>
            </div>
            );
        }
        else {
            return (<div>
                <li>
                    <i className="message-undone">
                        {message}
                    </i>
                    <button onClick={this.handleClick}>
                        Done
                    </button>
                </li>
            </div>
            );
        }
    }
}

class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '请输入',
            messages: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        const arrary = this.state.messages;
        const content = this.state.value;

        const item = {
            message: content,
            isDone: false,
            index: (new Date()).valueOf()
        }

        if (content.length !== 0) {
            arrary.push(item);
        }

        this.setState({
            value: "",
            message: arrary
        });

        event.preventDefault();
    }

    handleDone(event) {
        const currentIndex = event.index;
        const messageList = this.state.messages;

        for (var num = 0; num < messageList.length; num++) {
            var item = messageList[num];
            if (item.index === currentIndex) {
                var currentState = item.isDone
                item.isDone = !currentState;
            }
        }

        this.setState({ messages: messageList });
        console.log(messageList);
    }

    render() {
        const messageList = this.state.messages;
        const listItems = messageList.map((messageList) =>
            <Message message={messageList.message} onItemDone={this.handleDone} state={messageList.isDone} index={messageList.index} />
        );
        return (
            <div className="App">
                <header className="App-header">
                    <ul>
                        {listItems}
                    </ul>

                    <ul>
                        <form onSubmit={this.handleSubmit}>
                            <ul>
                                <label>
                                    <textarea value={this.state.value} onChange={this.handleChange} />
                                </label>
                            </ul>
                            <ul>
                                <input type="submit" value="新增" />
                            </ul>
                        </form>
                    </ul>
                </header>
            </div>
        );
    }
}

export default Todo;