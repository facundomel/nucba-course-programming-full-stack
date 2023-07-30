import React, { useEffect, useState } from "react";
import Hero from "../../../no-atomics/hero/Hero";
import Recipes from "../../../no-atomics/recipes/Recipes";
import { RecipeAllContainer } from "./RecipeAllStyles";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import Categories from "../../../no-atomics/recipes-category/Categories";
import RecipeService from "../../../../service/RecipeService";
import * as recipesActions from "../../../../redux/recipes/RecipesActions.js";
import { useNavigate } from "react-router-dom";

const RecipeAll = () => {
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
    dispatch(userActions.setUserSection("RecipeAll"));
    handlerSetRecipesAll();
  }, []);

  const handlerSetRecipesAll = async () => {
    try {
      if (!recipesAll.length) {
        const recipes = await RecipeService.getRecipes();
        dispatch(recipesActions.setRecipesAll(recipes));
      }

      if (currentUser && !recipesFavorite.length) {
        const recipesFavorite = await RecipeService.getRecipesFavoriteByUserId(currentUser, navigate, dispatch);
        dispatch(recipesActions.setRecipesFavorite(recipesFavorite));
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

	return (
		<>
			<RecipeAllContainer>
				{loading ? (
					<p>Cargando todas las recetas...</p>
				) : (
					<>
						<Hero />
						<Categories />
						<Recipes />
					</>
				)}
			</RecipeAllContainer>
		</>
	);
};

export default RecipeAll;
