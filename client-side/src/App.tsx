import './App.css';
import Game from './Game';


function App() {
  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center space-y-12">
      <div className="absolute top-4 left-4 flex items-center space-x-2">
      <div className=" w-12 h-12 rounded-full bg-gray-400 "></div>
      <span className="text-white text-xl font-bold">leave the match</span>
      </div>
      <div className="flex space-x-48 items-center">
        <span className="flex flex-col items-center space-y-2">
          <span className="h-24 w-24 bg-gray-400 rounded-lg"></span>
          <span className='text-white text-lg font-mono font-bold'>@USER</span>
        </span>
        <span className="text-6xl text-white font-bold">VS</span>
        <span className="flex flex-col items-center space-y-2">
          <span className="h-24 w-24 bg-gray-400 rounded-lg"></span>
          <span className='text-white text-lg font-mono font-bold'>@USER</span>
        </span>
      </div>
      <Game />
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
