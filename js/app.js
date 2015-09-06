var myapp = angular.module('myapp',[]);

//////////////////Service///////////////////
myapp.service('userService',function(){

	var self = this;


	//Generate unique number with help of date
	var uniqueNumber = {previous : 0};

	this.uniqueNumber = function() {
    	var date = Date.now();
    
    	// If created at same millisecond as previous
    	if (date <= uniqueNumber.previous) {
        	date = ++uniqueNumber.previous;
    	} else {
	        uniqueNumber.previous = date;
    	}
    
    	return date;
	}


	//data list - array
	this.users = [
					{id:self.uniqueNumber(),name:'Smit',email:'aqua.smit@gmail.com',phone:'9892582918'},
					{id:self.uniqueNumber(),name:'Bob',email:'bob@xyz.com',phone:'9323468506'},
				 ];


 	///////////methods//////

 	//user list
	this.getUsersApi = function(){
		return self.users;
	};

	//delete user
	this.deleteUsersApi = function(id){
		var u = self.getUsersApi();
		for (var i = 0; i < self.getUsersApi().length; i++) {
			var obj = u[i];
    		if(u[i].id == id){

    			self.users.splice(i,1);
    		}
    
		}
		
	};

	//update user
	this.updateUserApi = function(userObj){
			var u = self.getUsersApi();
		for (var i = 0; i < u.length; i++) {
			var obj = u[i];
    		if(u[i].id == userObj.id){

				self.users[i].name = userObj.name;
				self.users[i].email = userObj.email;
				self.users[i].number = userObj.number;    			
    		}
    
		}
	};

	//store user
	this.storeUserApi = function(userObj){

		userObj.id = self.uniqueNumber();
		self.users.push(userObj);
	};	

	//search user
	this.searchUserApi = function(searchObj){

		//$scope.userfrm = userinfo;		
	}		

});

////////////////////admin controller/////////////////////
myapp.controller('adminCtrl',['$scope','userService',function($scope,userService){

	$scope.users = userService.getUsersApi();
	//console.log($scope.users);

	$scope.deleteUser = function(id){
		userService.deleteUsersApi(id);
	};

	$scope.storeUser = function(){
	
		var userObj = $scope.userfrm; 
		if(userObj.id != undefined && userObj.id != "") {

			userService.updateUserApi(userObj);
		} else {

			userService.storeUserApi(userObj);
		}	
		$scope.userfrm = {};
	};	

	$scope.editUser = function(userinfo){

		//Note that i cannot write line "$scope.userfrm = userinfo" becuase that will cause the issue and that will bind the form values with specific row and that will update column value as sson as u write in textbox. As a solution, i had to use below function.
		$scope.userfrm = angular.copy(userinfo);	
	}



	
}]);


////////////////////user controller/////////////////////
myapp.controller('userCtrl',['$scope','userService',function($scope,userService){

	

	$scope.searchUserByName = function(){

		if($scope.qname != "") {		
			var searchObj = { name:$scope.qname }
			userService.searchUserApi(searchObj);
			document.getEleentById('searchresulttbl').style.visibility = "visible";
		}
	};	

	$scope.clearSearch = function(){
		$scope.qname = "";
		document.getEleentById('searchresulttbl').style.visibility = "hidden";
	};	
	
}]);