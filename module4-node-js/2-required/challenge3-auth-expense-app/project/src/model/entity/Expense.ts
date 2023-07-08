import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import User from "./User";

@Entity({ name: "expenses" })
export default class Expense {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ type: "varchar", length: 50, nullable: false })
	name!: string;

	@Column({ type: "varchar", length: 50, nullable: true })
	description!: string;

	@Column({ type: "double", precision: 65, scale: 2, nullable: false })
	amount!: number;

	@CreateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP()", nullable: false })
	createdDate!: Date;

	@UpdateDateColumn({
		type: "datetime",
		precision: 0,
		default: () => "CURRENT_TIMESTAMP()",
		onUpdate: "CURRENT_TIMESTAMP()",
		nullable: false,
	})
	updatedDate!: Date;

	@DeleteDateColumn({ type: "datetime", precision: 0, nullable: true })
	deletedDate!: Date;

	@Column({ type: "integer", nullable: false })
	userId!: number;

	@ManyToOne(() => User, (user) => user.expenses, { createForeignKeyConstraints: false })
	@JoinColumn({ name: "user_id", referencedColumnName: "id" })
	user!: User;
}
