(function () {
    'use strict';
    var myApp = angular.module('ies');
    myApp.controller('laptopCtrl', laptopCtrl);
    laptopCtrl.$inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', 'laptopServices', 'bootstrapError'];
    function laptopCtrl($scope, $rootScope, $state, $window, $filter, $timeout, laptopServices, bootstrapError) {
        $scope.Math = window.Math;
        $scope.page = {};
        $scope.page.currentPage = 0;
        $scope.page.pageSize = 5;
        $scope.page.searchBox = '';
        $scope.hideErrors = function (id) {
            $scope.incharge = {};
            bootstrapError.hideErrors(id);
        }
        $scope.closeModal = function (model, form) {
            $scope.hideErrors(form);
            $('#' + model).modal('hide');
        }
        function getlaptop() {
            laptopServices.getlaptop(function (err, res) {
                if (!err) {
                    $scope.laptop = res.sort(function (a, b) {
                        return ;
                    });

                }
            });
        }
       
        getlaptop();
        $scope.getData = function () {
            var filterData = $filter('filter')($scope.laptop, $scope.page.q);
            return filterData
        }
        $scope.numberOfPages = function () {
            var data = $scope.getData();
            return Math.ceil(data.length / $scope.page.pageSize);
        }
        $scope.$watch('page.searchBox', function (newValue, oldValue) {
            if (oldValue != newValue) {
                $scope.page.currentPage = 0;
            }
        }, true);

        $scope.nextPage = function () {
            $scope.page.currentPage = $scope.page.currentPage + 1;
        }
        $scope.previousPage = function () {
            $scope.page.currentPage = $scope.page.currentPage - 1;
        }
        $scope.lastPage = function () {
            $scope.page.currentPage = Math.ceil($scope.getData().length / $scope.page.pageSize) - 1;
        }
        $scope.firstPage = function () {
            $scope.page.currentPage = 0;
        }

        $scope.add = function () {
            var form = document.getElementById('addlaptop');
            var check = form.checkValidity();
            if (check === true) {
                // $scope.incharge.picture = ($scope.incharge.picture);
                //  $scope.incharge.model = ($scope.incharge.model);
                // $scope.incharge.email = ($scope.incharge.email).toLowerCase();
                laptopServices.addlaptop($scope.incharge, function (err, res) {
                    if (!err) {
                        $("html").stop().animate({ scrollTop: 0 }, 200);
                        $scope.success = true;
                        $scope.successMsg = "Successfully added the laptop infomation";
                        $scope.laptop.push($scope.incharge);
                        $('#add_laptop').modal("hide");
                        $timeout(function () {
                            $scope.success = false;
                            $scope.successMsg = "";
                        }, 2000);
                    }
                    else {
                        $("html").stop().animate({ scrollTop: 0 }, 200);
                        $scope.error = true;
                        $scope.errorMsg = (err.data && err.data.message) ? err.data.message : err.statusText;
                        $timeout(function () {
                            $scope.error = false;
                            $scope.errorMsg = "";
                        }, 2000);
                    }
                });
            }
            else {
                bootstrapError.showErrors('addlaptop')
            }
        };
        $scope.delete = function(lap) {
            laptopServices.delete({id: lap._id}, function (err, res) {

    })
    }
}

    
    
    
    myApp.service('laptopServices', laptopServices);
    laptopServices.$inject = ['$http'];
    function laptopServices($http) {
        this.getlaptop = function (callback) {
            var request = {
                url: "laptop/getLaptopDetails",
                method: 'GET',
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response.data);
            }, function (error) {
                callback(error, null);
            });
        };
        this.addlaptop = function (details, callback) {
            var request = {
                url: "laptop/addlaptop",
                method: 'POST',
                data: details,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response.data);
            }, function (error) {
                callback(error, null);
            });
        };
        this.delete = function (details, callback) {
            var request = {
                url: "laptop/deletelaptop",
                method: 'DELETE',
                data: details,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response.data);
            }, function (error) {
                callback(error, null);
            });
        };
    }
})();