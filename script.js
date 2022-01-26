var prato = false;
var bebida = false;
var sobremesa = false;

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
  var naoRemove = item.slice(item.length - 1);
  var tipo = item.substr(0,item.length - 1);

  if (tipo == "prato_"){
    prato = true;
  } else if (tipo == "bebida_"){
    bebida = true;
  } else {
    sobremesa = true;
  }

  for (var i = 1 ; i < 6 ; i++){
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
  document.getElementById("fecharPedido").style.backgroundColor= "#32b72f";
  document.getElementById("fecharPedido").style.fontWeight= "700";
  document.getElementById("fecharPedido").innerHTML = "Fechar pedido";
  document.getElementById("fecharPedido").disabled = false;
}

function abrirResumoPedido(){
  document.getElementById("telaConfirmar").style.display = "flex";
}

function cancelar(){
  document.getElementById("telaConfirmar").style.display = "none";
}