import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToMany,
	Unique,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import Recipe from "./Recipe";
import User from "./User";

@Entity({ name: "recipes_categories" })
export default class RecipeCategory {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ type: "varchar", length: 50, nullable: false })
	@Unique("UQ_recipes_categories_name", ["category"])
	category!: string;

	@Column({ type: "varchar", length: 50, nullable: false })
	@Unique("UQ_recipes_title", ["title"])
	title!: string;

	@Column({ type: "varchar", nullable: false })
	urlImage!: string;

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

	@Column({ type: "integer", nullable: false })
	userId!: number;

	@OneToMany(() => Recipe, (recipe) => recipe.recipeCategory)
	recipes!: Recipe[];

	@ManyToOne(() => User, (user) => user.recipesCategories)
	@JoinColumn({ name: "user_id", referencedColumnName: "id", foreignKeyConstraintName: "FK_recipes_categories_user_id" })
	user!: User;
}
