import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useCallback, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);

  const transformedMeals = useCallback(
    (mealObj) => {
      const loadedMeals = [];
      for (const mealKey in mealObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealObj[mealKey].name,
          description: mealObj[mealKey].description,
          price: mealObj[mealKey].price,
        });
      }
      setMeals(loadedMeals);
    },
    [],
  )
  
  const {
    isLoading,
    error,
    sendRequest: fetchMeals
  } = useHttp();
  
  const config = {
    url: 'https://http-react-8a679-default-rtdb.firebaseio.com/meals.json'
  }
  
  useEffect(() => {
    fetchMeals(config,transformedMeals)
  }, [])

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
    console.log(meals);
  return (
    <section className={classes.meals}>
      {isLoading && <p>Loading ...</p>}
      {error && <p>Something went wrong!!!</p>}
      {
        !isLoading && !error 
        &&  <Card>
              <ul>{mealsList}</ul>
            </Card>
      }
      
    </section>
  );

};

export default AvailableMeals;
