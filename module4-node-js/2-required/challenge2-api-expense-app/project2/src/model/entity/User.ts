import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import Expense from "./Expense";

@Entity({ name: "users" })
export default class User {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ type: "varchar", length: 50, nullable: false })
	firstName!: string;

	@Column({ type: "varchar", length: 50, nullable: false })
	lastName!: string;

	@Column({ type: "integer", nullable: false })
	documentNumber!: number;

	@CreateDateColumn({ type: "datetime", nullable: false })
	createdDate!: Date;

	@UpdateDateColumn({ type: "datetime", nullable: false })
	updatedDate!: Date;

	@DeleteDateColumn({ type: "datetime", nullable: true })
	deletedDate!: Date;

	@OneToMany(() => Expense, (expense) => expense.user)
	expenses!: Expense[];
}
