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
                    console.log('adding', el.name)
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
            parent: $scope.taxParent,
            synaps: $scope.currSynaps
        }
        $http.post('/newTaxon', data).then(function(r) {
            console.log('response:', r)
            if (r.data == 'Error: This taxon already exists!') {
                alert($scope.name + ' already exists!')
            } else {
                window.location.reload();
            }
        });
    }
    $scope.drawTreeBranches = function(obj, par) {
        var thisLvlKids = Object.keys(obj);
        for (var i = 0; i < thisLvlKids.length; i++) {
            var newTxDiv = document.createElement('div');
            newTxDiv.id = 'taxon-' + thisLvlKids[i];
            newTxDiv.className = 'tree-txn';
            newTxDiv.innerHTML = thisLvlKids[i]+'<br/>';
            $('#taxon-' + par).append(newTxDiv);
            var subkids = Object.keys(obj[thisLvlKids[i]]);
            if (subkids.length){
            	$scope.drawTreeBranches(obj[thisLvlKids[i]],thisLvlKids[i])
            }
        }
    };
    $scope.getTree = function(tx) {
        var url = '/tree' + (tx ? '/' + tx : '');
        $http.get(url).then(function(res) {
            console.log(res.data);
            $scope.drawTreeBranches(res.data, 'tree-result');
        })
    }
})
