# Games Portal

We are going to build a Games Portal app that will contain basic information about PC games along with scores.
First we're going to use JSON file to store data.
Before going to next step, please download file 
[games.json](https://github.com/luk1999/react_intro/tree/chapter-1-homework/src/games.json)
and put it in `src` subdirectory.

## Lists of items

To render a list of items we can use `for` loop or `map` built-in list function.
When rendering a list we should provide na unique value for every item (`key`), like `id` of record.

Replace content of `App.js` file with following code:

```javascript
import './App.css';

import GAMES from './games.json';

export default function App() {
    return (
        <div className="App">
            <header className="App-header">Games Portal</header>
            <ul>
                {GAMES.map((game) => (
                    <li key={game.id}>{game.title}</li>
                ))}
            </ul>
        </div>
    );
}
```

Now refresh page [http://localhost:3000](http://localhost:3000). You should see a list of 20 games.

## List of items with component

You can also use component to present information of every item on the list and render components in a loop.

First, we need to define `GameItem` component that we're going to use to present single item data:
```javascript
const GameItem = ({ title, releasedAt }) => {
    return (
        <div>
            <h3>{title}</h3>
            <small>Released: {releasedAt}</small>
        </div>
    );
};
```

Then we can use it in `App` component in similar way as we did with rendering list:
```javascript
export default function App() {
    return (
        <div className="App">
            <header className="App-header">Games Portal</header>
            {GAMES.map((game) => (
                <GameItem key={game.id} {...game}></GameItem>
            ))}
        </div>
    );
}
```
**Notice** that we've used object destructuring (`{...game}`) to pass properties to `GameItem` component.
This is not the cleanest way of passing props to component, but it works.

## Nesting components inside another components

We can move whole part responsible for rendering list of games to separate component.

First, let's start with moving it's logic to a separate file.

Create file `games/GameList.js` inside `src` subdirectory and add following content:

```javascript
const GameItem = ({ title, releasedAt }) => {
    return (
        <div>
            <h3>{title}</h3>
            <small>Released: {releasedAt}</small>
        </div>
    );
};

export const GamesList = ({ games = [] }) => {
    return (
        <div>
            <h2>Available games</h2>
            <div>
                {games.map((game) => (
                    <GameItem key={game.id} {...game}></GameItem>
                ))}
            </div>
        </div>
    );
};
```

Then import `GamesList` and use it in root `App` component:

```javascript
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
```
