import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('crafting-table-recipes')
export class CraftingTableRecipe extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    item: string;

    @Column()
    slots: string;    
}