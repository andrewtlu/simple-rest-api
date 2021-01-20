import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

// TODO: implement recipe output counters (ie 9x of item per recipe)

@Entity('crafting-table-recipe')
export class CraftingTableRecipe extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    item: string;

    @Column()
    slots: string;    
}