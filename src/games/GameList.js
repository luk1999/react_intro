const GameItem = ({ title, developer = {}, genre = {}, platform = {}, rating = {}, releasedAt }) => {
    return (
        <div class="col-xl-4 col-lg-6">
            <div class="card mb-2">
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
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

export const GamesList = ({ games = [] }) => {
    return (
        <div>
            <h2>Available games</h2>
            <div class="row">
                {games.map((game) => (
                    <GameItem key={game.id} {...game}></GameItem>
                ))}
            </div>
        </div>
    );
};
