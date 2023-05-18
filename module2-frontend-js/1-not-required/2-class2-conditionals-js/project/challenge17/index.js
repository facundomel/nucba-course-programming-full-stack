const string = prompt("Ingrese una palabra clave");

switch (string) {
  case "alerta":
    alert("Soy una alerta");
    break;
  case "consola":
    console.log("Soy un mensaje en consola");
    break;
  default:
    alert("Me muestro en ambos lados");
    console.log("Me muestro en ambos lados");
    break;
}