import { ReactP5Wrapper } from '@p5-wrapper/react';
import './App.css';
import game from './Game';
import io from 'socket.io-client'
import { useEffect } from 'react';

const socket = io("http://localhost:3000");

function App() {

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      socket.emit("enter");
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
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
      <div className="canvas">
        <ReactP5Wrapper sketch={game}/>
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
