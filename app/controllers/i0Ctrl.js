(function() {

    'use strict';

    angular.module('if977App').controller('i0Ctrl', initI0Ctrl);

    initI0Ctrl.$inject = ['$scope', '$http'];

    function initI0Ctrl ($scope, $http) {

      $scope.artefatos = {};

      pegarDados(function(err, dados){

        if (err) alert('Não foi possível realizar esta operação');
        $scope.artefatos = dados.i0;
        // console.log($scope.artefatos);
        calcularNota();

      }, $http);

      $scope.calcularNota = calcularNota;

      function calcularNota(){

        var nota = 0;
        var peso = 0;
        var maximo = 10;
        var notaEquivalente = 10;
        var notaFinal = 0;
        var erro = 0;
        var label = 0;

        for(var i = 0; i < $scope.artefatos.length; i++){

          for(var y = 0; y < $scope.artefatos[i].atividades.length; y++){

            if($scope.artefatos[i].atraso.value === 1) {
                maximo = 8;
                notaEquivalente = ($scope.artefatos[i].atividades[y].value * maximo) / 10;
            } else if($scope.artefatos[i].atraso.value === 2) {
                maximo = 6;
                notaEquivalente = ($scope.artefatos[i].atividades[y].value * maximo) / 10;
            } else if($scope.artefatos[i].atraso.value > 2) {
                notaEquivalente = 0;
            } else{
                notaEquivalente = $scope.artefatos[i].atividades[y].value;
            }

            nota = nota + (notaEquivalente * $scope.artefatos[i].atividades[y].peso);
            peso = peso + $scope.artefatos[i].atividades[y].peso;

            if($scope.artefatos[i].atividades[y].id == 'erroPortugues'){
              erro = $scope.artefatos[i].atividades[y].value;
            }

            if($scope.artefatos[i].atividades[y].id == 'usoLabels'){
              label = $scope.artefatos[i].atividades[y].value;
            }

            maximo  = 10;
            notaEquivalente = 10;

          }

          if (nota > 0) {
            notaFinal = ( ((nota/peso) - erro) - label);
            $scope.artefatos[i].nota = parseFloat((notaFinal).toFixed(2));
          } else{
            $scope.artefatos[i].nota = 0;
          }

          erro = 0;
          label = 0;
          nota = 0;
          peso = 0;

        }

      }

    }



    function pegarDados(callback, http){
      http({ method: 'GET', url: 'componentesAvaliacao.js' })
      .then(function successCallback(res) {
          callback(false, res.data);
      }, function errorCallback(res) {
          callback(true);
      });
    }


})();
