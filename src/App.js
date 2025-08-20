import './App.css';

import GAMES from './games.json';
import { GamesList } from './games/GameList';

export default function App() {
    return (
        <div className="App">
            <header className="App-header">Games Portal</header>
            <GamesList games={GAMES}></GamesList>
        </div>
    );
}
