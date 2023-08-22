import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, Unique } from "typeorm";
import Expense from "./Expense";
import UserRole from "../enum/RoleUser";

@Entity({ name: "users" })
export default class User {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ type: "varchar", length: 50, nullable: false })
	firstName!: string;

	@Column({ type: "varchar", length: 50, nullable: false })
	lastName!: string;

	@Column({ type: "varchar", length: 50, nullable: false })
	@Unique("UQ_users_email", ["email"])
	email!: string;

	@Column({ type: "varchar", length: 100, nullable: false })
	password!: string;

	@Column({ type: "enum", enum: UserRole, default: UserRole.USER, nullable: false })
	role!: string;

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

	@OneToMany(() => Expense, (expense) => expense.user)
	expenses!: Expense[];
}
