import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRoleColumnUser1705517906936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "role",
        type: "varchar",
        default: "'0rx1'",
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "role");
  }
}
