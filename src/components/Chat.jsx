import React, { useEffect, useState } from 'react'
//use to add document to the firestore collection
import { addDoc, collection, orderBy, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig';
const Chat = (props) => {
    const { userRoom } = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([])
    //reference to the collection that we have created in firestore
    const messageRef = collection(db, "message");


    //************************************************* *//
    // **************Messaging Logic *******************//
    //************************************************* *//
    useEffect
        (() => {
            const queryMessage = query(messageRef,
                where("room", "==", userRoom), orderBy("createdAt")
                );

        
    const unSubscribe = onSnapshot(queryMessage, (snapshot) => {
        console.log("New Message");
        //array of messafes
        let messages = [];
        snapshot.forEach((doc) => {
            //grabbing the data from doc  existing data  +
            // the current data with id  -> (firebase syntax)
            messages.push({ ...doc.data(), id: doc.id })
        });
        setMessages(messages)
    })
    //cleanup the useEffect after use to avoid the leaks of data
    return () => unSubscribe();
}, [])

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newMessage)
    console.log(userRoom)
    //sending the message to firestore
    if (!newMessage || !auth.currentUser) {
        console.log("Invalid")
        return;
    }

    //using the message colletion
    await addDoc(messageRef, {
        text: newMessage, //message to be sent
        createdAt: serverTimestamp(), //time when message was created
        user: auth.currentUser.displayName, //auth provides the function of current logged in user
        room: userRoom, //saving the room name enterd by user

    });
    console.log(messageRef)
    //setting the message empty after sending it to db

    setNewMessage("");
}
return (
    <>
        <div className="chatApp border-2 p-10 w-full mx-auto ">
            <div className="text-center text-4xl font-bold text-blue-600 bg-gray-900 p-5"><h1>Welcome to :{userRoom.toUpperCase()}</h1></div>
            <div className=" bg-blue-200 w-full  my-5 p-10">{messages.map((item) => {
                return (
                    <>
                        <div className="message-box" key={item.id}>
                            <span className="user font-semibold">{item.user} :</span>
                            {item.text}
                        </div>
                    </>
                )
            })}</div>
            <form onSubmit={handleSubmit} className='newMessageForm'>
                <div className="w-full flex py-3">
                    <input type="text" value={newMessage} className='newMessageInput p-2 outline-none w-full ' placeholder='Type yout message here ..'
                        onChange={
                            (e) => {
                                setNewMessage(e.target.value)
                            }
                        } />
                    <button type="submit" className="sendBtn p-2 px-6 bg-blue-500 rounded-e-lg">Send</button>
                </div>
            </form>
        </div>
    </>
)
}

export default Chat