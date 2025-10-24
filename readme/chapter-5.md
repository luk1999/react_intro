# Consuming REST API

We are going to use a REST API from [react_intro_api](https://github.com/luk1999/react_intro_api). 
Please clone repository and follow instructions in `README.md` file.

## Configuration

We are going to use [AXIOS](https://github.com/axios/axios) for connecting with REST API.

First, you need to install it:
```bash
npm install axios
```

### API helper class

Now let's create a new subdirectory `api` and then Axios instance.

Create new file `game.js` inside `src/api/` directory with following content:

```javascript
import axios from 'axios';

const gameApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
});

export default gameApi;
```

Then create file `src/api/ApiGameService.js` with following content:

```javascript
import gameApi from './game';

const defaultParams = {
    format: 'json',
};

export default class ApiGameService {
    static getList(page = 1) {        
        return gameApi.get(`/games`, { params: defaultParams });
    }

    static getOne(id) {
        return gameApi.get(`/games/${id}`, { params: defaultParams });
    }
}
```

## Load data from API

We can use `useEffect` React hook to handle requests.
You can find more about [React useEffect here](https://react.dev/reference/react/useEffect).

When we're loading data, we can utilize 
[Bootstrap Spinner component](https://getbootstrap.com/docs/5.3/components/spinners/) 
to show that user needs to wait until all data will be loaded from API.

### Game list from API

Open `src/games/GameList.js` and do following changes.

Replace imports:
```javascript
import GAMES from '../games.json';
```

by:

```javascript
import ApiGameService from '../api/ApiGameService.js';
import { useEffect, useState } from 'react';
```

Now update `GameList` component by adding connection to API endpoint:

```javascript
export const GamesList = () => {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState({});

    useEffect(
        () => {
            const getList = async () => {
                setLoading(true);

                const response = await ApiGameService.getList();
                const { results } = response.data;
                setGames(results);

                setLoading(false);
            };
            getList();
        }, 
        []
    );

    if (loading) {
        return (
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading data...</span>
            </div>
        );
    }

    // Old template code
};
```

Now navigate to page: [http://127.0.0.1:3000/](http://127.0.0.1:3000/). 
You shouldn't notice any change besides spinner displayed for a moment.

### Game details from API

Open `src/games/GameDetails.js` and do following changes.

Replace imports and definition of `getGame` method:
```javascript
import GAMES from '../games.json';

const getGame = (id) => GAMES.find(game => game.id === id);
```

by:

```javascript
import ApiGameService from '../api/ApiGameService.js';
import { useEffect, useState } from 'react';
```

Now update `GameDetails` component by adding connection to API endpoint:

```javascript
export const GamesDetails = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState({});

    useEffect(
        () => {
            const getOne = async () => {
                const response = await ApiGameService.getOne(id);
                setGame(response.data);
                setLoading(false);
            };
            getOne();
        },
        [id]
    );

    if (loading) {
        return (
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading data...</span>
            </div>
        );
    }

    const { title } = game;
    
    // Old template code
};
```

Now navigate to page: [http://127.0.0.1:3000/game/1](http://127.0.0.1:3000/game/1). 
You shouldn't notice any change besides spinner displayed for a moment.

## Handling API call errors

If you try to open [http://127.0.0.1:3000/game/66666](http://127.0.0.1:3000/game/66666). 
You should see a react error message, because game with id 66666 doesn't exist.

To handle that we could simply check response status and in case of error show error message.

First, we need to define state variables for storing error message:

```javascript
const [errorMessage, setErrorMessage] = useState(null);
```

Then we need to handle `axios` errors in `getOne` function and in case of failure set error message:

```javascript
const getOne = async () => {
    try {
        const response = await ApiGameService.getOne(id);
        setGame(response.data);
    } catch (error) {
        setErrorMessage(
            (error.response.status === 404) ? 'Game does not exist' : 'Unknown error'
        );
    }
    setLoading(false);
};
```

And finally we need to display error message when `loading` is `false` and `errorMessage` is set:

```javascript
if (loading) {
    // Previous code used to display spinner.
}

if (errorMessage) {
    return (
        <div class="row">
            <div class="col-md-12">
                <div class="alert alert-danger">{errorMessage}</div>
            </div>
        </div>
    )
}

// Happy path code
```

Try to open [http://127.0.0.1:3000/game/66666](http://127.0.0.1:3000/game/66666) again.
This time you should see an error message.

## Pagination

When you open [http://127.0.0.1:8000/api/v1/games/](http://127.0.0.1:8000/api/v1/games/) 
then you notice that there is more than just 20 games that we're displaying on first page.

To show more of them, we need to implement pagination to be able to switch pages.

### Display current page

Let's start with displaying current page.

First, we need to have state variables for storing pagination data and update them when API call 
finishes successfully:

```javascript
export const GamesList = () => {
    // Previous code

    const [pagination, setPagination] = useState({});
    const currentPage = 1;

    useEffect(
        () => {
            const getList = async () => {
                setLoading(true);

                const response = await ApiGameService.getList();
                const { results } = response.data;
                setPagination({ current: currentPage });
                setGames(results);

                setLoading(false);
            };
            getList();
        }, 
        []
    );

    // Previous code
```

Then we need to add pagination block just under `Available games` header:

```javascript
<h2>Available games</h2>

{(pagination.current) && 
    (
        <div class="row">
            <div class="col-md-12 py-2">
                Current page: {pagination.current}
            </div>
        </div>
    )
}

// Render game list code
```

After refreshing main page you should see an information: `Current page: 1` under `Available games`.

### Add pagination

We're going to utilize 
[Bootstrap Pagination component](https://getbootstrap.com/docs/5.3/components/pagination/).

First, we need to change implementation of `getList` method in `src/api/ApiGameService.js` 
so it will be able to send requested page number to API:

```javascript
export default class ApiGameService {
    static getList(page = 1) {        
        return gameApi.get(`/games`, { params: { ...defaultParams, page } });
    }

    // Other code
}
```

Now, we can start with implementation in `src/games/GameList.js`.

We need to start with replacing constant `currentPage`:

```javascript
const currentPage = 1;
```

by state variable:

```javascript
const [currentPage, setCurrentPage] = useState(1);
```

Next, we need to implement methods for Previous and Next page buttons:

```javascript
const prevPage = () => setCurrentPage(currentPage - 1);
const nextPage = () => setCurrentPage(currentPage + 1);
```

Then we need to pass `currentPage` to function that calls API 
and update `pagination` object after getting response:

```javascript
useEffect(
    () => {
        const getList = async () => {
            setLoading(true);

            const response = await ApiGameService.getList(currentPage);  // Pass currentPage
            const { next, previous, results } = response.data;  // Get next and previous URLs
            setPagination({ current: currentPage, next, previous });  // And pass them to pagination
            setGames(results);

            setLoading(false);
        };
        getList();
    }, 
    [currentPage]  // Make currentPage an effect dependency
);
```

Now we need to replace pagination template:

```javascript
{(pagination.current) && 
    (
        <div class="row">
            <div class="col-md-12 py-2">
                Current page: {pagination.current}
            </div>
        </div>
    )
}
```

by:

```javascript
{(pagination.current) &&
    (
        <div class="row">
            <div class="col-md-12 py-2">
                <ul class="pagination float-end">
                    <li className={pagination.previous ? 'page-item' : 'page-item disabled'}>
                        <button type="button" class="page-link" onClick={prevPage}>
                            Previous
                        </button>
                    </li>
                    <li class="page-item disabled">
                        <span class="page-link">
                            Current page: {pagination.current}
                        </span>
                    </li>
                    <li className={pagination.next  ? 'page-item' : 'page-item disabled'}>
                        <button type="button" class="page-link" onClick={nextPage}>
                            Next
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
```

Refresh main page: pagination with two buttons should appear on right side of the screen, 
just under `Available games` header.

## Homework

* Display number of available games in pagination section (it doesn't have to be a part of Pagination component)
