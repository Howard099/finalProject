$(function(){

	$('#reset').on('click', function(){
		location.reload()
	})

	function toggleByIndex(index){
		let cell = $('#game').children().eq(index)
		if(!cell.attr('class')){
			cell.addClass('isoff')
		}else if(cell.hasClass('ison')){
			cell.removeClass('ison')
			cell.addClass('isoff')
		}else if(cell.hasClass('isoff')){
			cell.removeClass('isoff')
			cell.addClass('ison')
		}else{
			alert('nobueno')
		}
	}

	function click(index){
		let top = index-5;
		let buttom = index+5;
		let left = index-1;
		let right = index+1;
		let locationsAll = [top, buttom, left, right, index];
		let locationsExLeft = [top, buttom, right, index]; //we wont toggle the left neighbor if the click is already on the left-most cell
		let locationsExRight = [top, buttom, left, index]; //we wont toggle the right neighbor if the click is already on the right-most cell

		let leftMostIndexes = [0,5,10,15,20];
		let rightMostIndexes = [4,9,14,19,24]

		if(leftMostIndexes.includes(index)){
			let i=0
			while(i<locationsExLeft.length){
				if(locationsExLeft[i]>=0 && locationsExLeft[i]<=24){
					toggleByIndex(locationsExLeft[i])
					i++
				}else{
					i++
				}
			}
		}else if(rightMostIndexes.includes(index)){
			let i=0
			while(i<locationsExRight.length){
				if(locationsExRight[i]>=0 && locationsExRight[i]<=24){
					toggleByIndex(locationsExRight[i])
					i++
				}else{
					i++
				}
			}
		}else{
			let i=0
			while(i<locationsAll.length){
				if(locationsAll[i]>=0 && locationsAll[i]<=24){
					toggleByIndex(locationsAll[i])
					i++
				}else{
					i++
				}
			}
		}


	}


	function hasWon(){
		children = document.getElementById('game').children

		var off=0
		for(var i=0; i<children.length; i++){
			if(children[i].classList.contains('isoff')){
				off++
			}
		}

		if(off==0){
			return true
		}else{
			return false
		}
	}

	var moves=0
	$('#game').on('click', function(event){
		moves++
		$('#moves').children().eq(1).text(moves)

		target=event.target
		target=$(target)
		click(target.index())

		if(hasWon()){
			alert('You won! \nYou completed the chalenge in '+moves+' moves. \nYou can see your time as long as that alert is showing.')
			$('#game').off('click')
		}

	})

	$('#reset').on('click', function(){
		location.reload()
	})


	function newGame(){
		//minClicks is the number of random clicks before the game start (set to be bettween 6 and 13)
		let minclicks = Math.floor(Math.random() * (13 - 7 + 1)) + 7


		//we want to click minClicks times in the game at minClicks random locations. Lets put these random locations in an array.
		var locationsToClick = []

		while(locationsToClick.length<minclicks){
			let randomLocation = Math.floor(Math.random()*25)

			if(!locationsToClick.includes(randomLocation)){
				locationsToClick.push(randomLocation)
				click(randomLocation)
			}
		}
		$('#target').children().eq(1).text(minclicks);

		return locationsToClick
	}
	var loc = newGame()


	$('#solutionb').on('click', function(){
		$('#sol').text(loc)
	})
})




// Initialize variables
var timerElement = $("#time").children().eq(1);
var hours = 0;
var minutes = 0;
var seconds = 0;

// Function to update the timer
function updateTimer() {
    // Increment seconds
    seconds++;

    // Update minutes and reset seconds if necessary
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    // Update hours and reset minutes if necessary
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }

    // Format time
    var formattedTime = 
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);

    // Update timer element
    timerElement.text(formattedTime);
}

// Start the timer
var intervalId = setInterval(updateTimer, 1000);
