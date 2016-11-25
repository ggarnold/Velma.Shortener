(function() {
	'use strict';

	const factoryName = "Log";
	const factoryId = 'logService';

	angular
		.module('app')
		.factory(factoryId, factory);

	factory.$inject = [
		'@config'
	];

	function factory(config) {

		var logLevels = [
			'debug',   // 0
			'info',    // 1
			'error',   // 2
			'none'     // 3
		];

		var service = {
			levels: logLevels,
            logLevel: (config.logLevel) ? logLevels.indexOf(config.logLevel) : 0, //debug
			debug: debug,
			info: info,
			error: error
		};

		function debug(message, data) {
			if (service.logLevel <= 0) {
				console.log(message);
				if (data) console.log(data);
			}
		}

		function info(message, data) {
			if (service.logLevel <= 1) {
                console.log(message);
                if (data) console.log(data);
            }
		}

		function error(message, data) {
			if (service.logLevel <= 2) {
                console.error(message);
                if (data) console.error(data);
            }
		}

		return service;
	}
})();
