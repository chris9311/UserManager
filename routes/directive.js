var routerApp = angular.module('routerApp',['ngRoute','ui.router','usersManager','userregister','userslist','login']);
//userInfoModule.directive("userform", function() {
//    return {
//        restrict: 'E',
//        template: '../pages/edit.html',
//        replace: true
//    }S
//});
routerApp.run(function($window,$rootScope,$state,$location) {
    //$rootScope.$state = $state;
    //$rootScope.$stateParams = $stateParams;
    $rootScope.$on('$routeChangeStart', function(event,toState) {
        //console.log("toState.name:"+toState.name);
//        console.log("2"+$state);
        //if(toState.name==login)
        //    reutrn;
        console.log("SS"+$rootScope.user);
//        if(!$rootScope.user || !$rootScope.user.token){
////            event.preventDefault();
//            //$state.go('index.html');
//            $location.path('/index');
//        }

    });
});

routerApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'views/pages/welcome.html'
            })
            .when('/userlist',{
                templateUrl: 'views/pages/userlist.html'
            })
            .when('/useradd',{
                templateUrl: 'views/pages/register.html'
            })
            .when('/useredit/:userid',{
                templateUrl: 'views/pages/edit.html'
            })
            .otherwise({
                redirectTo: '/index'
            });
    }
]);

routerApp.directive('loginmodal',function(){
    return {
        restrict :'E',
        templateUrl : 'views/pages/modal.html',
        replace :true
    }
}).directive('topbar',function(){
    return{
        restrict :'E',
        templateUrl : 'views/pages/topbar.html',
        replace :true
    }
});