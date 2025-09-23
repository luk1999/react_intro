# Adding more pages

## Routing

Our Games Portal has just one page, that presents list of all games. 
But what if we want to have a separate page with game details? 
We will utilize [React Router](https://reactrouter.com/) for that.

## How to add Router

First we need to add it to our dependencies list and install:

```bash
npm install react-router-dom
```

## How to use Router

Open `App.js` file and import router-dependencies on the top of the file:
```javascript
import { BrowserRouter, Route, Routes } from 'react-router-dom';
```

Then use `<BrowserRouter>...</BrowserRouter>` as a main container for `App` component:
```javascript
export default function App() {
    return (
        <BrowserRouter>
            /* Previous code */
        </BrowserRouter>  
    );
}
```

Now we're going to replace `GameList` component by definition of routes:
```javascript
export default function App() {
    return (
        <BrowserRouter>
            <div class="container">
                /* Header code */

                /* Add this code instead of <GamesList games={GAMES}></GamesList> */
                <Routes>
                    <Route path="/" element={<GamesList/>} />
                </Routes>
            </div>
        </BrowserRouter>  
    );
}
```

Final `App` component definition:
```javascript
export default function App() {
    return (
        <BrowserRouter>
            <div class="container">
                <header class="mb-2">
                    <nav class="navbar bg-primary" data-bs-theme="dark">
                        <div class="container">
                            <span class="navbar-brand h1">Games Portal</span>
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<GamesList/>} />
                </Routes>
            </div>
        </BrowserRouter>  
    );
}
```

## Game details page

### Static page

Create file `games/GameDetails.js` with following content:

```javascript
export const GamesDetails = () => {
    return (
        <div>
            <h2>Some game</h2>
            <div class="row">
                <div class="col-md-12"><h3>Details</h3></div>
            </div>
        </div>
    );
};
```

Then add this new page to routing. Edit `App.js` and import new component:
```javascript
import { GamesDetails } from './games/GameDetails';
```

And then add `/game/:id` route definition:
```javascript
<Routes>
    <Route path="/" element={<GamesList/>} />
    /* Add it here: */
    <Route path="/game/:id" element={<GamesDetails/>} />
</Routes>
```

Now navigate to [http://localhost:3000/game/1](http://localhost:3000/game/1) (where `1` is a game object id).
You should see a new page with "Some title" and "Details" written on it.

### Make page dynamic

First, import data from `games.json` and then define `getGame` function:
```javascript
import GAMES from '../games.json';

const getGame = (id) => GAMES.find(game => game.id === id);
```

Then, let's try to get `id` from URL.
We need to use `useParam` helper.

```javascript
import { useParams } from 'react-router-dom';
// Other imports and code

export const GamesDetails = () => {
    const { id } = useParams();

    // Rendering component...
}

Default type of `id` is string, so we need to cast it to number before getting game data:
```javascript
export const GamesDetails = () => {
    const { id } = useParams();
    const { title } = getGame(Number(id));

    // Rendering component...
}
```

Final code of `GameDetails` component:
```javascript
import GAMES from '../games.json';
import { useParams } from 'react-router-dom';

const getGame = (id) => GAMES.find(game => game.id === id);

export const GamesDetails = () => {
    const { id } = useParams();
    const { title } = getGame(Number(id));

    return (
        <div>
            <h2>{title}</h2>
            <div class="row">
                <div class="col-md-12"><h3>Details</h3></div>
            </div>
        </div>
    );
};
```

## Links

### GameDetails page

Let's add `Return to main page button` on GameDetails page.

Edit `GameDetails.js` and import `Link`:
```javascript
import { Link, useParams } from 'react-router-dom';
```

And then add return button under `Details`:
```javascript
<div class="row">
    <div class="col-md-12"><h3>Details</h3></div>
    
    /* Return button */
    <div class="col-md-12 py-4">
        <Link to="/" className="btn btn-light">Return to main page</Link>
    </div>
</div>
```

Button `Return to main page` should appear on [http://localhost:3000/game/1](http://localhost:3000/game/1) page.

### GameList page

Let's add URLs to GameDetails page.

Edit `GameList.js` and import `Link`:
```javascript
import { Link } from 'react-router-dom';
```

Add `id` argument to `GameItem` component arguments:
```javascript
const GameItem = ({ id, title, developer = {}, genre = {}, platform = {}, rating = {}, releasedAt }) => {
    // ...
}
```

And then replace
```javascript
<h5 class="card-title">{title}</h5>
```

by:
```javascript
<h5 class="card-title">
    <Link to={`/game/${id}`}>{title}</Link>                        
</h5>
```

Refresh main page [http://localhost:3000/](http://localhost:3000/). 
Titles of games should be now a links to details page.

## Homework

* Change behaviour of `Games Portal` logo: make it a link to main page (`/`).
* Add more information about game on `GameDetails` page (eg: developer, genre etc.). You might use a separate component for every single detail.
