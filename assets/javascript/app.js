var trainData= new Firebase('https://trainproject-3372b.firebaseio.com/');

var name = '';
var destination ='';
var time = '';
var frequency = '';

	$('#submit').on('click',function(){
		name = $('#trainName').val();
		destination = $('#destinationInput').val();
		time = $('#firstTrainTimeInput').val();
		frequency = $('#frequencyInput').val();
		trainData.push({
			name: name,
			destination: destination,
			time: time,
			frequency:frequency,

		});
		$('#nameInput').val('');
		$('#destinationInput').val('');
		$('#firstTrainTimeInput').val('');
		$('#frequencyInput').val('');

		return false;
	});

trainData.on("child_added", function(snapshot) {

	var tableRow = $('<tr>');	

	var firstTime = snapshot.val().time;
	
	var tFrequency= snapshot.val().frequency;

	tFrequency = parseInt(tFrequency);

	var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");

	var currentTime = moment();

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	
	var tRemainder = diffTime % tFrequency;

	var tMinutesTillTrain = tFrequency - tRemainder;

	var nextTrain = moment().add(tMinutesTillTrain, "minutes")
	nextTrain = moment(nextTrain).format("hh:mm");

	var trainInfo = [snapshot.val().name, snapshot.val().destination, tFrequency, nextTrain,tMinutesTillTrain];

	for(var i = 0; i < trainInfo.length;i++){
		var tableData = $('<td>');

		tableData.html(trainInfo[i]);

		tableData.attr('id',i);

		tableRow.append(tableData)
	}

	$('#trainInfo > tBody:last-child').append(tableRow);

	return false;

})


