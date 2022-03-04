// NORTH

for (i=13; i>0; i--){
	document.write("<div id='above'>");
	for (j=34; j>0; j--){
	
		document.write("<a href='http://imgs.xkcd.com/clickdrag/" + i + "n" + j + "w.png'><img src='http://imgs.xkcd.com/clickdrag/" + i + "n" + j + "w.png' width='50px' height='50px' /></a>");
	
	}
	
	for (j=1; j<50; j++){
	
	document.write("<a href='http://imgs.xkcd.com/clickdrag/" + i + "n" + j + "e.png'><img src='http://imgs.xkcd.com/clickdrag/" + i + "n" + j + "e.png' width='50px' height='50px' /></a>");
	
	}
	
	document.write("</div>");
	
	
}

// SOUTH
for (i=0; i<21; i++){
	document.write("<div id='below'>");
	for (j=34; j>0; j--){
	
		document.write("<a href='http://imgs.xkcd.com/clickdrag/" + i + "s" + j + "w.png'><img src='http://imgs.xkcd.com/clickdrag/" + i + "s" + j + "w.png' width='50px' height='50px' /></a>");
	
	}
	
	for (j=1; j<50; j++){
	
	document.write("<a href='http://imgs.xkcd.com/clickdrag/" + i + "s" + j + "e.png'><img src='http://imgs.xkcd.com/clickdrag/" + i + "s" + j + "e.png' width='50px' height='50px' /></a>");
	
	}
	
	document.write("</div>");
}
//http://imgs.xkcd.com/clickdrag/2n1w.png
