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

// Get an item's recipe or uses
app.get('/crafting-table-recipe/:item', async (req, res) => {
    try {
        const type = req.query.type;

        if (type === 'recipe') {
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
        } else if (type === 'uses') {
            /* Broken, figure out a way to do LIKE operator on table
            const regex = new RegExp(`.*${req.params.item}.*`);

            const recipes = await CraftingTableRecipe.find({
                where: {
                    slots: regex
                }
            });

            if (recipes) {
                res.json(recipes);
            } else {
                res.status(404).send({message: "Recipes not found"});
            }*/
        } else {
            throw(Error);
        }

    } catch (error) {
        res.status(500).send({message: "Unexpected error"})
    }
});

// Create new recipe in table
app.post('/crafting-table-recipe', async (req, res) => {
    const recipe = new CraftingTableRecipe();
    recipe.item = req.body.item;
    recipe.slots = JSON.stringify(req.body.slots);
    try {
        await recipe.save();
        res.send(recipe);
    } catch (error) {
        res.status(500).send({message: "Unable to save recipe to database"});
    }
});

// Update recipe in table
app.put('/crafting-table-recipe/:name', async (req, res) => {
    const recipe = CraftingTableRecipe.find({
        where: {
            name: req.params.name
        }

        
    })
})

export {app};
