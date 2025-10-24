import Cookies from 'js-cookie';

export default class CookieService {
    static setGameListCurrentPage(page = 1) {
        Cookies.set('gameList|currentPage', page);
    }

    static getGameListCurrentPage() {
        return Number(Cookies.get('gameList|currentPage')) || 1;
    }
}
