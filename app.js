function get_time_diff(datetime) {
	var datetime =
		typeof datetime !== "undefined" ? datetime : "2014-01-01 01:02:03.123456";
	var datetime = new Date(datetime).getTime();
	var now = new Date().getTime();

	if (isNaN(datetime)) return "";
	if (datetime < now) {
		var milisec_diff = now - datetime;
	} else {
		var milisec_diff = datetime - now;
	}
	var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
	var date_diff = new Date(milisec_diff);
	return (
		date_diff.getSeconds() +
		" Seconds, " +
		date_diff.getMilliseconds() +
		" Milliseconds"
	);
}

var numOfWorkersToCompare = 10;

function startWithWebWorkers() {
	var startTime = Date.now();
	var workers = {};

	function addWorker(i) {
		workers[i] = new Worker("workers/worker1.js").onmessage = function(e) {
			console.log("worker " + i + " finish at " + get_time_diff(startTime));
		};
	}
	for (var i = 0; i <= numOfWorkersToCompare; i++) {
		addWorker(i);
	}
}

function startWithoutWebWorkers() {
	var startTime = Date.now();
	for (var j = 0; j <= numOfWorkersToCompare; j++) {
		for (var i = 0; i < 1000000000; i++) {}
	}
	console.log("single thread - time:" + get_time_diff(startTime));
}
