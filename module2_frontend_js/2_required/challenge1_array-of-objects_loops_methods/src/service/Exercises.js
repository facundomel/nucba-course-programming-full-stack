import Pizza from "../model/Pizza.js";

 // Array de objetos de tipo Pizza
 const pizzas = [
  new Pizza(1, "Pizza 1", ["Tomate"], 500),
  new Pizza(2, "Pizza 2", ["Anchoas"], 1250),
  new Pizza(3, "Pizza 3", ["Paleta", "Aceitunas"], 1000),
  new Pizza(4, "Pizza 4", ["Queso roquefort"], 1100),
  new Pizza(5, "Pizza 5", ["Cebolla"], 890),
  new Pizza(6, "Pizza 6", ["Salame", "Aceitunas"], 900)
]

class Exercises {
  // Ejercicio 1
  getPizzasIDOdd() { 
    console.clear(); 
    console.log("Pizzas con ID impar: ");
    pizzas.forEach((pizza) =>{
      pizza.id % 2 != 0 ? console.log(`La pizza "${pizza.name}" tiene el ID ${pizza.id}`) : null;
    });
  }

  // Ejercicio 2
  getPizzasPriceLessThan600() {
    console.clear();
    console.log(pizzas.some((pizza) => {
      return pizza.price < 600;
    }) ? "Hay pizzas con precio menor que $600" : "No hay pizzas con precio menor que $600");
  }

  // Ejercicio 3
  getNamePizzaAndPrice() {
    console.clear();
    pizzas.forEach((pizza) => {
      console.log(`La pizza "${pizza.name}" tiene un valor de $${pizza.price}`);
    });
  }

  // Ejercicio 4
  getIngredientsPizza() {
    console.clear();
    pizzas.forEach((pizza) => {
      console.log(`La pizza "${pizza.name}" tiene los siguientes ingredientes:`);
      pizza.ingredients.forEach((ingredient) =>{
        console.log(`- ${ingredient}`);
      })
    })
  }

  // Invocación de métodos
  // getPizzasIDOdd();
  // getPizzasPriceLessThan600();
  // getNamePizzaAndPrice();
  // getIngredientsPizza();
}
export default new Exercises;