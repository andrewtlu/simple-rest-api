import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRecipesTable1611048308025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            "name": "recipes",
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
                    name: "fluid",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "slot1",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "slot2",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "slot3",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "slot4",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "slot5",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "slot6",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "slot7",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "slot8",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "slot9",
                    type: "text",
                    isNullable: true
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable("recipes");
    }

}
