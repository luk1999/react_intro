import gameApi from './game';

const defaultParams = {
    format: 'json',
};

export default class ApiGameService {
    static getList(page = 1) {
        return gameApi.get(`/games`, { params: { ...defaultParams, page } });
    }

    static getOne(id) {
        return gameApi.get(`/games/${id}`, { params: defaultParams });
    }
}
