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

app.get('/crafting-table-recipe/:item', async (req, res) => {
    try {
        const recipe = await CraftingTableRecipe.findOne({
            where: {
                item: req.params.item
            }
        });
        
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).send({message: "Recipe not found"});
        }
    } catch (error) {
        res.status(500).send({message: "Unexpected error"})
    }
});

app.post('/crafting-table-recipe', async (req, res) => {
    const recipe = new CraftingTableRecipe();
    recipe.item = req.body.item ? req.body.item : recipe.item;
    recipe.slots = req.body.slots ? req.body.slots : recipe.slots;
    try {
        await recipe.save();
        res.send(recipe);
    } catch (error) {
        res.status(500).send({message: "Unable to save recipe to database"});
    }
});

export {app};
