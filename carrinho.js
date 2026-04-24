var cart = [];


window.onload = function() {
    var dadosSalvos = localStorage.getItem('carrinhoItens');
    if (dadosSalvos) {
        cart = JSON.parse(dadosSalvos);
        exibirCarrinho();
    } else {
        document.getElementById('list').innerHTML = "<p style='text-align:center'>Seu carrinho está vazio!</p>";
    }
};

function exibirCarrinho() {
    var listaElemento = document.getElementById('list');
    var totalElemento = document.getElementById('total');
    var totalSoma = 0;

    if (!listaElemento) return;

    listaElemento.innerHTML = ''; 

   
    cart.forEach(function(item, index) {
        
        if(!item.qtd) item.qtd = 1;

        listaElemento.innerHTML += `
            <div class="card-item">
                <div class="info-produto">
                    <img src="src/assets/images/almoço.png" alt="">
                    <div>
                        <p class="nome">${item.n}</p>
                        <p class="preco">R$ ${item.p.toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                
                <div class="controles">
                    <span>Qtd ${item.qtd}</span>
                    <button class="btn-qtd" onclick="alterarQtd(${index}, -1)">—</button>
                    <button class="btn-qtd" onclick="alterarQtd(${index}, 1)">+</button>
                    <button class="btn-lixeira" onclick="removerItem(${index})">  <img src="src/assets/images/lixeira.png" alt="">  </button>
                </div>
            </div>
        `;
        totalSoma += (item.p * item.qtd);
    });

    totalElemento.innerHTML = "Total: R$ " + totalSoma.toFixed(2).replace('.', ',');
}


function alterarQtd(index, valor) {
    if (cart[index].qtd === undefined) cart[index].qtd = 1;
    
    cart[index].qtd += valor;

   
    if (cart[index].qtd <= 0) {
        removerItem(index);
    } else {
        salvarEAtualizar();
    }
}


function removerItem(index) {
    cart.splice(index, 1); // Remove 1 item da posição index
    salvarEAtualizar();
}

function salvarEAtualizar() {
    localStorage.setItem('carrinhoItens', JSON.stringify(cart));
    exibirCarrinho();
}