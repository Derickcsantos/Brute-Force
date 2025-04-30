function gerarSenhaAleatoria() {
    return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}


function forcaBrutaSenha(senhaAlvo) {
    const tentativasComuns = [
        "1234", "0000", "1111", "1212", "7777",
        "2580", "4321", "9999", "6969", "1004"
    ];
    const tentativasFeitas = new Set();

    // 1. Tenta primeiro senhas comuns
    for (let tentativa of tentativasComuns) {
        console.log(`Tentando senha comum: ${tentativa}`);
        tentativasFeitas.add(tentativa);
        if (tentativa === senhaAlvo) {
            console.log(`Senha encontrada rapidamente: ${tentativa}`);
            return tentativa;
        }
    }

    // 2. Tenta combinações numéricas de 0000 a 9999, ignorando repetidas
    for (let i = 0; i <= 9999; i++) {
        let tentativa = i.toString().padStart(4, '0');

        if (tentativasFeitas.has(tentativa)) continue;
        tentativasFeitas.add(tentativa);

        console.log(`Tentando força bruta: ${tentativa}`);
        if (tentativa === senhaAlvo) {
            console.log(`Senha encontrada por força bruta: ${tentativa}`);
            return tentativa;
        }
    }

    console.log("Senha não encontrada.");
    console.log(`Senha encontrada com ${tentativasFeitas} tentativas.`);
    return null;
}

// ✅ Exemplo de uso:
const senhaCorreta = gerarSenhaAleatoria();
forcaBrutaSenha(senhaCorreta);

