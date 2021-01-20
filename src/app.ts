import express from 'express';
import * as bodyParser from 'body-parser';
import {connect} from './db/db';
import {CraftingTableRecipe} from './db/models/crafting-table-recipe.model'
import {Like} from 'typeorm';

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
            const recipes = await CraftingTableRecipe.find({
                where: {
                    slots: Like(`%${req.params.item}%`)
                }
            });

            if (recipes) {
                res.json(recipes);
            } else {
                res.status(404).send({message: "Recipes not found"});
            }
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
app.put('/crafting-table-recipe/:item', async (req, res) => {
    try {
        const recipe = await CraftingTableRecipe.findOne({
            where: {
                item: req.params.item,
                slots: JSON.stringify(req.body.oldSlots)
            } 
        });

        if (recipe) {
            recipe.slots = req.body.slots ? JSON.stringify(req.body.newSlots) : recipe.slots;
            await recipe.save();
            res.send(recipe);
        } else {
            res.status(404).send({message: "Recipe not found"});
        }
    } catch (error) {
        res.status(500).send({message: "Unable to update recipe"});
    }
});

app.delete('/crafting-table-recipe/:item', async (req, res) => {
    try {
        const recipe = await CraftingTableRecipe.findOne({
            where: {
                item: req.params.item,
                slots: JSON.stringify(req.body.slots)
            }
        });

        if (recipe) {
            await recipe.remove();
            res.json({message: 'Recipe deleted'})
        } else {
            res.status(404).send({message: 'Recipe not found'});
        }
    } catch (error) {
        res.status(500).send({message: 'Unable to delete recipe'});
    }
});

export {app};
