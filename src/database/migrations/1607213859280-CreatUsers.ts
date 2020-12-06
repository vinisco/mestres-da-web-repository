import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreatUsers1607213859280 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "password",
            type: "integer",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "e-mail",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
