# Storing data in cookies

If you open main application page and click `Next` button, then click on game link 
and return to main page, you notice that current page was reset to 1.
It's because `GameList` component lost current page value. We need to store it somewhere.
We can utilize browser cookies for that.

## Configuration

Let's add `js-cookie` lib:

```bash
npm install js-cookie
```

## CookieService

We need a helper functions to write and read current page from cookies.
Remember that numbers are stored as a strings in cookies, so we need to convert them to numbers.

Let's create file `src/services/CookieService.js` with following content:

```javascript
import Cookies from 'js-cookie';

export default class CookieService {
    static setGameListCurrentPage(page = 1) {
        Cookies.set('gameList|currentPage', page);
    }

    static getGameListCurrentPage() {
        return Number(Cookies.get('gameList|currentPage')) || 1;
    }
}
```

## Use CookieService

### Reading current page number

Open file `src/games/GameList.js` and import `CookieService`:

```javascript
import CookieService from '../services/CookieService.js';
```

Then we need to set initial `currentPage`. Replace:

```javascript
const [currentPage, setCurrentPage] = useState(1);
```

by:

```javascript
const [currentPage, setCurrentPage] = useState(CookieService.getGameListCurrentPage());
```

### Storing current page number

We need to update `nextPage` and `previousPage` functions in  `src/games/GameList.js` file:

```javascript
const prevPage = () => {
    setCurrentPage(currentPage - 1);
    CookieService.setGameListCurrentPage(currentPage - 1);
};

const nextPage = () => {
    setCurrentPage(currentPage + 1);
    CookieService.setGameListCurrentPage(currentPage + 1);
};
```

Reload main page of application, open Developer Tools and switch to `Application` -> `Cookies`.
Click on `Next` and `Previous` button and observe values stored in `gameList|currentPage` cookie.
