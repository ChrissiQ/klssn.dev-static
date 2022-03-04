
// document.ready
$(function(){


//

//

// VARIABLES AND CONSTANTS

//

//

var 

// Need to set a max because it is really slow if we get too many pieces.
MAX_PIECES = 600,

// We divide the block size by the SNAP_MARGIN to see how close
// the dragged piece needs to get to its spot in order to snap to it.
// A bigger number means a smaller margin.
SNAP_MARGIN = 2,

userSetRows,
userSetColumns,

// create a new image element to attach the user loaded picture to later.
image = $('<img></img>'),
canvas = $('canvas#puzzle'),

puzzle = {
	element: $('div#puzzle-pieces'),
	pieces: []
};

// Prevent selection (blue highlighting) when dragging pieces.
puzzle.element
	.attr('unselectable','on')
	.css('UserSelect','none')
	.css('MozUserSelect','none');


//

//

// FILE INPUT

//

//


// Ask user to put a file.
$('div#upload').dialog({
	modal: true,
	width: 'auto',
	buttons: [{	
		id: 'load-button',
		text: 'Load',
		click: function() { 
			userSetRows = $('input#rows').val(),
			userSetColumns = $('input#columns').val();

			makeBlocks(userSetRows, userSetColumns, puzzle);
			scrambleBlocks();
			drawBlocks();

			$( this ).dialog( "close" ); 
		},
		disabled: "disabled"
	}]
});

// Functionality for drag & drop, & click for file dialog.
$('div#drag')

	.css("cursor", "pointer")

	.click(function(){ 
		// Simulate a click on the file input element.
		$('input:file').click(); 
	})

	.on("dragenter dragover drop", function(event) { 
		event.stopPropagation(); event.preventDefault(); 
	})
	.on("drop", function(event) { 
		handleFile(event.originalEvent.dataTransfer.files[0]); 
	});


// File input field action.
$('input:file').change(function(event){
	handleFile(event.target.files[0]);
});

function handleFile(file) {
	var reader = new FileReader();
	reader.readAsDataURL(file);

	$(reader).on("load", function(){

		image[0].src = this.result;
		$(this).off("load");
		image.load(function(){
			prepareCanvas();
			loadPreview(file);
		});

	});

}

$('#size').find('input[type=number]').change(function(event){
	$('div.message').html(evaluatePieces(event));
});
function evaluatePieces(event){

	var numPieces = $('input#rows').val() * $('input#columns').val(),
		message;

	if ((numPieces > MAX_PIECES) || (numPieces <= 1) || $(event.target).val() <= 1){

		$("div.message").addClass("error");
		$("button#load-button").button("disable");

		if (numPieces > MAX_PIECES){
			message = "Too many pieces.";
		}else{
			$(event.target).val(1);
			message = "Too few pieces.";
		}

	} else {
		$("button#load-button").button("enable");
		$("div.message").removeClass("error");
	
		var SIMPLE = 7, EASY = 22, MEDIUM = 99, HARD = 300,
			message = numPieces 
					+ ((numPieces === 1) 
						? " piece" 
						: " pieces");

		if 		(numPieces < SIMPLE)	message += ": simple";
		else if (numPieces < EASY)		message += ": easy";
		else if (numPieces < MEDIUM)	message += ": medium";
		else if (numPieces < HARD)		message += ": hard";
		else 	/* VERY_HARD */			message += ": very hard";

	}
	return message;

// end evaluatePieces()
}




// Initialize Puzzle

function prepareCanvas(){
	maximize([	canvas, 	canvas[0],	
				puzzle,		puzzle.element[0] 	]);
	draw();
	canvas.hide();
};
function loadPreview(file){
	image[0].file = file;
	$('#drag').html(image[0]).css({"height": "auto"});
	image.css({"width": "14em", "vertical-align": "middle"});
};

$(window).resize(function(){
	scale([canvas[0],puzzle, puzzle.element[0]], image[0]);
	// centre the containing div
	puzzle.element.css({
		"left": ($(window).width() - puzzle.element.width())/2,
		"top": ($(window).height() - puzzle.element.height())/2
	});
});

$(window).mousewheel(function(event, delta, deltaX, deltaY){
	event.preventDefault();
	if (delta > 0 || deltaY > 0){
		zoom("in");
	} else {
		zoom("out");
	}
});

// Maximize and scale the items to the canvas.
function maximize(items){
	var puzzleSize = scaleToFit(
		{ width: image[0].width, 	height: image[0].height 	}, 
		{ width: $(window).width(), 	height: $(window).height()	 	}
	);

	items.forEach(function(item){
		item.width = puzzleSize.width;
		item.height = puzzleSize.height;
		if( item.nodeType ) {
			$(item).css({
				"left": puzzleSize.x, 
				"top": puzzleSize.y
			});
		} else {
			item.x = puzzleSize.x;
			item.y = puzzleSize.y;
		}
	});
}

// Re-draw the image.
function draw(){
	canvas[0].getContext('2d').drawImage(
		image[0], 
		0,
		0,
		puzzle.width,
		puzzle.height
	);
};
function scale(inputs, scaleTo){
	inputs.forEach(function(input){	
		input.width = scaleTo.width;
		input.height = scaleTo.height;
	});
};
function scaleToFit(inner, outer){

	// scaleToFit:
	//
	// Scale inner object to fit outer object.
	// Takes two arguments with properties of width and height.
	//
	// Returns an object with properties width and height,
	// and coordinates x and y to centre the inner in the outer.
	//

	// Find scale of each element: width/height
	var innerRatio = inner.width/inner.height,
		outerRatio = outer.width/outer.height,

		// Set the default size and position of inner to the same as outer.
		scaledWidth = outer.width,
		scaledHeight = outer.height,
		top  = 0,
		left = 0;

	// If the inner image is bigger than the outer image in at least one dimension
	if (inner.width > outer.width || inner.height > outer.height){

		// If the scaled image is wider than the screen
		if (innerRatio > outerRatio){
			scaledHeight = scaledWidth/innerRatio;
			top = (outer.height - scaledHeight)/2;

		// If the scaled image is taller (or same) than the screen
		} else {
			scaledWidth = scaledHeight * innerRatio;
			left = (outer.width - scaledWidth)/2;
		}

	// Inner is smaller in both dimensions than outer
	} else {
		scaledWidth = inner.width;
		scaledHeight = inner.height;
		top = (outer.height - scaledHeight)/2;
		left = (outer.width - scaledWidth)/2;
	}

	return {
		"x": left,
		"y": top,
		"width": scaledWidth,
		"height": scaledHeight
	};
}

function imageSlice(originCanvas, slice){

	// Input: original, { x, y, width, height }
	// Output: img data

	var tempCanvas = document.createElement('canvas'),
		tempCtx = tempCanvas.getContext('2d');
	tempCanvas.width = slice.width;
	tempCanvas.height = slice.height;
	var slicex = slice.x,
		slicey = slice.y,
		width = slice.width,
		height = slice.height;

	// I will end up with unsightly grey squares 
	// if I do not check that I am not slicing outside the canvas.
	if (slice.x + slice.width > originCanvas.width){
		slicex = Math.floor(slice.x);
		width = Math.floor(slice.width);
	}
	if (slice.y + slice.height > originCanvas.height){
		slicey = Math.floor(slice.y);
		height = Math.floor(slice.height);
	}

	tempCtx.drawImage( originCanvas,
		slicex,				slicey,
		width,				height,
		0,					0,
		tempCanvas.width,	tempCanvas.height
	);
	return $('<img class="piece"></img>').attr("src", tempCanvas.toDataURL());
}

// Takes rectangle with props: x, y, width, height
function makeBlocks(rows, columns, rectangle){

	var height = rectangle.height/rows,
		width = rectangle.width/columns;

	for (row=0; row<rows; row++){
		for (column=0; column<columns; column++){
			if (!puzzle.pieces[row])	puzzle.pieces[row] = [];

			puzzle.pieces[row][column] = {
				x: width * column,
				y: height * row,
				width: width,
				height: height
			};

			puzzle.pieces[row][column].image = imageSlice(
				canvas[0],
				puzzle.pieces[row][column]
			);
			//drawBlock(puzzle.pieces[row][column], row, column);
		}
	}
}

function scrambleBlocks(){
	var randomLeft, randomTop;

	puzzle.pieces.forEach(function(row,rowIndex){
		row.forEach(function(piece, columnIndex){

			randomLeft = (Math.random()-0.5)*(piece.width*3);
			randomTop = (Math.random()-0.5)*(piece.height*3);
			piece.image.css({
				"left": randomLeft,
				"top": randomTop
			});

		});
	});
}

function drawBlock(piece, row, column){
	var div;

	if (!($('div.block-holder')[row])){
		div = $('<div class="block-holder"></div>');
		div.appendTo(puzzle.element);
	} else {
		div = $('div.block-holder')[row];
	}
	piece.image.load(function(){
		$(div).append(this);
		attachDrag(piece);
	});
}

function drawBlocks(){

	puzzle.pieces.forEach(function(row,rowIndex){
		row.forEach(function(piece, columnIndex){
			drawBlock(piece, rowIndex, columnIndex);
		});
	});
}

// Drag and drop


function attachDrag(piece){
	$(piece.image).draggable({ 
		snapMode: ".piece",
		stack: ".piece",
		start: function(event, ui){
			$(this).fadeTo('fast', 0.7);
			$(this).css({"outline": ""});
		},
		stop: function(event, ui){ 
			$(this).fadeTo('fast', 1.0);
			afterDrag(piece, event, ui); 
		},
		containment: $('body')
	});
}

function afterDrag(piece, event, ui){

	piece.currentX = ui.position.left;
	piece.currentY = ui.position.top;

	var snapWidth = piece.image[0].width/SNAP_MARGIN;
	var snapHeight = piece.image[0].height/SNAP_MARGIN;

	// Check if the piece is close to its correct spot, and snap it if so.
	if (Math.abs(piece.currentX) < snapWidth && Math.abs(piece.currentY)< snapHeight){
		$(piece.image).css({"outline": "none"});
		$(piece.image).css({"z-index": "1"});
		$(piece.image).css({
			"left": "auto", 
			"top": "auto"
		});
	} else {
		$(piece.image).css({"outline": ""});
	}

	if (complete() === true){
		$('div#winner').dialog({
			modal: true
		});
	}

}

function zoom(direction){
	var images = puzzle.element.find('img');


	if (direction === "in"){

			puzzle.pieces.forEach(function(row, rowIndex){
				row.forEach(function(piece, pieceIndex){
 
					piece.offsetX = parseFloat($(piece.image).css("left"));
					piece.offsetY = parseFloat($(piece.image).css("top"));
					piece.image[0].width *= (1.1);

					//piece.x = parseFloat($(piece.image).css("left"))*1.1;
					//piece.y = parseFloat($(piece.image).css("top"))*1.1;

					piece.image.css({
						"left": Math.round(piece.offsetX*1.1), 
						"top": Math.round(piece.offsetY*1.1)
					});

					//$(puzzle.element).find('img').eq(rowIndex*userSetRows + pieceIndex);

				});
			});


		// Scale each image
		/*images.each(function(index, element){
			element.width *= 1.1;
			$(element).css({
				"left": parseFloat($(this).css("left"))*1.1, 
				"top": parseFloat($(this).css("top"))*1.1
			});
		});*/


	// If direction === "out"
	} else {
		if ( ( $(images[0]).width()>20 ) && ( $(images[0]).height()>20 ) ){

			puzzle.pieces.forEach(function(row, rowIndex){
				row.forEach(function(piece, pieceIndex){


					piece.image[0].width /= 1.1;
					piece.offsetX = parseFloat($(piece.image).css("left"));
					piece.offsetY = parseFloat($(piece.image).css("top"));

					piece.image.css({
						"left": Math.round(piece.offsetX/1.1), 
						"top": Math.round(piece.offsetY/1.1)
					});

					//$(puzzle.element).find('img').eq(rowIndex*userSetRows + pieceIndex);

				});
			});
			/*images.each(function(index, element){
				element.width *= 0.9090909090909091;
				$(element).css({
					"left": parseFloat($(this).css("left"))*0.9090909090909091, 
					"top": parseFloat($(this).css("top"))*0.9090909090909091
				});
			});*/

		}
	}

	// change the position of the containing div 
	// so that it is always centred or taking up the entire space.
	puzzle.element.css({
		"left": ($(window).width() - puzzle.element.width())/2,
		"top": ($(window).height() - puzzle.element.height())/2
	});
}

function complete(){	
	var complete = true;
	puzzle.pieces.forEach(function(row,rowIndex){
		row.forEach(function(piece, columnIndex){
			if (!(piece.image.css("left") === "auto")){
				complete = false;
				return;
			}
			if (!(piece.image.css("top") === "auto")){
				complete = false;
				return;
			}
		});
	});
	return complete;
}




// end document.ready

});