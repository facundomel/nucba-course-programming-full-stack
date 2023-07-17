import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import Recipe from "./Recipe";
import User from "./User";

@Entity({ name: "recipes_favorite" })
export default class RecipeFavorite {
  @PrimaryColumn({ type: "integer", nullable: false })
	userId!: number;

  @PrimaryColumn({ type: "integer", nullable: false })
	recipeId!: number;

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

	@ManyToOne(() => User)
	@JoinColumn({ name: "user_id", referencedColumnName: "id", foreignKeyConstraintName: "FK_recipes_favorite_user_id" })
	user!: User;

  @ManyToOne(() => Recipe)
	@JoinColumn({ name: "recipe_id", referencedColumnName: "id", foreignKeyConstraintName: "FK_recipes_favorite_recipe_id" })
	recipe!: Recipe;
}
