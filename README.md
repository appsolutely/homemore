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
