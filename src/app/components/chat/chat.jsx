import React from 'react';
import { connect } from 'react-redux';

import { pushMessageStarted, loadMessagesStarted } from '../../store/actions/chat';

import style from './chat.scss';

import ChatHeader from './chat-header/chat-header';
import ChatMessagesList from './chat-messages-list/chat-messages-list';
import ChatMessageInput from './chat-message-input/chat-message-input';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.loadMessagesStarted();
  }

  render() {
    const { title, messages } = this.props;

    return (
      <div className={style.chatContainer}>
        <ChatHeader title={title}/>
        <ChatMessagesList messages={messages} />
        <ChatMessageInput onMessageSend={this.sendMessage}/>
      </div>
    );
  }

  sendMessage(content) {
    const message = {
      content,
      time: new Date().toISOString(),
      author: {
        id: '1',
        name: 'Iryna',
      },
    };

    console.log(message);
    this.props.pushMessageStarted(message);
  }
}

const mapStateToProps = (state) => ({
  messages: state.getIn(['chat', 'messages']),
  title: state.getIn(['chat', 'chatName']),
});

const mapActionsToProps = {
  pushMessageStarted,
  loadMessagesStarted,
};

export default connect(mapStateToProps, mapActionsToProps)(Chat);
