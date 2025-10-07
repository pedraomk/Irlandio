function openTab(evt, tabId) {
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(c => c.style.display = "none");

  document.getElementById(tabId).style.display = "block";
}

function mostrarDuracao() {
  const select = document.querySelector("select");
  const duracao = select.value;
  const label = document.getElementById("duracaoCurso");
  if (duracao) {
    label.textContent = "Duração do curso: " + duracao + " meses";
  } else {
    label.textContent = "";
  }
}
