import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes//${foodId}/information`;
  const API_KEY = "b000760182f248f1b5b79180ce34edb2";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>

        <img className={styles.recipeImage} src={food.image} />

        <div className={styles.recipeDetails}>
          <span>
            <strong> 🕛{food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            <strong>
              {" "}
              👪<strong>Serves</strong> {food.servings}{" "}
            </strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? " 🥕 Vegetarian" : "🍖 Non-vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐄 Vegan" : ""}</strong>
          </span>
        </div>

        <div>
          <span>
            <strong>
              {" "}
              ${parseInt(food.pricePerServing / 100)} Per Serving
            </strong>
          </span>
        </div>
      </div>

      <h2>Ingredients</h2>
      {food.extendedIngredients.map((item) => (
        <div>
          <img
            src={
              `https://spoonacular.com/cdn/ingredients_100x100/` + item.image
            }
          />
          <h3>{item.name}</h3>
          <h3>
            {item.amount}
            {item.unit}
          </h3>
        </div>
      ))}

      <h2>Instructions</h2>
      <div className={styles.recipeInstructions}>
        <ol>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            food.analyzedInstructions[0].steps.map((step) => (
              <li>{step.step}</li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
