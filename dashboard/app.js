const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

function toggleSidebar(){
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');

    Array.from(sidebar.getElementsByClassName('show')).forEach(ul =>{
        ul.classList.remove('show');
        ul.previousElementSibling.classList.remove('rotate');
    })
}

function toggleSubMenu(button){
    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');

    if(sidebar.classList.contains('close')){
        sidebar.classList.toggle('close');
        toggleButton.classList.toggle('rotate');
    }
}


// Seleciona todos os botões de navegação
const navButtons = document.querySelectorAll(".nav-btn");
const mainContent = document.getElementById("main-content");

// Adiciona evento de clique para cada botão da sidebar
navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const page = btn.dataset.page;
        carregarConteudo(page);

        // Atualiza o item ativo da sidebar
        document.querySelectorAll("#sidebar li").forEach(li => li.classList.remove("active"));
        btn.closest("li").classList.add("active");
    });
});

// Função principal para trocar o conteúdo do main
function carregarConteudo(pagina) {
    let html = "";

    switch (pagina) {

        case "inicio":
            html = `
                <div class="container-dashboard inicio">
                    <h1>ASTRA – Assistente Inteligente de Estudos</h1>
                    <br>
                    <p>
                        A <strong>ASTRA</strong> é uma organizadora de estudos inteligente com IA, criada para ajudar alunos a aprenderem de forma mais eficiente.
                        Ela identifica o estilo de aprendizagem do usuário através de um quiz de personalidade, sugere os melhores métodos de estudo e gera
                        um plano personalizado em forma de cronograma ou fluxograma.
                    </p>
                </div>
            `;
            break;

        case "dashboard":
            html = `
                <div class="container-dashboard">
                    <h2>📊 Dashboard</h2>
                    <p>Aqui você verá seus gráficos de desempenho e recomendações de estudo personalizadas.</p>
                </div>
            `;
            break;

        case "fluxograma":
            html = `
                <div class="container-dashboard">
                    <h2>🧩 Criar Fluxograma</h2>
                    <p>Monte seu fluxograma de estudos com base nas matérias e prioridades.</p>
                </div>
            `;
            break;

        case "metodo":
            html = `
                <div class="container-dashboard">
                    <h2>🧠 Quiz de Métodos de Estudo</h2>
                    <p>Descubra qual método de estudo se adapta melhor ao seu estilo de aprendizado.</p>
                </div>
            `;
            break;

        case "perfil":
            html = `
                <div class="container-dashboard">
                    <h2>👤 Perfil do Usuário</h2>
                    <p>Gerencie suas informações pessoais, preferências e estilo de aprendizagem.</p>
                </div>
            `;
            break;

        default:
            html = `<div class="container-dashboard"><h2>Erro</h2><p>Página não encontrada.</p></div>`;
            break;
    }

    // Adiciona uma animação de transição
    mainContent.classList.add("fade");
    setTimeout(() => {
        mainContent.innerHTML = html;
        mainContent.classList.remove("fade");
    }, 200);
}
