# Setup project

## Prerequisites
Install `NodeJS` (with `npm` package manager):
```bash
sudo apt update
sudo apt install -y nodejs --fix-missing
```

Install `create-react-app` (`sudo` might be required for `-g` global installation):
```bash
npm install -g create-react-app
```

## Run dummy application

You can either clone repository or create a project on your own.

### Clone repository
```
git clone git@github.com:luk1999/react_intro.git
git checkout chapter-0
```

Install dependencies:
```bash
cd react_intro
npm install --dev
```

### Create project manually
```bash
create-react-app react_intro
```

### Running application

This command will start development app server on port 3000, so make sure that it is forwarded (if you use VM):
```bash
npm run start
```

Now navigate to start page: [http://localhost:3000](http://localhost:3000). You should see a React logo.
