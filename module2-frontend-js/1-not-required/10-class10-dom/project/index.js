function showConsoleDirElementsHTML() {
  const title = document.getElementById("title");
  const paragraph = document.getElementById("paragraph");
  const div = document.getElementById("div");
  const inputText = document.getElementById("inputText");
  const inputPassword = document.getElementById("inputPassword");
  const inputEmail = document.getElementById("inputEmail");
  const inputNumber = document.getElementById("inputNumber");
  const inputCheckbox = document.getElementById("inputCheckbox");

  console.dir(title);
  console.dir(paragraph);
  console.dir(div);
  console.dir(inputText);
  console.dir(inputPassword);
  console.dir(inputEmail);
  console.dir(inputNumber);
  console.dir(inputCheckbox);
}

showConsoleDirElementsHTML();