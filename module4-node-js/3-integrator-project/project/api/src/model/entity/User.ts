import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToMany,
	Unique,
	JoinColumn,
	ManyToOne,
} from "typeorm";
import UserRole from "./UserRole";
import Recipe from "./Recipe";
import { UserRoleNumberEnum } from "../enum/UserRoleEnum";
import RecipeCategory from "./RecipeCategory";

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

	@Column({ type: "integer", enum: UserRoleNumberEnum, default: UserRoleNumberEnum.USER, nullable: false })
	roleId!: number;

	@ManyToOne(() => UserRole, (userRole) => userRole.user)
	@JoinColumn({ name: "role_id", referencedColumnName: "id", foreignKeyConstraintName: "FK_users_users_roles_id" })
	userRole!: UserRole;

	@OneToMany(() => Recipe, (recipe) => recipe.user)
	recipes!: Recipe[];

	@OneToMany(() => RecipeCategory, (recipeCategory) => recipeCategory.user)
	recipesCategories!: RecipeCategory[];
}
