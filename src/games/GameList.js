import { useEffect, useState } from 'react';

import ApiGameService from '../api/ApiGameService.js';
import { Link } from 'react-router-dom';

const GameItem = ({ id, title, developer = {}, genre = {}, platform = {}, rating = {}, releasedAt }) => {
    return (
        <div class="col-xl-4 col-lg-6">
            <div class="card mb-2">
                <div class="card-body">
                    <h5 class="card-title">
                        <Link to={`/game/${id}`}>{title}</Link>                        
                    </h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                        Released: {releasedAt}
                    </h6>
                    <p class="card-text">
                        {developer.name && <span class="badge rounded-pill text-bg-primary">{developer.name}</span>}
                        {genre.name && <span class="badge rounded-pill text-bg-success">{genre.name}</span>}
                        {platform.name && <span class="badge rounded-pill text-bg-dark">{platform.name}</span>}
                        {rating.name && <span class="badge rounded-pill text-bg-danger">{rating.name}</span>}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const GamesList = () => {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState({});

    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const prevPage = () => setCurrentPage(currentPage - 1);
    const nextPage = () => setCurrentPage(currentPage + 1);

    useEffect(
        () => {
            const getList = async () => {
                setLoading(true);

                const response = await ApiGameService.getList(currentPage);
                const { next, previous, results } = response.data;
                setPagination({ current: currentPage, next, previous });
                setGames(results);

                setLoading(false);
            };
            getList();
        }, 
        [currentPage]
    );

    if (loading) {
        return (
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading data...</span>
            </div>
        );
    }

    return (
        <div>
            <h2>Available games</h2>
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
            <div class="row">
                {games.map((game) => (
                    <GameItem key={game.id} {...game}></GameItem>
                ))}
            </div>
        </div>
    );
};
