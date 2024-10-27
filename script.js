// Inicializar o estado de tutoriais iniciados com dados do localStorage ou vazio
let tutoriaisIniciados = JSON.parse(localStorage.getItem('tutoriaisIniciados')) || [];

// Função para atualizar a div de apresentação com as abas de tutoriais
function DisponibilizarTutoriais() {
    const checkboxes = document.querySelectorAll('#CRUD_Tutoriais_CheckboxID:checked');
    const telaApresentar = document.querySelector('.CRUD_Tutoriais_Tutoriais');
    telaApresentar.innerHTML = '';

    // Verificar se algum checkbox foi selecionado
    if (checkboxes.length === 0) {
        telaApresentar.innerHTML = '<h1 class="CRUD_Tutoriais_Title_Tutoriais">Nenhum Investimento Selecionado</h1>';
    } else {
        // Criar as abas para cada tutorial selecionado
        checkboxes.forEach((checkbox) => {
            const Aba_Tutorial = document.createElement('div');
            Aba_Tutorial.classList.add('CRUD_Tutoriais_Aba');
            Aba_Tutorial.innerHTML = `
                <div>
                    ${checkbox.value} 
                    <button id="CRUD_Tutorias_ButtonID" class="CRUD_Tutorias_Button">Iniciar</button>
                </div>
                <div class="CRUD_Tutoriais_List" style="display: none;">
                    <div class="CRUD_Tutoriais_Lista_Tutoriais">
                        <a href="#" class="list-group-item list-group-item-action" data-tutorial="${checkbox.value}_Semana01">Tutorial Semana 01 P/ ${checkbox.value}</a>
                        <a href="#" class="list-group-item list-group-item-action" data-tutorial="${checkbox.value}_Semana02">Tutorial Semana 02 P/ ${checkbox.value}</a>
                        <a href="#" class="list-group-item list-group-item-action" data-tutorial="${checkbox.value}_Semana03">Tutorial Semana 03 P/ ${checkbox.value}</a>
                    </div>
                </div>
            `;
            telaApresentar.appendChild(Aba_Tutorial);

            // Seleciona o botão "Iniciar" e adiciona um event listener
            const Btn_Iniciar = Aba_Tutorial.querySelector('#CRUD_Tutorias_ButtonID');

            // Verifica se o tutorial já foi iniciado anteriormente (em localStorage)
            if (tutoriaisIniciados.includes(checkbox.value)) {
                Aba_Tutorial.querySelector('.CRUD_Tutoriais_List').style.display = 'block';
                Btn_Iniciar.textContent = 'Esconder';
            }

            Btn_Iniciar.addEventListener('click', function() {
                const Div_List = Aba_Tutorial.querySelector('.CRUD_Tutoriais_List');

                if (tutoriaisIniciados.includes(checkbox.value)) {
                    if (Div_List.style.display === 'none') {
                        Div_List.style.display = 'block';
                        Btn_Iniciar.textContent = 'Esconder';
                    } else {
                        Div_List.style.display = 'none';
                        Btn_Iniciar.textContent = 'Continuar';
                    }
                } else if (tutoriaisIniciados.length < 1) {
                    tutoriaisIniciados.push(checkbox.value);
                    localStorage.setItem('tutoriaisIniciados', JSON.stringify(tutoriaisIniciados));
                    Div_List.style.display = 'block';
                    Btn_Iniciar.textContent = 'Esconder';
                } else {
                    alert('Deseja Realizar Mais de um Tutorial Simultaneamente? Assine a Versão Premium');
                }
            });

            // Adiciona evento aos links para redirecionar com base no atributo data-tutorial
            const tutorialLinks = Aba_Tutorial.querySelectorAll('.CRUD_Tutoriais_Lista_Tutoriais a');
            tutorialLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault(); // Impede o redirecionamento padrão
                    const tutorialId = link.getAttribute('data-tutorial');
                    window.location.href = `/${tutorialId}.html`; // Gera a URL com base no ID do tutorial
                });
            });
        });
    }
}

// Função para limpar o localStorage e atualizar a interface
function limparTutoriaisIniciados() {
    localStorage.removeItem('tutoriaisIniciados');
    tutoriaisIniciados = [];
    alert('Tutoriais iniciados foram limpos!');
    DisponibilizarTutoriais();
}

document.querySelectorAll('#CRUD_Tutoriais_CheckboxID').forEach((checkbox) => {
    checkbox.addEventListener('change', DisponibilizarTutoriais);
});

// Adicionar o botão de limpar no final da apresentação
const limparButton = document.getElementById('CRUD_Tutoriais_Limpar_ButtonID');
limparButton.addEventListener('click', limparTutoriaisIniciados);

// Chama a função para exibir as abas dos tutoriais já iniciados no carregamento da página
window.onload = function() {
    DisponibilizarTutoriais();
    const checkboxes = document.querySelectorAll('#CRUD_Tutoriais_CheckboxID');
    checkboxes.forEach((checkbox) => {
        if (tutoriaisIniciados.includes(checkbox.value)) {
            checkbox.checked = true; // Marca o checkbox
            checkbox.dispatchEvent(new Event('change')); // Dispara o evento de mudança para atualizar a interface
        }
    });
};