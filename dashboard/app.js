// =================== SIDEBAR ===================
const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');

    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show');
        ul.previousElementSibling.classList.remove('rotate');
    });
}

function toggleSubMenu(button) {
    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');

    if (sidebar.classList.contains('close')) {
        sidebar.classList.toggle('close');
        toggleButton.classList.toggle('rotate');
    }
}

// =================== TROCA DE PÁGINAS ===================
const navButtons = document.querySelectorAll(".nav-btn");
const mainContent = document.getElementById("main-content");

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const page = btn.dataset.page;
        carregarConteudo(page);

        document.querySelectorAll("#sidebar li").forEach(li => li.classList.remove("active"));
        btn.closest("li").classList.add("active");
    });
});

// Função principal para trocar o conteúdo
function carregarConteudo(pagina) {
    let html = "";

    switch (pagina) {
        case "inicio":
            html = `

        <div class="container-dashboard inicio">
            <h2>Bem-vindo à ASTRA</h2>
            <p>Descubra seu estilo de estudo e explore maneiras personalizadas de aprender.</p>
        </div>

                <!-- Cards dos tópicos -->
        <section class="cards-section">
            <div class="card">
                <div class="icon"><i class="fa-solid fa-bell"></i></div>
                <h2>Propósito do Projeto</h2>
                <p>
                    A ASTRA ajuda estudantes a aprenderem de forma mais eficiente,
                    criando planos personalizados com base no estilo de aprendizado.
                </p>
            </div>


            <div class="card">
                <div class="icon"><i class="fa-solid fa-graduation-cap"></i></div>
                <h2>Iniciativa</h2>
                <p>
                    Democratizar estratégias de estudo inteligentes,
                    tornando o aprendizado mais acessível, divertido e eficaz.
                </p>
            </div>

            <div class="card">
                <div class="icon"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                <h2>Ferramentas</h2>
                <p>
                    Quiz de estilos de aprendizado, dashboards, cronogramas inteligentes e fluxogramas interativos.
                </p>
            </div>
        </section>

        <!-- Container para funcionalidades -->
        <section class="features-section">
            <h2> Funcionalidades</h2>
            <div class="features-container">
                <div class="feature"> Quiz de Estilo de Aprendizado</div>
                <div class="feature"> Fluxogramas Interativos</div>
                <div class="feature"> Dashboard Inteligente</div>
            </div>
        </section>
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

                        <input id="tema" type="text" placeholder="Ex: Programação Java" />
                        <button onclick="gerarFluxograma()">Gerar Fluxograma</button>
                        <div id="loading-fluxo" style="color: #666; margin-top: 10px;"></div>
                        <div class="mermaid" id="mermaid-fluxo" style="margin-top: 20px;"></div>

                </div>

            `;
            break;

        case "metodo":
            html = `
                <div class="container-dashboard">
                    <h2>Quiz de Métodos de Estudo</h2>
                    <p>Descubra qual método de estudo se adapta melhor ao seu estilo de aprendizado.</p>
                </div>
            `;
            break;

        default:
            html = `<div class="container-dashboard"><h2>Erro</h2><p>Página não encontrada.</p></div>`;
            break;
    }

    mainContent.classList.add("fade");
    setTimeout(() => {
        mainContent.innerHTML = html;
        mainContent.classList.remove("fade");
    }, 200);
}

// GERAR FLUXOGRAMA
async function gerarFluxograma() {
    const tema = document.getElementById("tema").value.trim();
    const loading = document.getElementById("loading-fluxo");
    const mermaidDiv = document.getElementById("mermaid-fluxo");

    if (!tema) { alert("Digite um tema!"); return; }

    loading.textContent = "Gerando fluxograma...";
    mermaidDiv.innerHTML = "";

    try {
        const response = await fetch("http://localhost:8080/api/gerar-fluxograma", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tema })
        });

        const text = await response.text(); // recebe como string
        const data = JSON.parse(text);      // transforma em JSON

        let mermaidText = "graph TD\n";
        data.nodes.forEach(node => mermaidText += `  ${node.id}[${node.label}]\n`);
        data.connections.forEach(conn => mermaidText += `  ${conn.from} --> ${conn.to}\n`);

        mermaidDiv.innerHTML = mermaidText;
        mermaid.init(undefined, mermaidDiv);
        loading.textContent = "";

    } catch (error) {
        console.error(error);
        loading.textContent = "Erro ao gerar fluxograma";
    }
}

