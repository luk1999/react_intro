# Introduction

## Application structure

If you list content of `react_intro` directory, you should see similar content:
```
react_intro
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── serviceWorker.js
│   └── setupTests.js
└── package.json
```

* `public` contains files used to serve transpiled React application:
  * `index.html` - HTML page that is used for serving React app
  * `favicon.ico` - Application icon
  * `manifest.json` - Application manifest (more: [Manifest](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest) )
* `src` contains React application source code:
  * `index.js` - main file that renders root `App` component
  * `index.css` - main CSS-stylesheet file
  * `App.js` - root `App` component
  * `App.css` - custom styles for `App` component
  * `App.test.js` - unit tests for `App` component
* `package.json` - JSON file with all app dependencies, defined commands etc.

## Basic commands

### Start development server
```bash
npm run start
```

### Build app
For non-development use.
```bash
npm run build
```

### Run tests
```bash
npm run test
```

## Hello world app

We start with simple root component that will basically display `Hello world` message.

To achieve that we need to update `App.js` with following content:
```javascript
import './App.css';

export default function App() {
    return (
        <div>
            <h1>Hello world!</h1>
        </div>
    );
}
```

Notice that we're using JSX markup for templating. 
This is pretty convinient and probably most of React project use that approach.

We're not going to use any custom styles for now, so you can clear the content of `App.css` file.

### Update tests
Now we need to update tests prepared for `App` component. Open file `App.test.js` and update its content:
```javascript
import { render, screen } from '@testing-library/react';

import App from './App';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Hello world!/i);  // That's the only change you have to do
    expect(linkElement).toBeInTheDocument();
});
```

Now run tests:
```bash
npm run test
```

## Adding more content

If you want to add more content you can do it (for test purposes) directly in `App` component.
Try to change `App.js` content:
```javascript
import './App.css';

export default function App() {
    return (
        <div>
            <header>React Tutorial App</header>
            <h1>Hello world!</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </div>
    );
}
```

Now refresh page [http://localhost:3000](http://localhost:3000). 
You should see:
* An app header
* `Hello world!` message
* Some text under it

## Adding custom styles

A page from previous example looks pretty flat. To change that we could add some basic CSS styles.

First we need to define two CSS classes (let's follow a pattern and prefix it with component name):
* `App` - root CSS class for component
* `App-header` - CSS class for header component

`App.js` should now look like:
```javascript
import './App.css';

export default function App() {
    return (
        <div className="App">
            <header className="App-header">React Tutorial App</header>
            <h1>Hello world!</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </div>
    );
}
```

Now we need to define styles inside `App.css` file:
```css
.App-header {
    border-bottom: 1px solid #ccc;
    font-size: 32px;
    padding: 10px 0;
    text-align: center;
}
```
(`App` class is intentionally missing).

## Interactive elements

### Events

React events are used to handle user interactions. 
They allow to assign custom function that is executed when given event is fired.

The most often used events:
* `onClick`
* `onChange` - when user changed input field value
* `onSubmit` - when form is submitted
* `onKeyDown`
* `onKeyUp`
* `onMouseEnter`

You can find more about [React events here](https://www.geeksforgeeks.org/reactjs/react-js-events/).

### Implementation

Let's try to make `Lorem ipsum...` text visible after clicking button.

* We need to define variable `showText` inside `App` component to handle hiding and showing the text.
* Additionally we need to add conditional rendering of `<p>Lorem ipsum...<p>` element based on `showText` state.
* Add a `Toggle` button that will control state of `showText` variable via `toggleText` function.

Try this code:
```javascript
import './App.css';

export default function App() {
    let showText = false;

    const toggleText = () => showText = !showText;

    return (
        <div className="App">
            <header className="App-header">React Tutorial App</header>
            <h1>Hello world!</h1>
            <button type="button" onClick={toggleText}>Toggle text</button>
            {
                showText && 
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            }
        </div>
    );
}
```

After refreshing page text `Lorem ipsum...` will disappear. Click on `Toggle button` - nothing should happen.

To fix that, we need to use React app state.

Replace definition of `showText` variable and `toggleText` function and try again:
```javascript
import './App.css';

import { useState } from 'react';

export default function App() {
    const [showText, setShowText] = useState(false);

    const toggleText = () => setShowText(!showText);

    return (
        <div className="App">
            <header className="App-header">React Tutorial App</header>
            <h1>Hello world!</h1>
            <button type="button" onClick={toggleText}>Toggle text</button>
            {
                showText && 
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            }
        </div>
    );
}
```

## Components

Components are useful for spliting code into small parts and reusing it.
They might be simple JS function or they can inherit from component classes (like React `Component`).

We could create a component that will contain our `Toggle button` and hide or display text message.

First we need to create a `ToggleText` parametrized component, that will allow to set custom text label and text.
Add following code above `App` component:

```javascript
const ToggleText = ({ buttonLabel, text }) => {
    const [showText, setShowText] = useState(false);

    const toggleText = () => setShowText(!showText);

    return (
        <div>
            <button type="button" onClick={toggleText}>{buttonLabel}</button>
            {showText && <p>{text}</p>}
        </div>
    );
};
```

Then add few `ToggleText` items to main `App` component:

```javascript
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
```

## Homework

Extend `ToggleText` component:
* Add abitlity to define default button state (text is show or hidden) when you enter page.
* Add separate labels for button in "hide" and "show" mode.
