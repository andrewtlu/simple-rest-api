import express from 'express';
import * as bodyParser from 'body-parser';
import {connect} from './db/db';
import {CraftingTableRecipe} from './db/models/crafting-table-recipe.model'

connect();

const app = express();
app.use(bodyParser.json({
    limit: '25mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.get('/crafting-table-recipes', async (req, res) => {
    // Return recipe of item after 'crafting-table-recipes/'
});

app.post('/crafting-table-recipes', async (req, res) => {
    // Create entry for given recipe
})

export {app};
