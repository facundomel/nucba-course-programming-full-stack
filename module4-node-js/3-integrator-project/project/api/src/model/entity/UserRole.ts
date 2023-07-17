import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToMany,
	Unique,
	OneToOne,
	JoinColumn,
} from "typeorm";
import UserRoleEnum from "../enum/UserRoleEnum";
import User from "./User";

@Entity({ name: "user_roles" })
export default class UserRole {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ type: "varchar", length: 50, default: UserRoleEnum.USER, nullable: false })
	@Unique("UQ_users_role", ["role"])
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
