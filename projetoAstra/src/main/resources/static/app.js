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

                         <input type="text" id="tema" placeholder="Ex: Aprender Java do zero">
                          <button onclick="gerarFluxograma()">Gerar Fluxograma</button>

                          <div id="loading"></div>
                          <div id="fluxograma" class="mermaid"></div>

                </div>

            `;
            break;

   case "metodo":
       html = `
           <div class="container-dashboard quiz">
               <h1>Descubra seu Método de Estudo Ideal</h1>
               <form id="quizForm" class="quiz-form">

                   <div class="pergunta">
                       <p>1. Quando você se prepara para estudar, qual dessas opções mais combina com você?</p>
                       <label><input type="radio" name="q1" value="A" required> Divido o tempo em blocos curtos com pausas programadas</label><br>
                       <label><input type="radio" name="q1" value="B"> Tento explicar o conteúdo em voz alta, como se ensinasse alguém</label><br>
                       <label><input type="radio" name="q1" value="C"> Gosto de revisar o mesmo conteúdo em intervalos ao longo da semana</label><br>
                       <label><input type="radio" name="q1" value="D"> Misturo assuntos diferentes no mesmo período de estudo</label><br>
                       <label><input type="radio" name="q1" value="E"> Prefiro me testar com perguntas e desafios sem olhar o material</label>
                   </div>

                   <div class="pergunta">
                       <p>2. Quando o conteúdo é difícil, o que você costuma fazer para entender melhor?</p>
                       <label><input type="radio" name="q2" value="A" required> Faço uma pausa, volto depois e tento de novo com mais foco</label><br>
                       <label><input type="radio" name="q2" value="B"> Tento explicar o conceito para mim mesmo com palavras simples</label><br>
                       <label><input type="radio" name="q2" value="C"> Releio o tema em dias diferentes até que ele fixe naturalmente</label><br>
                       <label><input type="radio" name="q2" value="D"> Tento resolver exercícios variados sobre o mesmo tema</label><br>
                       <label><input type="radio" name="q2" value="E"> Fecho o caderno e tento lembrar o máximo possível do que li</label>
                   </div>

                   <div class="pergunta">
                       <p>3. Como você organiza suas sessões de estudo?</p>
                       <label><input type="radio" name="q3" value="A" required> Uso cronômetro ou aplicativos para controlar blocos de tempo</label><br>
                       <label><input type="radio" name="q3" value="B"> Faço resumos e tento explicá-los para alguém</label><br>
                       <label><input type="radio" name="q3" value="C"> Tenho um cronograma com revisões distribuídas</label><br>
                       <label><input type="radio" name="q3" value="D"> Alterno entre matérias diferentes a cada sessão</label><br>
                       <label><input type="radio" name="q3" value="E"> Me desafio com perguntas práticas ou flashcards</label>
                   </div>

                   <div class="pergunta">
                       <p>4. O que te faz sentir que o aprendizado está funcionando?</p>
                       <label><input type="radio" name="q4" value="A" required> Quando consigo manter o foco por blocos curtos e produtivos</label><br>
                       <label><input type="radio" name="q4" value="B"> Quando consigo explicar o tema com facilidade e clareza</label><br>
                       <label><input type="radio" name="q4" value="C"> Quando percebo que lembro naturalmente de algo estudado dias atrás</label><br>
                       <label><input type="radio" name="q4" value="D"> Quando percebo que consigo aplicar o conhecimento em diferentes contextos</label><br>
                       <label><input type="radio" name="q4" value="E"> Quando acerto respostas de memória sem precisar reler o conteúdo</label>
                   </div>

                   <div class="pergunta">
                       <p>5. Se você tivesse pouco tempo para estudar um assunto novo, o que faria?</p>
                       <label><input type="radio" name="q5" value="A" required> Estudaria em ciclos de 25 minutos com pausas curtas</label><br>
                       <label><input type="radio" name="q5" value="B"> Tentaria explicar o conteúdo para alguém rapidamente</label><br>
                       <label><input type="radio" name="q5" value="C"> Planejaria revisões curtas nos próximos dias</label><br>
                       <label><input type="radio" name="q5" value="D"> Misturaria o assunto com outros temas parecidos para fixar melhor</label><br>
                       <label><input type="radio" name="q5" value="E"> Faria perguntas para testar o que realmente entendi</label>
                   </div>

                   <button type="submit" class="btn-enviar">Ver Resultado</button>
               </form>

               <div id="resultadoQuiz" class="resultado" style="display:none;">
                   <h2>Seu método de estudo ideal é:</h2>
                   <p id="tipoMetodo"></p>
                   <p id="descricaoMetodo"></p>
               </div>
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

    // =================== ENVIO DO QUIZ ===================
    document.addEventListener("submit", async function(e) {
        if (e.target && e.target.id === "quizForm") {
            e.preventDefault();

            const formData = new FormData(e.target);
            const respostas = {};
            formData.forEach((valor, chave) => {
                respostas[chave] = valor;
            });

            try {
                const response = await fetch("http://localhost:8080/api/quiz/resultado", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(respostas)
                });

                if (!response.ok) throw new Error("Erro ao enviar quiz");

                const data = await response.json();

                document.getElementById("tipoMetodo").textContent = data.tipo;
                document.getElementById("descricaoMetodo").textContent = data.descricao;

                document.getElementById("quizForm").style.display = "none";
                document.getElementById("resultadoQuiz").style.display = "block";

            } catch (error) {
                alert("Erro ao calcular resultado. Tente novamente.");
                console.error(error);
            }
        }
    });

    function refazerQuiz() {
        document.getElementById("quizForm").reset();
        document.getElementById("quizForm").style.display = "block";
        document.getElementById("resultadoQuiz").style.display = "none";
    }

 // =================== ANIMAÇÃO DO QUIZ (VERSÃO CORRIGIDA) ===================
 function iniciarAnimacaoQuiz() {
     const mainContent = document.getElementById("main-content");

     // Observa quando o quiz for carregado dinamicamente
     const observer = new MutationObserver(() => {
         const quizForm = document.getElementById("quizForm");
         if (quizForm && !quizForm.dataset.initialized) {
             quizForm.dataset.initialized = "true";
             iniciarQuizPassoAPasso(quizForm);
         }
     });

     observer.observe(mainContent, { childList: true, subtree: true });

     // Se o quiz já estiver presente no carregamento inicial
     const existing = document.getElementById("quizForm");
     if (existing && !existing.dataset.initialized) {
         existing.dataset.initialized = "true";
         iniciarQuizPassoAPasso(existing);
     }
 }

 function iniciarQuizPassoAPasso(quizForm) {
     const perguntas = Array.from(quizForm.querySelectorAll(".pergunta"));
     if (perguntas.length === 0) {
         console.warn("Quiz: nenhuma pergunta encontrada.");
         return;
     }

     // Garante que o botão de enviar exista e seja do tipo submit
     const btnEnviar = quizForm.querySelector(".btn-enviar");
     if (!btnEnviar) {
         console.error("Quiz: botão .btn-enviar não encontrado.");
         return;
     }
     btnEnviar.type = "submit";

     // Esconde botão até o final (usa inline style para evitar conflito com CSS)
     btnEnviar.style.display = "none";
     btnEnviar.disabled = true;

     // Guarda estado de respostas
     const total = perguntas.length;
     const respondidas = new Array(total).fill(false);

     // Mostra a primeira pergunta
     let indiceAtual = 0;
     perguntas.forEach((p, i) => {
         // garante classe/reset
         p.classList.remove("ativa", "fade-out");
         p.style.display = "none";
     });
     perguntas[indiceAtual].classList.add("ativa");
     perguntas[indiceAtual].style.display = "block";

     // Função que verifica se todas respondidas
     function verificarTodasRespondidas() {
         return respondidas.every(Boolean);
     }

     perguntas.forEach((pergunta, i) => {
         const radios = pergunta.querySelectorAll("input[type='radio']");
         radios.forEach(radio => {
             radio.addEventListener("change", () => {
                 // marca como respondida esta pergunta
                 respondidas[i] = true;

                 // se houver próxima pergunta, anima transição
                 if (i < perguntas.length - 1) {
                     // fade out atual
                     pergunta.classList.add("fade-out");
                     setTimeout(() => {
                         pergunta.classList.remove("ativa", "fade-out");
                         pergunta.style.display = "none";

                         // mostrar próxima
                         perguntas[i + 1].style.display = "block";
                         perguntas[i + 1].classList.add("ativa");

                         // scroll suave para topo do quiz (opcional)
                         perguntas[i + 1].scrollIntoView({ behavior: "smooth", block: "center" });
                     }, 300);
                 }

                 // Se todas respondidas, mostra o botão de enviar
                 if (verificarTodasRespondidas()) {
                     btnEnviar.style.display = "block";
                     btnEnviar.disabled = false;
                     // anima botão para chamar atenção
                     btnEnviar.classList.add("pulse");
                     setTimeout(() => btnEnviar.classList.remove("pulse"), 800);
                     // opcional: focar no botão para facilitar
                     btnEnviar.focus();
                 }
             });
         });
     });

     // Remove qualquer listener antigo no formulário (para evitar duplicidade)
     const novoForm = quizForm.cloneNode(true);
     quizForm.parentNode.replaceChild(novoForm, quizForm);

     // Re-bind da lógica aos elementos clonados
     // (chamada recursiva simplificada: inicializa novamente no clone)
     novoForm.dataset.initialized = "true";
     rebindQuizAfterClone(novoForm);
 }

 function rebindQuizAfterClone(quizForm) {
     // reaplica o comportamento (mais simples: reaplica iniciarQuizPassoAPasso mas com cuidado)
     // Para evitar duplicar MutationObserver, não o re-iniciamos aqui
     const perguntas = Array.from(quizForm.querySelectorAll(".pergunta"));
     const btnEnviar = quizForm.querySelector(".btn-enviar");
     if (!btnEnviar) return;

     // garante tipo submit e estado inicial
     btnEnviar.type = "submit";
     btnEnviar.style.display = "none";
     btnEnviar.disabled = true;

     const total = perguntas.length;
     const respondidas = new Array(total).fill(false);

     perguntas.forEach((p, i) => {
         p.classList.remove("ativa", "fade-out");
         p.style.display = "none";
     });
     perguntas[0].classList.add("ativa");
     perguntas[0].style.display = "block";

     perguntas.forEach((pergunta, i) => {
         const radios = pergunta.querySelectorAll("input[type='radio']");
         radios.forEach(radio => {
             radio.addEventListener("change", () => {
                 respondidas[i] = true;
                 if (i < perguntas.length - 1) {
                     pergunta.classList.add("fade-out");
                     setTimeout(() => {
                         pergunta.classList.remove("ativa", "fade-out");
                         pergunta.style.display = "none";
                         perguntas[i + 1].style.display = "block";
                         perguntas[i + 1].classList.add("ativa");
                         perguntas[i + 1].scrollIntoView({ behavior: "smooth", block: "center" });
                     }, 300);
                 }
                 if (respondidas.every(Boolean)) {
                     btnEnviar.style.display = "block";
                     btnEnviar.disabled = false;
                     btnEnviar.classList.add("pulse");
                     setTimeout(() => btnEnviar.classList.remove("pulse"), 800);
                     btnEnviar.focus();
                 }
             });
         });
     });

     // Agora vinculamos o submit diretamente ao formulário (assegura que funcione)
     quizForm.addEventListener("submit", async function (e) {
         e.preventDefault();
         btnEnviar.disabled = true;
         btnEnviar.textContent = "Enviando...";

         try {
             const formData = new FormData(quizForm);
             const respostas = {};
             formData.forEach((valor, chave) => respostas[chave] = valor);

             // Ajuste a URL se necessário
             const response = await fetch("http://localhost:8080/api/quiz/resultado", {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify(respostas)
             });

             if (!response.ok) throw new Error("Erro na requisição: " + response.status);

             const data = await response.json();

             // mostra resultado (mantém compatibilidade com seu HTML)
             const resultadoBox = document.getElementById("resultadoQuiz");
             if (resultadoBox) {
                 document.getElementById("tipoMetodo").textContent = data.tipo;
                 document.getElementById("descricaoMetodo").textContent = data.descricao;
                 quizForm.style.display = "none";
                 resultadoBox.style.display = "block";
             }

         } catch (err) {
             console.error("Erro ao enviar quiz:", err);
             alert("Erro ao enviar o quiz. Veja o console para detalhes.");
             btnEnviar.disabled = false;
             btnEnviar.textContent = "Ver Resultado";
         }
     });
 }

 // inicia o observador ao carregar o script
 iniciarAnimacaoQuiz();



