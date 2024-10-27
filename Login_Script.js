// JSON simulando os usuários cadastrados
const usuariosCadastrados = [
    {
        email: "ACESSO@gmail.com",
        senha: "Senha"
    },
    {
        email: "exemplo@dominio.com",
        senha: "senhaExemplo"
    }
];

document.getElementById("Btn_Login").addEventListener("click", verificarLogin);

// Função para verificar se o login é válido
function verificarLogin() {
    const emailInput = document.getElementById("email").value;
    const senhaInput = document.getElementById("senha").value;

    // Busca pelo usuário cadastrado com base no e-mail e senha
    const usuarioEncontrado = usuariosCadastrados.find(
        usuario => usuario.email === emailInput && usuario.senha === senhaInput
    );

    // Verifica se o usuário foi encontrado
    if (usuarioEncontrado) {
        window.location.href = 'CRUD_Tutoriais.html';
    } else {
        alert("E-mail ou senha incorretos!");
        location.reload
    }
}
