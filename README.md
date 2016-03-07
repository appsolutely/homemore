# Sheltered

## Team
- __Product Owner__ - Carly Levy
- __Scrum Master__ - Julia Brown
- __Imagineer__ - TJ Martin
- __VP of Misc. Stuff__ - James Ross

## Table of Contents
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Starting Database](#initializing-database)
    1. [Tests](#tests)
    2. 
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

## Development

### Installing Dependencies
```
npm install
brew install postgres
```
npm install will run bower install.

### Linting
Install eslint globally:
```
npm install -g eslint
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
### Initializing Database
```
postgres -D /usr/local/var/postgres
createdb sheltered_dev
```
### Tests
Once Postgres is running
```
createdb sheltered_test
npm test
```
after test has been run the first time migrations is no longer necessary so
```
knex.migrate.latest()
```
may be commented out so long as it is re-added upon dropping and recreating the test database.
## Contributing
