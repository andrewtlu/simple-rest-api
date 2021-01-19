import {createConnection} from 'typeorm';

export let connect = async () => {
    const connection = await createConnection({
        "name": "default",
        "type": "sqlite",
        "database": "database.db",
        "synchronize": false,
        "logging": true,
        "entities": [
            __dirname + '/models/*.js'
        ],
        "migrations": [
            __dirname + '/migrations/*.js'
        ],
        "cli": {
            entitiesDir: __dirname + "/models/",
            migrationsDir: __dirname + '/migrations/'
        }
    });
}
