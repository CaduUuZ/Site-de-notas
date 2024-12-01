// Inicializa o array de histórico no localStorage ou cria um novo
let historico = JSON.parse(localStorage.getItem('historicoMedias')) || [];

function calcularMedia() {
    const nome = document.getElementById('nome').value.trim();
    const disciplina = document.getElementById('disciplina').value;
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);
    const nota4 = parseFloat(document.getElementById('nota4').value);
    const resultadoDiv = document.getElementById('resultado');
    
    // Verificar se todas as informações foram preenchidas
    if (nome === '' || disciplina === '' || isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)) {
        resultadoDiv.innerHTML = 'Por favor, preencha todos os campos obrigatórios.';
        resultadoDiv.className = 'reprovado';
        return;
    }
    
    // Calcular a média
    const media = (nota1 + nota2 + nota3 + nota4) / 4;
    
    // Preparar mensagem de resultado
    let mensagem, status;
    if (media >= 7) {
        mensagem = `Parabéns, ${nome}! Você foi aprovado em ${disciplina} com média ${media.toFixed(2)}.`;
        status = 'aprovado';
    } else {
        mensagem = `Sinto muito, ${nome}. Você foi reprovado em ${disciplina} com média ${media.toFixed(2)}.`;
        status = 'reprovado';
    }
    
    // Exibir resultado
    resultadoDiv.innerHTML = mensagem;
    resultadoDiv.className = status;
    
    // Adicionar ao histórico
    const resultadoHistorico = {
        nome: nome,
        disciplina: disciplina,
        media: media.toFixed(2),
        status: status
    };
    
    // Adiciona o novo resultado e limita a 4 itens
    historico.unshift(resultadoHistorico);
    if (historico.length > 4) {
        historico.pop();
    }
    
    // Salva no localStorage
    localStorage.setItem('historicoMedias', JSON.stringify(historico));
    
    // Atualiza a lista de histórico
    atualizarHistorico();
}

function atualizarHistorico() {
    const listaHistorico = document.getElementById('listaHistorico');
    listaHistorico.innerHTML = ''; // Limpa a lista atual
    
    // Adiciona cada item do histórico
    historico.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${item.nome}</strong> - ${item.disciplina}<br>
            Média: ${item.media} 
            <span class="${item.status}">(${item.status.toUpperCase()})</span>
        `;
        listaHistorico.appendChild(li);
    });
}

// Carrega o histórico ao iniciar a página
atualizarHistorico();
