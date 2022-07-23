export default class Shoe {
  constructor(size, color, brand) {
    this.size = size;
    this.color = color;
    this.brand = brand;
  }

  getInfo() {
    return `Soy una zapatilla ${this.brand} de color ${this.color} y de talle ${this.size}`;
  }
}