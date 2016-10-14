var app = angular.module('taxa-app', []).controller('tax-con', function($scope, $http) {
    $scope.currSynaps = [];
    $scope.possParents = ['Biota'];
    $scope.addSynap = function() {
        if ($scope.newSynaps && $scope.newSynaps != '') {
            $scope.currSynaps.push($scope.newSynaps);
            $scope.newSynaps = '';
        }
    };
    $scope.removeSynap = function(n) {
        $scope.currSynaps.splice(n, 1);
    };
    $scope.getPars = function() {
        $http.get('/allTax').then(function(r) {
            console.log(r.data);
            $scope.possParents = ['Biota'];
            if (r.data.length) {
                r.data.forEach(function(el) {
                	console.log('adding',el.name)
                    $scope.possParents.push(el.name);
                })
                console.log($scope.possParents)
            }
        })
    };
    $scope.getPars();
    $scope.addTaxon = function() {
        var data = {
            name: $scope.name,
            desc: $scope.desc,
            parent:$scope.taxParent,
            synaps:$scope.currSynaps
        }
        $http.post('/newTaxon',data).then(function(r){
        	console.log('response:',r)
        	if(r.data=='Error: This taxon already exists!'){
        		alert($scope.name+' already exists!')
        	}else{
        		window.location.reload();
        	}
        });
    }
})
