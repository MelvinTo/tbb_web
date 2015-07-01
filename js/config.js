/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/live_alerts");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.live_alerts', {
            url: "/live_alerts",
            templateUrl: "views/live_alerts.html",
            data: { pageTitle: 'Alerts' },
            controller: 'LiveAlertsController'
        })
        .state('index.live_alert', {
            url: "/live_alert/:alert_id",
            templateUrl: "views/live_alerts.html",
            data: { pageTitle: 'Alerts' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ngGrid',
                            files: ['js/plugins/nggrid/ng-grid-2.0.3.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            files: ['js/plugins/nggrid/ng-grid.css']
                        }
                    ]);
                }
            },
            controller: 'LiveAlertController'
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'TBB Monitoring' }
        })
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
