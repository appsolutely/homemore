# Sheltered

[![Build Status](https://travis-ci.org/appsolutely/sheltered.svg?branch=dev)](https://travis-ci.org/appsolutely/sheltered)

## Team
- __Product Owner__ - Carly Levy
- __Scrum Master__ - Julia Brown
- __Imagineer__ - TJ Martin
- __VP of Misc. Stuff__ - James Ross

## Table of Contents
1. [Team](#team)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Linting](#linting)
    1. [Starting Database](#initializing-database)
    1. [Tests](#tests)

## Development

### Installing Dependencies
```
npm install
brew install postgres
```
npm install will run bower install and gulp build.

### Linting
For Frontend work:

Install eslint globally:
```
npm install -g eslint
npm install --save-dev eslint-config-airbnb eslint-plugin-react eslint
```
In Sublime, enter package control (Cmd-Shift-P) and search for and install the following packages:

```
SublimeLinter Note: The github repository name is “SublimeLinter3”, but the plugin name remains “SublimeLinter.”
SublimeLinter-eslint
```

Next, add a .eslintrc.json file to your sheltered root directory.  Copy and paste in the following:

```
{
    "extends": "airbnb",
    "plugins": [
      "react"
    ],
    "rules": {
      "arrow-body-style": [2, "always"],
      "strict": [0, "safe"],
      "no-console": 0
    }
}
```

For the Backend install and use SublimeLinter-jshint instead.

### Initializing Database
```
postgres -D /usr/local/var/postgres
createdb sheltered_dev
```

### Tests
Once Postgres is running
```
npm install -g knex
createdb sheltered_test
npm run migrate
npm test
```
