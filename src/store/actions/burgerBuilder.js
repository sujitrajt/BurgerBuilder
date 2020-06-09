import * as actionTypes from "../actions/actionTypes";
import axios from "../../Axios-Orders";
export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name
  };
};
export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name
  };
};
export const setIngredients = ingredient => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredient
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};
export const initIngredient = () => {
  return dispatch => {
    axios
      .get("https://burgerbuilder-12fea.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
