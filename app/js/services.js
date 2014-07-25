(function() {
	'use strict';

	/* Services */

	angular.module('myApp.services', ['myApp.service.login', 'myApp.service.firebase'])

		// put your services here!
		// .service('serviceName', ['dependency', function(dependency) {}]);
		.service('alertService', function($timeout){
			var _alerts = [];

			this.setAlerts = function(alerts){
				_alerts = alerts;
			};

			this.addAlert = function(alert){
				_alerts.push(alert);
				return check();
			};

			var check = function(){
				if(_alerts.length > 1){
					_alerts.splice(0,1);
				}
				return _alerts;
			};

			this.timeDelete = function(alerts){
				_alerts = alerts;
				var delay = 10000;
				$timeout(function(){
					removeAlert();
				}, delay);
				return _alerts;
			};

			this.deleteAlert = function(alerts){
				_alerts.splice(0,1);
				return _alerts;
			}

			var removeAlert = function(){
				_alerts.splice(0,1);
			}

		})

})();