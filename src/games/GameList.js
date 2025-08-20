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
