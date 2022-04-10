import React, { useEffect, useState } from 'react';
import '../css/MessageInbox.css';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CONVERSATIONS } from '../../redux/types/types';
import SendIcon from '@material-ui/icons/Send';

function MessagesInbox() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userID } = useParams();

  const loginstatus = useSelector(state => state.logincredentials.status);
  const adminID = useSelector(state => state.logincredentials.adminID);
  const adminNav = useSelector(state => state.adminNav);
  const conversations = useSelector(state => state.conversations);

  const [msgcont, setmsgcont] = useState("");

  useEffect(() => {
    ///messagesInboxAdmin/:username/:othername
    Axios.get(`http://localhost:3001/messagesInboxAdmin/${adminID}/${userID}`, {
        headers:{
            "x-access-token": localStorage.getItem('token')
        }
    }).then((response) => {
        // console.log(response.data);
        dispatch({type: SET_CONVERSATIONS, conversations: response.data})
    }).catch((err) => console.log(err));
  }, [adminID, conversations]);

  const sendMessage = () => {
      Axios.post('http://localhost:3001/sendMessageAdmin', {
        message_content: msgcont,
        from: adminID,
        to: userID
      }, {
          headers:{
              "x-access-token": localStorage.getItem('token')
          }
      }).then((response) => {
          setmsgcont("");
      }).catch((err) => console.log(err));
  }  

  return (
    <div id='div_messages_conversation'>
        <nav id='nav_messages_conversation'>
            <li className='li_messages_conversation'>
                <p>{userID}</p>
            </li>
            <li className='li_messages_conversation'>
                {conversations.length == 0? (
                    <h4 id='no_conversations_label'>No Conversations Yet</h4>
                ) : (
                    conversations.map((msgs) => {
                        return(
                            <p className={`msgs_content ${msgs.from == adminID? "me" : "other"}`}>{msgs.message_content}</p>
                        )
                    })
                )}
            </li>
            <li className='li_messages_conversation'>
                <nav id='nav_navigations'>
                    <li className='li_navigations'>
                        <input type='text' name='msg_text' id='msg_text' value={msgcont} onChange={(e) => {setmsgcont(e.target.value)}} />
                    </li>
                    <li className='li_navigations'>
                        <button id='btn_sender' onClick={() => sendMessage()}><SendIcon /></button>
                    </li>
                </nav>
            </li>
        </nav>
    </div>
  )
}

export default MessagesInbox