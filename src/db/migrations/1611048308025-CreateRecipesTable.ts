import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRecipesTable1611048308025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            "name": "crafting-table-recipe",
            "columns": [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "item",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "slots",
                    type: "text",
                    isNullable: false
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable("crafting-table-recipe");
    }

}
