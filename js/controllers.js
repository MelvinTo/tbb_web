/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl() {

    this.userName = 'Melvin Tu';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

};

var contextDefintions = {
	userID: {
		description: "User ID",
		category: "User"
	},
	userFullname: {
		description: "Full Name",
		category: "User"
	},
	ipAddress: {
		description: "IP Address",
		category: "Device"
	},
	dataID: {
		description: "File ID",
		category: "Data"
	},
	dataName: {
		description: "File Name",
		category: "Data"
	}
};

var alerts = [
	{
		id: 123,
		appID: 'abcdefg',
		appName: 'Box',
		eventTypeID: 'me.hatu.events.box.BoxUploadEvent',
		eventID: 123456,
		status: "New",
		selected: true,
		contexts: {
			userID: "melvinto",
			userFullname: "Melvin Tu",
			ipAddress: "64.104.125.225",
			dataID: "12345678",
			dataName: "Highly Confidential.docx"
		},
		createdAt: '2015-06-19 00:00:00',
		lastModifiedAt: '2015-06-20 12:00:39',
		riskScore: 8.5,
		maxRiskScore: 10,
		policies: [
			{
				id: 3456,
				description: "Highly Confidential documents are transferred outside company",
				risk_level: "Medium"
			},
			{
				id: 5678,
				description: "User is leaving company in two weeks ",
				risk_level: "High"
			}
		]
	},
	{
		id: 456,
		appID: 'abcdefg',
		appName: 'Box',
		eventTypeID: 'me.hatu.events.box.BoxUploadEvent',
		eventID: 789012,
		status: "Escalated",
		selected: false,
		contexts: {
			userID: "limhu",
			userFullname: "Limin Hu",
			ipAddress: "10.0.0.1",
			dataID: "12345679",
			dataName: "Restricted.docx"
		},
		createdAt: '2015-06-18 18:00:10',
		lastModifiedAt: '2015-06-22 14:00:39',
		riskScore: 6.5,
		maxRiskScore: 10,
		policies: [
			{
				id: 1234,
				description: "Company Restricted documents are transferred outside company",
				risk_level: "Medium"
			},
			{
				id: 5678,
				description: "User is leaving company in two weeks",
				risk_level: "High"
			}
		]	
	}
];

var fileAttributeDefinition = {
	name: {
		description: "FileName"
	},
	classificationLevel: {
		description: "ClassificationLevel"
	},
	owner: {
		description: "FileOwner"
	}
}

var fileInfo = {
	12345678: {
		name: "Highly Confidential.docx",
		classificationLevel: "Highly Confidential",
		owner: "Limin Hu",
	},
	12345679: {
		name: "Restricted.docx",
		classificationLevel: "Restricted",
		owner: "Melvin Tu",
	}
}

function LiveAlertsController($scope, $state) {
	$state.go('index.live_alert', {alert_id: alerts[0].id})
}

function getContextGridData(alert) {
	var contexts = alert.contexts;
	var contextKeys = Object.keys(contexts);

	var ngData = []

	for (var i = 0; i < contextKeys.length; i++) {
		var key = contextKeys[i];
		var value = contexts[key];
		console.log(key)
		var keyDescription = contextDefintions[key].description
		var keyCategory = contextDefintions[key].category
		ngData.push({Category: keyCategory, Key: keyDescription, Value: value});
	}

	return ngData
}

function getFileGridData(alert) {
	var dataID = alert.contexts.dataID;
	var file = fileInfo[dataID];

	var ngData = [];

	ngData.push(file)
	return ngData
}

function LiveAlertController($scope, $state, $stateParams) {
	var alertID = $stateParams.alert_id;

	$scope.selectedAlert = undefined;

	for (var i = 0; i < alerts.length; i++) {
        if (alerts[i].id == alertID) {
        	$scope.selectedAlert = alerts[i]

        	// transform contexts
        	$scope.contextGridData = getContextGridData($scope.selectedAlert)

        	// set file data
        	$scope.fileGridData = getFileGridData($scope.selectedAlert)
        }
    }

	$scope.contextGrid = { data: 'contextGridData' };
	$scope.fileGrid = {
		data: 'fileGridData', 
		columnDefs: [
			{
				field: "name", 
				displayName: "File Name" 
			}, 
			{
				field:"classificationLevel",
				displayName:'Classification Level'
			},
			{
				field:"owner",
				displayName:'File Owner'
			}
		]
	};

	$scope.alerts = alerts

	$scope.selectAlert = function(index) {
		$scope.selectedAlert = $scope.alerts[index];
	};

	$scope.goToAlert = function(index) {
		$state.go('index.live_alert', {alert_id: index})
	}

	$scope.getCreatedTime = function(alert) {
		return moment.utc(alert.createdAt)
	}

	$scope.getLastUpdatedTime = function(alert) {
		return moment.utc(alert.lastModifiedAt)
	}
}

angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('LiveAlertsController', LiveAlertsController)
	.controller('ngGridCtrl', ngGridCtrl)
	.controller('LiveAlertController', LiveAlertController)
