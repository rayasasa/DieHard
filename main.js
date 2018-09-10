var app = angular.module('dieHardApp', []);
app.controller('dieHardCtrl', function ($scope) {
    $scope.message = "Keep Going";
    $scope.smallJugMax = 3;
    $scope.smallJugCur = 0;
    $scope.bigJugmax = 5;
    $scope.bigJugCur = 0;
    $scope.target = 4;
    $scope.message = "";
    $scope.run_timer = function(){
    }
    function getTimer(endtime){
        var current_time = Date.parse(new Date());
        var deadline = new Date(current_time + endtime*60*1000);
        var t = deadline-current_time;
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        return {'minutes':minutes, 'seconds':seconds}
    }
    // Put them in sequence
    $scope.runSolution = function(){
        $scope.showSolution = 1;
        $scope.message = "First Fill Big Jug";
        $scope.fillBigJug(5);
        $scope.message = "Transfer to Small Jug";
        $scope.transferToSmall();
        $scope.message = "Empty Small Jug";
        $scope.emptySmallJug();
        $scope.message = "Transfer Big Jug contents to Small Jug";
        $scope.transferToSmall();
        $scope.message = "Fill Big Jug";
        $scope.fillBigJug(5);
        $scope.message = "Transfer Big Jug to small Jug";
        $scope.transferToSmall();
        $scope.message = "You Have 4 gallons";
    }
    $scope.fillBigJug = function(quant){
        $scope.emptyBigJug();
        $scope.bigJugCur = quant;
        while(quant > 0){
           var temp = "bj_" + (6-quant);
           document.getElementById(temp).style.backgroundColor = "lightblue";
           document.getElementById(temp).style.borderTopColor = "lightblue";
           quant--; 
        }
    }
    $scope.fillSmallJug = function(quant){
        $scope.emptySmallJug();
        $scope.smallJugCur = quant;
        while(quant > 0){
            var temp = "sj_" + (4-quant);
           document.getElementById(temp).style.backgroundColor = "lightblue";
           document.getElementById(temp).style.borderTopColor = "lightblue";
           quant--; 
        }
    }
    $scope.emptyBigJug = function(){
        $scope.bigJugCur = 0;
        for(var i = 1; i <=5; i++){
            var temp = "bj_" + i;
           document.getElementById(temp).style.backgroundColor = "white";
        }
    }
    $scope.emptySmallJug = function(){
        $scope.smallJugCur = 0;
        for(var i = 1; i <=3; i++){
            var temp = "sj_" + i;
           document.getElementById(temp).style.backgroundColor = "white";
        }
    }
    $scope.transferToSmall = function(){
        var x = $scope.smallJugCur + $scope.bigJugCur;
        if(x > 3){
            $scope.bigJugCur = x-3;
            $scope.fillBigJug(x-3);
            $scope.fillSmallJug(3);
            $scope.smallJugCur = 3;           
        }
        else{
            $scope.bigJugCur = 0;
            $scope.emptyBigJug();
            $scope.smallJugCur = x;
            $scope.fillSmallJug(x);
        }
        if($scope.bigJugCur == 4){
            $scope.message = "You are done";
        }

    }
    $scope.transferToBig = function(){
        var x = $scope.smallJugCur + $scope.bigJugCur;
        if(x > 5){
            $scope.bigJugCur = 5;
            $scope.fillBigJug(5);
            $scope.smallJugCur = x-5;
            $scope.fillSmallJug(x-5);
        }
        else{
            $scope.bigJugCur = x;
            $scope.fillBigJug(x);
            $scope.smallJugCur = 0;
            $scope.emptySmallJug();
        }
        if($scope.bigJugCur == 4){
            $scope.message = "You are done";
        }
    }
});


