import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, Unique } from "typeorm";
import { UserRoleStringEnum } from "../enum/UserRoleEnum";
import User from "./User";

@Entity({ name: "users_roles" })
export default class UserRole {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ type: "varchar", length: 50, default: UserRoleStringEnum.USER, nullable: false })
	@Unique("UQ_users_roles", ["role"])
	role!: string;

	@Column({ type: "varchar", length: 50, nullable: true })
	description!: string;

	@CreateDateColumn({ type: "timestamp", precision: 0, default: () => "CURRENT_TIMESTAMP()", nullable: false })
	createdDate!: Date;

	@UpdateDateColumn({
		type: "timestamp",
		precision: 0,
		default: () => "CURRENT_TIMESTAMP()",
		onUpdate: "CURRENT_TIMESTAMP()",
		nullable: false,
	})
	updatedDate!: Date;

	@DeleteDateColumn({ type: "timestamp", precision: 0, nullable: true })
	deletedDate!: Date;

	@OneToMany(() => User, (user) => user.userRole)
	user!: User[];
}
