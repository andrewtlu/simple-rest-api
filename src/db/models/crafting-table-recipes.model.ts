import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('crafting-table-recipes')
export class CraftingTableRecipes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slots: string;    
}