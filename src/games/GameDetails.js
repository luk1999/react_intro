import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ApiGameService from '../api/ApiGameService.js';

export const GamesDetails = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(
        () => {
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

    if (errorMessage) {
        return (
            <div class="row">
                <div class="col-md-12">
                    <div class="alert alert-danger">{errorMessage}</div>
                </div>
            </div>
        )
    }

    const { title } = game;

    return (
        <div>
            <h2>{title}</h2>
            <div class="row">
                <div class="col-md-12"><h3>Details</h3></div>
              
                <div class="col-md-12 py-4">
                    <Link to="/" className="btn btn-light">Return to main page</Link>
                </div>
            </div>
        </div>
    );
};
