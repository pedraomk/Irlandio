document.addEventListener("DOMContentLoaded", () => {
    const headerDiv = document.getElementById("header");

    if (headerDiv) {
        headerDiv.innerHTML = `
            <header>
                <img src="logo.jpeg" alt="Banner de cursos">
                <div class="menu">
                    <h1>Escola de Cursos Livres</h1>
                    <nav>
                        <a href="index.html">Início</a>
                        <a href="pessoas.html">Pessoas</a>
                        <a href="cursos.html">Cursos</a>
                        <a href="matriculas.html">Matrículas</a>
                    </nav>
                </div>
            </header>
        `;
    }
});
///Função do menu lateral
    const btn = document.querySelector('toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    btn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      content.classList.toggle('shift');
    });
