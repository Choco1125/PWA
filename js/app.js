if('serviceWorker' in navigator){
   navigator.serviceWorker.register('./sw.js')
    .then(()=>console.log('Registro de service worker exitoso'))
    .catch(err=>console.warn('Error al tratar de registrar el service worker', err))
}

init();
function init(){
    if(window.localStorage.getItem('saldo')===null){
        localStorage.setItem('saldo', parseInt(0));
        actualizarSaldo();
    }
}
var divAgregarDinero=false, divSacarDinero=false, divMovimientoa=false;
document.getElementById('ingresar-saldo-btn').addEventListener('click',function (){
    let agregarDineroDiv=document.getElementById('ingresar-saldo');
    if(divSacarDinero){
        document.getElementById('retirar-saldo').classList.add('hide');
        divSacarDinero=false;
    }
    if(divAgregarDinero){
        agregarDineroDiv.classList.add('hide');
        divAgregarDinero=false;
    }else{
        divAgregarDinero=true;
        agregarDineroDiv.classList.remove('hide');
    }
});
document.getElementById('btn-agregar-dinero').addEventListener('click',function (){
    let monto= document.getElementById('valor');
    if(monto.value==""){
        alert("Campo vacío.");
        monto.focus();
    }else{
       let saldo= parseInt(localStorage.getItem('saldo'));
       var nuevoSaldo= parseInt(saldo)+ parseInt(monto.value);
       localStorage.setItem('saldo', parseInt(nuevoSaldo));
       actualizarSaldo();
       monto.value="";
    }
});
document.getElementById('retirar-saldo-btn').addEventListener('click',function (){
    let retirarDineroDiv=document.getElementById('retirar-saldo');
    if(divAgregarDinero){
        document.getElementById('ingresar-saldo').classList.add('hide');
        divAgregarDinero=false;
    }
    if(divSacarDinero){
        retirarDineroDiv.classList.add('hide');
        divSacarDinero=false;
    }else{
        divSacarDinero=true;
        retirarDineroDiv.classList.remove('hide');
    }
});
document.getElementById('btn-retirar-dinero').addEventListener('click',function (){
    let monto= document.getElementById('valorRetirar');
    if(monto.value==""){
        alert("Campo vacío.");
        monto.focus();
    }else{
       let saldo= parseInt(localStorage.getItem('saldo'));
       if(parseInt(monto.value)>parseInt(saldo)){
            alert('No se puede retirar porque el monto es mayor al saldo');
            monto.focus();
            monto.value=saldo;
       }else{
            var nuevoSaldo= parseInt(saldo)- parseInt(monto.value);
            localStorage.setItem('saldo', parseInt(nuevoSaldo));
            actualizarSaldo();
            monto.value="";
       }
    }
});
function actualizarSaldo(){
    document.getElementById('saldo').innerText=parseInt(localStorage.getItem('saldo'));
    
}
document.getElementById('vaciar').addEventListener('click', function(){
    vaciar();
    alert('vacio');
})
function vaciar(){
    localStorage.setItem('saldo',parseInt(0));

}