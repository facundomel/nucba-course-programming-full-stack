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
import RecipeCategory from "./RecipeCategory";

@Entity({ name: "recipes" })
export default class Recipe {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ type: "varchar", length: 100, nullable: false })
	title!: string;

	@Column({ type: "varchar", nullable: true })
	description!: string;

	@Column({ type: "varchar", nullable: false })
	urlImage!: number;

  @Column({ type: "varchar", nullable: false })
	ingredients!: number;

  @Column({ type: "varchar", nullable: false })
	instructions!: number;

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

  @Column({ type: "integer", nullable: false })
	categoryId!: number;

	@ManyToOne(() => User, (user) => user.recipes)
	@JoinColumn({ name: "user_id", referencedColumnName: "id", foreignKeyConstraintName: "FK_recipes_user_id" })
	user!: User;

	@ManyToOne(() => RecipeCategory, (recipeCategory) => recipeCategory.recipes)
	@JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "FK_recipes_category_id" })
	recipeCategory!: RecipeCategory;
}
