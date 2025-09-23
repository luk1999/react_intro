import { Link, useParams } from 'react-router-dom';

import GAMES from '../games.json';

const getGame = (id) => GAMES.find(game => game.id === id);

export const GamesDetails = () => {
    const { id } = useParams();
    const { title } = getGame(Number(id));

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
