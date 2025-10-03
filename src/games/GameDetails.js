import { Link, useParams } from 'react-router-dom';

import GAMES from '../games.json';

const getGame = (id) => GAMES.find(game => game.id === id);

const SingleDetail = ({ field, value }) => {
    return (
        <>
            <div class="col-xl-3 col-lg-4 col-md-6"><strong>{field}</strong>: </div>
            <div class="col-xl-9 col-lg-8 col-md-6">{value}</div>
        </>
    );
};

export const GamesDetails = () => {
    const { id } = useParams();
    const { 
        title, 
        developer = {},
        genre = {}, 
        platform = {}, 
        rating = {}, 
        releasedAt,
        metaScore,
        userScore,
    } = getGame(Number(id));

    return (
        <div>
            <h2>{title}</h2>
            <div class="row">
                <div class="col-md-12"><h3>Details</h3></div>

                <SingleDetail field="Released" value={releasedAt} />
                {developer.name && <SingleDetail field="Developer" value={developer.name} />}
                {genre.name && <SingleDetail field="Genre" value={genre.name} />}
                {platform.name && <SingleDetail field="Platform" value={platform.name} />}
                {rating.name && <SingleDetail field="Rating" value={rating.name} />}
                <SingleDetail field="Meta Score" value={metaScore} />
                <SingleDetail field="User Score" value={userScore} />

                <div class="col-md-12 py-4">
                    <Link to="/" className="btn btn-light">Return to main page</Link>
                </div>
            </div>
        </div>
    );
};
