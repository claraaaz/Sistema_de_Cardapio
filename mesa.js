function selecionarMesa(numero) {
        // Guarda o número da mesa
        localStorage.setItem('mesaSelecionada', numero);
        // Vai para a próxima página (ex: categorias)
        location.href = 'categoria.html';
    }