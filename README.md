# Phaser Template

A starting template for creating games using TypeScript and Phaser 3. 

## How it works

Screens and phases in the game are managed through a state machine. Each state can have child states. Code is placed inside `init`, `update`, `postUpdate`, and `cleanup` methods. 

# Running and building

`yarn` to install all dependencies.

`yarn start` to run the game locally. It will spin up a dev server on localhost:3000.

`yarn prod` to run a production optimized version of the game locally. It will spin up a dev server on localhost:3000.

`yarn build` to build a the game for deployment. Files will be placed in a `dist` folder.