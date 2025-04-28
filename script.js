let carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};

function adicionarProduto(codigo, nome, preco) {
  if (carrinho[codigo]) {
    carrinho[codigo].quantidade += 1;
  } else {
    carrinho[codigo] = { nome: nome, preco: preco, quantidade: 1 };
  }
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const tbody = document.querySelector('#carrinho tbody');
  const totalGeralEl = document.getElementById('total-geral');
  tbody.innerHTML = '';

  let totalCompra = 0;

  for (const codigo in carrinho) {
    const item = carrinho[codigo];
    const totalItem = item.preco * item.quantidade;
    totalCompra += totalItem;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.quantidade}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td>R$ ${totalItem.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  }

  // Atualiza o total geral
  totalGeralEl.textContent = `R$ ${totalCompra.toFixed(2)}`;

  // Salva no localStorage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

// Mostrar modal quando tentar sair do site
window.addEventListener('beforeunload', function (e) {
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';

  // Impede saída
  e.preventDefault();
  e.returnValue = '';
});

// Atualizar carrinho ao carregar a página
window.onload = atualizarCarrinho;
