import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { GamesDetails } from './games/GameDetails';
import { GamesList } from './games/GameList';

export default function App() {
    return (
        <BrowserRouter>
            <div class="container">
                <header class="mb-2">
                    <nav class="navbar bg-primary" data-bs-theme="dark">
                        <div class="container">
                            <Link to="/" class="navbar-brand h1">Games Portal</Link>
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<GamesList/>} />
                    <Route path="/game/:id" element={<GamesDetails/>} />
                </Routes>
            </div>
        </BrowserRouter>  
    );
}
