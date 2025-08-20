# Bootstrap framework

## How to add Bootstrap

We can use 3rd party CSS frameworks instead of creating custom CSS styles.
In our case we just follow [Adding bootstrap guide](https://create-react-app.dev/docs/adding-bootstrap/) 
and install popular Bootstrap.

First we need to add it to our dependencies list and install:
```bash
npm install bootstrap
```

And then include it as an import in `src/index.js` file:
```javascript
// Other imports
import 'bootstrap/dist/css/bootstrap.css';

// Code
```

## Add Bootstrap classes

First, we're going to add a Bootstrap [Navbar](https://getbootstrap.com/docs/5.3/components/navbar/) to main page. 

Replace content of `App.js` by:

```javascript
import GAMES from './games.json';
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

            <GamesList games={GAMES}></GamesList>
        </div>
    );
}
```

We want to utilize [Card](https://getbootstrap.com/docs/5.3/components/card/) for items on main page.
This requires following changes in `games/GameList.js`:

```javascript
const GameItem = ({ title, releasedAt }) => {
    return (
        <div class="col-xl-4 col-lg-6">
            <div class="card mb-2">
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                        Released: {releasedAt}
                    </h6>
                </div>
            </div>
        </div>
    );
};

export const GamesList = ({ games = [] }) => {
    return (
        <div>
            <h2>Available games</h2>
            <div class="row">
                {games.map((game) => (
                    <GameItem key={game.id} {...game}></GameItem>
                ))}
            </div>
        </div>
    );
};
```

## Homework

Extend `GameItem` component by adding:
* Developer name
* Platform
* Genre
* Rating
You can utilize [Badge](https://getbootstrap.com/docs/5.3/components/badge/) for that.
