//var loginFilter = angular.module('loginfilter',[]);
//loginFilter.controller('LoginFilter',function($scope,$http){
//   $http.get('user/check')
//       .success(function(user_id){
//           if(!user_id){
//               window.location="#/index/login"
//           }
//       });
//});

var loginModule = angular.module('login',[]);
loginModule.controller('LoginController',['$rootScope','$scope','$http',function($rootScope,$scope, $http){
    $scope.user = {
        username :"",
        password:""
    };

    $scope.resetData = function () {
        $scope.user = {
            username :"",
            password:""
        };
    };
    
    $scope.login = function () {
        $http({
            method:'POST',
            url:'user/login',
            data : $.param($scope.user),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function (msg) {
                if(msg.success == true)
                {
                    console.log(msg.user)
                    //console.log($http.session);
                    //console.log($http.user_id);
                    //console.log($http);
                    //console.log(user_id);
//                    console.log(session);
//                    console.log(session.user_id);
                    $rootScope.user=msg.user;
                    window.location="#/index/userlist";
                }


                    //window.location="#/index";
                else{
                    $scope.mag=msg;
                }
            })
    }
}]);

var userInfoModule = angular.module('usersManager',[]);
userInfoModule.controller('UserInfoController',function($scope, $http, $routeParams){

    console.log($routeParams);
    console.log("userid:"+$routeParams.userid);
    var userId  = $routeParams.userid;
    var user;
    $http.get("/user/edit/"+userId)
        .success(function(_user){
        console.log("success");
        user = _user;
        $scope.userInfo = {
            userid:user._id,
            username : user.username,
            useremail : user.useremail
        };
    });

    $scope.save = function(){
        $http({
            method : 'POST',
            url : '/user/edit',
            data : $.param($scope.userInfo),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(){
                console.log("success");
                window.location="#/index/userlist";
            })
    };
    $scope.resetData = function() {
        $scope.userInfo = {
            userid:user._id,
            username : user.username,
            useremail : user.useremail
        }
    };
});

var userRegister = angular.module('userregister',['ngDialog']);
userRegister.controller('UserRegister',function($scope,$http,ngDialog){
    $scope.user ={
        username : "",
        password : "",
        cpassword : "",
        useremail : ""
    };
    $scope.msg = "";

    $scope.check = function(){
        $http({
            method : 'POST',
            url : '/user/new',
            data : $.param($scope.user),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(msg){
                console.log(msg);
                if(msg.success == true)
                    window.location="#/index/userlist";
                else{
                    $scope.msg = msg;
                    //ngDialog.open({ template: '../views/pages/alert-home.html' });
                    ngDialog.open({ template: '/../views/pages/alert/alert-msg.html',
                        className: 'ngdialog-theme-plain',
                        scope:$scope,
                    });
                }
            })
    };

    $scope.reset = function(){
        $scope.user = {
            username: "",
            password: "",
            cpassword: "",
            useremail: ""
        }
    }
});

var Userlist = angular.module('userslist', ['ngDialog']);
Userlist.controller('userlistController',['$scope','$http','ngDialog',
    function($scope,$http,ngDialog) {
        $http.get("/user/getlist")
            .success(function(response) {
                $scope.users = response;
            });
        $scope.edit = function(id){
            console.log(id);
            window.location="#/useredit/"+id;
        };
        $scope.delete = function(id){
            $http.get('user/delete/'+id)
                .success(function(success){
                    console.log(success);
                    $http.get("/user/getlist")
                        .success(function(response) {
                            $scope.users = response;
                        });
                });
        }
    }
]);
