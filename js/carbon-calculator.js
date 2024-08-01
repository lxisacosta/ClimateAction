document.addEventListener("DOMContentLoaded", function() {
    var resultado = document.getElementById('resultado');
    var resultado2 = document.getElementById("resultado2");
    var resultado3 = document.getElementById('resultado3');
    var resultado4 = document.getElementById('resultado4');
    var consumo = document.getElementById('consumo');
    var distancia = document.getElementById('distancia');
    var viagens = document.getElementById('viagens');
    
    window.calcCO2 = function() {
        var consumoL100km = parseFloat(consumo.value); 
        var distanciaKm = parseFloat(distancia.value); 
        var viagensSemana = parseFloat(viagens.value); 
        
        if (isNaN(consumoL100km) || isNaN(distanciaKm) || isNaN(viagensSemana)) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }
        
        var fatorEmissao = 2.31; 
        var calc4 = (fatorEmissao * consumoL100km) / 100; 
        var calc = (calc4 * distanciaKm) / 1000; 
        var calc2 = (calc * viagensSemana); 
        var calc3 = (calc2 * 52);
        
        calc = calc.toFixed(2);
        calc2 = calc2.toFixed(2);
        calc3 = calc3.toFixed(2);
        calc4 = calc4.toFixed(2);
        
        resultado.innerHTML = calc;
        resultado2.innerHTML = calc2;
        resultado3.innerHTML = calc3;
        resultado4.innerHTML = calc4;
    }
});

// versão eua: https://codepen.io/matt-bond/pen/ROrbOX
