import { ReactP5Wrapper } from '@p5-wrapper/react';
import './App.css';
import game from './Game';
import { io, Socket } from 'socket.io-client'
import { useEffect, useState } from 'react';


const socket: Socket = io("http://localhost:8000");



function App() {

  const [playerY, setPlayerY] = useState<number>();
  const [ball, setBall] = useState({x: 0, y: 0});

  useEffect(() => {
    socket.on("update", (data) => {
      setPlayerY(data.leftPlayerY);
      setBall(data.ballPos);
    });
    return() => {
      socket.off("update");
    }
  }, []);

  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center space-y-12">
      <div className="absolute top-4 left-4 flex items-center space-x-2">
      <div className=" w-12 h-12 rounded-full bg-gray-400 "></div>
      <span className="text-white text-xl font-bold">leave the match</span>
      </div>
      <div className="flex space-x-48 items-center">
        <span className="flex flex-col items-center space-y-2">
          <span className="h-24 w-24 canvas"></span>
          <span className='text-white text-lg font-mono font-bold'>@USER</span>
        </span>
        <span className="text-6xl text-white font-bold">VS</span>
        <span className="flex flex-col items-center space-y-2">
          <span className="h-24 w-24 canvas"></span>
          <span className='text-white text-lg font-mono font-bold'>@USER</span>
        </span>
      </div>
      <div id="canvas-parent">
        <ReactP5Wrapper sketch={game} playerY={playerY} ball={ball}/>
      </div>
      <div className="flex flex-col items-center">
      <span className="text-4xl text-white font-bold underline">score</span>
        <div className="flex space-x-48 items-center">
          <span className="text-white text-5xl font-black">0</span>
          <span className="text-white text-5xl font-black">:</span>
          <span className="text-white text-5xl font-black">0</span>
        </div>
      </div>
    </div>
  );
}

export default App;
