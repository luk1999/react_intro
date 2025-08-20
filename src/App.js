import './App.css';

import { useState } from 'react';

const ToggleText = ({ showLabel = "Show", hideLabel = "Hide", text, defaultState = false }) => {
    const [showText, setShowText] = useState(defaultState);

    const toggleText = () => setShowText(!showText);

    const labels = {
        true: hideLabel,
        false: showLabel,
    };

    return (
        <div>
            <button type="button" onClick={toggleText}>
                {labels[showText]}
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
                showLabel="Show text 1"
                hideLabel="Hide text 1"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ></ToggleText>
            <ToggleText
                showLabel="Show text 2"
                hideLabel="Hide text 2"
                text="In id scelerisque nisl. Curabitur eu nisl eget orci dapibus maximus."
                defaultState="true"
            ></ToggleText>
            <ToggleText
                showLabel="Show text 3"
                hideLabel="Hide text 3"
                text="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            ></ToggleText>
        </div>
    );
}
