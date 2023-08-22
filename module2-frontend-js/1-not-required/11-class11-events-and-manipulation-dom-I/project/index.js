function onloadEvent() {
	const title = document.getElementById("title");
	const paragraph = document.getElementById("paragraph");

  document.addEventListener("onload", setTimeout(() => {
    title.setAttribute("style", "color: red");
    paragraph.innerText = "Pasaron 3 segundos y cambió el texto";
  }, 3000));
}

onloadEvent();
