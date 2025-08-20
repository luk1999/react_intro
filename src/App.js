import './App.css';

import { useState } from 'react';

const ToggleText = ({ buttonLabel, text }) => {
    const [showText, setShowText] = useState(false);

    const toggleText = () => setShowText(!showText);

    return (
        <div>
            <button type="button" onClick={toggleText}>
                {buttonLabel}
            </button>
            {showText && <p>{text}</p>}
        </div>
    );
};

export default function App() {
    return (
        <div className="App">
            <header className="App-header">React Tutorial App</header>
            <h1>Hello world!</h1>
            <ToggleText
                buttonLabel="Toggle text 1"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ></ToggleText>
            <ToggleText
                buttonLabel="Toggle text 2"
                text="In id scelerisque nisl. Curabitur eu nisl eget orci dapibus maximus. "
            ></ToggleText>
            <ToggleText
                buttonLabel="Toggle text 3"
                text="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            ></ToggleText>
        </div>
    );
}
