// Selecionando elementos do DOM
const form = document.getElementById("form");
const inputCompra = document.getElementById("compra");
const listaCompras = document.getElementById("lista-compras");
const mensagemRemocao = document.getElementById("mensagem-remocao");

// Recupera itens salvos ao carregar a página
document.addEventListener("DOMContentLoaded", carregarItensSalvos);

// Adiciona um item na lista ao enviar o formulário
form.onsubmit = (e) => {
  e.preventDefault();

  const nomeItem = inputCompra.value.trim(); // Pega o valor digitado e remove espaços extras
  if (nomeItem === "") return; // Evita adicionar itens vazios

  adicionarItem(nomeItem);
  salvarItem(nomeItem); // Salva no localStorage
  inputCompra.value = ""; // Limpa o campo de input após adicionar
};

// Função para adicionar um novo item na lista
function adicionarItem(nome) {
  // Criando elementos
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `item-${nome.replace(/\s+/g, "-").toLowerCase()}`;

  const label = document.createElement("label");
  label.setAttribute("for", checkbox.id);
  label.textContent = nome;

  const botaoRemover = document.createElement("button");
  botaoRemover.classList.add("btn-remover");
  botaoRemover.innerHTML = `<img src="./img/Frame.png" alt="Remover item">`;
  botaoRemover.onclick = () => removerItem(li, nome);

  // Montando estrutura do item
  div.appendChild(checkbox);
  div.appendChild(label);
  li.appendChild(div);
  li.appendChild(botaoRemover);
  listaCompras.appendChild(li);
}

// Função para remover um item da lista
function removerItem(item, nome) {
  item.remove();
  removerItemLocalStorage(nome); // Remove do localStorage
}

// Função para salvar um item no localStorage
function salvarItem(nome) {
  let compras = JSON.parse(localStorage.getItem("compras")) || [];
  compras.push(nome);
  localStorage.setItem("compras", JSON.stringify(compras));
}

// Função para carregar os itens salvos ao abrir a página
function carregarItensSalvos() {
  let compras = JSON.parse(localStorage.getItem("compras")) || [];
  compras.forEach((item) => adicionarItem(item));
}

// Função para remover um item do localStorage
function removerItemLocalStorage(nome) {
  let compras = JSON.parse(localStorage.getItem("compras")) || [];
  compras = compras.filter((item) => item !== nome);
  localStorage.setItem("compras", JSON.stringify(compras));
}
