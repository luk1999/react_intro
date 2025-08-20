import { GamesList } from './games/GameList';

export default function App() {
    return (
        <div class="container">
            <header class="mb-2">
                <nav class="navbar bg-primary" data-bs-theme="dark">
                    <div class="container">
                        <span class="navbar-brand h1">Games Portal</span>
                    </div>
                </nav>
            </header>

            <GamesList></GamesList>
        </div>
    );
}
