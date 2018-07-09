# Bulls-and-Bears

Your favourite virtual share market simulation is back. Trade away!

This year's edition is developed using Node.js and React and `yarn` is the package manager used. You need to have these on your local machine as prerequisites to start development. Follow the links below to install the requirements and read the documentation.

[Yarn](https://yarnpkg.com/lang/en/)
[Node](https://nodejs.org/en/)

## Instructions to Run

1. `yarn install` to install the dependencies (You need to be in the project root for this)

2. `yarn run start` to start the development server

3. `yarn run prod` to start the production server

## Instructions to Run Tests

  `yarn run test` to run tests

## Instructions for contributors

1. Fork this repository
2. Clone it to your local machine, and work on your fork
3. Resolve an issue/introduce a feature and open a pull request
4. The PR must be opened to the `develop` branch of this repository. **Do not make direct PRs to the master branch.**
5. Please handle dependency versions cautiously. Do not install updated versions of dependencies in `package.json` while setting up your project. Try to use the `--exact` flag wherever possible. Read the docs for more info.
6. Create a file `secrets.json` in the project root exactly as `secrets-sample.json`, replacing the dummy fields with respective credentials. **Do not fill in your credentials anywhere else.**
7. `config.js` is the file which acts as a bridge between the project files, and its environment variables and secrets. Require the config file wherever necessary, **never** require `secrets.json` directly.

## Maintainers

1. [Vibhor Gupta](https://github.com/VibhorCodecianGupta)
2. [Gaurav Tiwari](https://github.com/thegauravtiwari)
