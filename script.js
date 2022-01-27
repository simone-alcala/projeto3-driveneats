let prato = false;
let bebida = false;
let sobremesa = false;

let pratoSelecionado ;
let bebidaSelecionado ;
let sobremesaSelecionado ;

let nomePrato;
let nomeBebida;
let nomeSobremesa;
let precoTotal;

const celular = "5519982199629";

function selecionar(item){
  selecionarItem(item);
  removerSelecao(item);
  if (verificarSelecao()){
    fecharPedido();
  }
}

function selecionarItem(item){ 
  document.getElementById(item).style.border= "solid 3px #32b72f";
  document.getElementById(item).children[4].style.display = "block";
}

function removerSelecao(item){
  let naoRemove = item.slice(item.length - 1);
  let tipo = item.substr(0,item.length - 1);

  if (tipo == "prato_"){
    pratoSelecionado = item;
    prato = true;
  } else if (tipo == "bebida_"){
    bebidaSelecionado = item;
    bebida = true;
  } else {
    sobremesaSelecionado = item;
    sobremesa = true;
  }

  for (let i = 1 ; i < 6 ; i++){
    if (i != naoRemove) {
      document.getElementById(tipo+i).style.border= "none";
      document.getElementById(tipo+i).children[4].style.display = "none";
    }
  }
}

function verificarSelecao() {
  return  prato && bebida && sobremesa;
}

function fecharPedido(){
  let fechar = document.querySelector(".fechar-pedido")
  fechar.classList.add("fechar-pedido-habilitado");
  fechar.innerHTML = "Fechar pedido";
  fechar.disabled = false;
}

function abrirResumoPedido(){
  document.querySelector(".telaConfirmar").classList.add("abreTelaConfirmacao");
  preencherResumo();
}

function cancelar(){
  document.querySelector(".telaConfirmar").classList.add("fechaTelaConfirmacao");
  
}

function preencherResumo(){

  nomePrato = document.getElementById(pratoSelecionado).querySelector(".titulo").innerHTML;
  let precoPrato = document.getElementById(pratoSelecionado).querySelector(".preco").innerHTML;

  nomeBebida = document.getElementById(bebidaSelecionado).querySelector(".titulo").innerHTML;
  let precoBebida = document.getElementById(bebidaSelecionado).querySelector(".preco").innerHTML;

  nomeSobremesa = document.getElementById(sobremesaSelecionado).querySelector(".titulo").innerHTML;
  let precoSobremesa = document.getElementById(sobremesaSelecionado).querySelector(".preco").innerHTML;

  precoTotal = calcularTotal(precoPrato,precoBebida,precoSobremesa);

  document.querySelector(".tab-prato").innerHTML = nomePrato;
  document.querySelector(".tab-prato-preco").innerHTML = precoPrato;

  document.querySelector(".tab-bebida").innerHTML = nomeBebida;
  document.querySelector(".tab-bebida-preco").innerHTML = precoBebida;

  document.querySelector(".tab-sobremesa").innerHTML = nomeSobremesa;
  document.querySelector(".tab-sobremesa-preco").innerHTML = precoSobremesa;

  document.querySelector(".tab-total-preco").innerHTML = trocarPontoVirgula(precoTotal.toFixed(2));

}

function calcularTotal(prato,bebida,sobremesa){
  return parseFloat(trocarVirgulaPonto(prato)) + parseFloat(trocarVirgulaPonto(bebida)) + parseFloat(trocarVirgulaPonto(sobremesa));
}

function trocarVirgulaPonto(valor){
  return valor = valor.replace (",",".");;
}

function trocarPontoVirgula(valor){
  return valor = valor.replace (".",",");;
}

function fazerPedido(){
  

  let linkWhasapp = "Olá, gostaria de fazer o pedido: \n";
  linkWhasapp += "- Prato: " + nomePrato + "\n";
  linkWhasapp += "- Bebida: " + nomeBebida + "\n";
  linkWhasapp += "- Sobremesa: " + nomeSobremesa + "\n";
  linkWhasapp += "Total: R$ " + precoTotal.toFixed(2) + "\n";

  linkWhasapp = encodeURIComponent (linkWhasapp);

  linkWhasapp = "https://wa.me/" + celular + "?text=" + linkWhasapp;
  alert(linkWhasapp);

  window.open(linkWhasapp);
  
  
}