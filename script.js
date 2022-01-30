let selecionadoPrato = null;
let selecionadoBebida = null;
let selecionadoSobremesa = null;
let precoTotal = 0;

const celular = "5519982199629";

if (document.readyState !== "complete" && 
   (selecionadoPrato == null || selecionadoBebida == null || selecionadoSobremesa == null) ){
  desabilitarFecharPedido();
}

function selecionar(item){ 

  let busca = "";
  let selecionado;

  if (item.classList[0]==="prato"){
    busca = ".pratos";
    selecionadoPrato = item;
  } else if (item.classList[0]==="bebida") {
    busca = ".bebidas";
    selecionadoBebida = item;
  } else{
    busca = ".sobremesas";
    selecionadoSobremesa = item;
  }

  selecionado = document.querySelector(busca+ " .selecionado");
   
  if (selecionado != null)  {
    selecionado.classList.remove("selecionado");
  }

  item.classList.add("selecionado");

  if ( selecionadoPrato != null && selecionadoBebida != null && selecionadoSobremesa != null ) {
    habilitarFecharPedido()
  }
}

function habilitarFecharPedido(){
  let footer = document.querySelector(".rodape");
  footer.classList.remove("botaoSelecioneTresItens");
  footer.classList.add("botaoFecharPedido");
  footer.disabled = false;
  footer.innerHTML = "Fechar pedido"; 
}

function desabilitarFecharPedido(){
  let footer = document.querySelector(".rodape");
  footer.classList.add("botaoSelecioneTresItens");
  footer.classList.remove("botaoFecharPedido");
  footer.disabled = true;
  footer.innerHTML = "Selecione os 3 itens para fechar o pedido"; 
}

function abrirResumoPedido () {
  let telaConfirmar = document.querySelector(".telaConfirmar");

  telaConfirmar.classList.remove("sumir");
  telaConfirmar.classList.add("mostrar");

  preencherResumo();
}

function preencherResumo(){

  let pratoNome = selecionadoPrato.querySelector(".titulo").innerHTML;
  let pratoPreco = retirarMoeda (selecionadoPrato.querySelector(".preco").innerHTML ); 
  
  let bebidaNome = selecionadoBebida.querySelector(".titulo").innerHTML;
  let bebidaPreco = retirarMoeda (selecionadoBebida.querySelector(".preco").innerHTML );

  let sobremesaNome = selecionadoSobremesa.querySelector(".titulo").innerHTML;
  let sobremesaPreco = retirarMoeda (selecionadoSobremesa.querySelector(".preco").innerHTML );

  let total = calcularTotal (pratoPreco, bebidaPreco, sobremesaPreco) ;

  document.querySelector(".tab-prato").innerHTML            = pratoNome;
  document.querySelector(".tab-prato-preco").innerHTML      = pratoPreco;

  document.querySelector(".tab-bebida").innerHTML           = bebidaNome;
  document.querySelector(".tab-bebida-preco").innerHTML     = bebidaPreco;

  document.querySelector(".tab-sobremesa").innerHTML        = sobremesaNome;
  document.querySelector(".tab-sobremesa-preco").innerHTML  = sobremesaPreco;

  document.querySelector(".tab-total-preco").innerHTML      = "R$ " + trocarPontoVirgula(total);
}

function calcularTotal(prato, bebida, sobremesa ){
  precoTotal = (parseFloat(trocarVirgulaPonto(prato)) + 
                parseFloat(trocarVirgulaPonto(bebida)) + 
                parseFloat(trocarVirgulaPonto(sobremesa))).toFixed(2); 
  return precoTotal;
}

function retirarMoeda(valor){
  return valor = valor.replace ("R$ ","");
}

function trocarVirgulaPonto(valor){
  return valor = valor.replace (",",".");
}

function trocarPontoVirgula(valor){
  return valor = valor.replace (".",",");
}

function confirmarPedido(){

  let nomeUsuario = prompt("Por favor, digite seu nome:");
  let enderecoUsuario = prompt("Por favor, digite seu endereço:");

  let linkWhatsapp = "Olá, gostaria de fazer o pedido: \n";
      linkWhatsapp += "- Prato: "     + selecionadoPrato.querySelector(".titulo").innerHTML     + "\n";
      linkWhatsapp += "- Bebida: "    + selecionadoBebida.querySelector(".titulo").innerHTML    + "\n";
      linkWhatsapp += "- Sobremesa: " + selecionadoSobremesa.querySelector(".titulo").innerHTML + "\n";
      linkWhatsapp += "Total: R$ "    + precoTotal      + "\n\n";
      linkWhatsapp += "Nome: "        + nomeUsuario     + "\n";
      linkWhatsapp += "Endereço: "    + enderecoUsuario + "\n";

      linkWhatsapp = encodeURIComponent (linkWhatsapp);

      linkWhatsapp = "https://wa.me/" + celular + "?text=" + linkWhatsapp;

  //window.location.assign(linkWhatsapp);
  
  abrirlinkWhatsApp (linkWhatsapp);
  
}

function abrirlinkWhatsApp (novoLink){

  let link = document.querySelector(".linkWhatsApp");
  link.href = novoLink;
  link.click();

}

function cancelarPedido(){
  let telaConfirmar = document.querySelector(".telaConfirmar");
      telaConfirmar.classList.add("sumir");
      telaConfirmar.classList.remove("mostrar");
}



