import React, { useState, useRef } from 'react';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import '../src/index.css';

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  } else {
    return (
      <>
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
          {room ? (
            <div className="w-full max-w-lg">
              <Chat userRoom={room} />
            </div>
          ) : (
            <div className="createRoom p-10 max-w-lg bg-white rounded-lg shadow-md">
              <h1 className="text-4xl text-center my-2 font-semibold">Create Room</h1>
              <div className="flex justify-center my-10">
                <input
                  type="text"
                  className="p-2 px-8 outline-none border-2 border-gray-400 rounded"
                  ref={roomInputRef}
                  placeholder="Enter Room Name"
                />
              </div>
              <div className="text-center">
                <button
                  className="rounded p-3 px-8 bg-blue-500 text-white"
                  onClick={() => setRoom(roomInputRef.current.value)}
                >
                  Create Room
                </button>
              </div>
            </div>
          )}
          <div className="mt-4">
            <button onClick={signUserOut} className="p-2 px-6 bg-red-500 text-white rounded-lg">
              Sign Out
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default App;
