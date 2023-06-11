import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeScaleAmount1686424776029 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			"expenses",
			new TableColumn({ name: "amount", type: "decimal", precision: 65, scale: 4, isNullable: false }),
			new TableColumn({ name: "amount", type: "decimal", precision: 65, scale: 2, isNullable: false })
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			"expenses",
			new TableColumn({ name: "amount", type: "decimal", precision: 65, scale: 2, isNullable: false }),
			new TableColumn({ name: "amount", type: "decimal", precision: 65, scale: 4, isNullable: false })
		);
	}
}
