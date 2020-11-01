var i = 0;
var num_of_items = 0;
var stop = false;
function startCheck(max)
{
	i++;
	
	//document.querySelectorAll('div.h-a-Kd.a-Hd-mb')[0];
	var bottom = document.querySelectorAll('div.h-a-Hd-mb.a-Hd-mb')[0];
	bottom.scrollIntoView();
	//scrollTo(scrollX,scrollY+1000); 
	console.log(i.toString());	
	
	var items = document.querySelectorAll('.a-d-na.a-d.webstore-test-wall-tile.a-d-zc.Xd.dd');
	var new_num_of_items = items.length;
	if (num_of_items != new_num_of_items)
	{
		num_of_items = new_num_of_items;
		console.log('Loaded items : ' + new_num_of_items);
	}	
	
	if (i>max || stop) 
	{
		i = 0;
		num_of_items = 0;
		stop = false;
		items[new_num_of_items-1].scrollIntoView(false);
		sortsort();
		return;
	}
	
	var t = setTimeout(function (){startCheck(max);}, 100);
}

var MAX_COUNT = 25;
var counter = 0;
function stopCheck()
{	
	var spin = document.querySelectorAll('div.h-a-Kd.a-Hd-mb')[0];	
	var state_new = spin.attributes.style.value == "display: none;"
	
	if (state_new)
		counter++;
	else
		counter=0;
	
	console.log('Counter : ' + counter);
	if (counter > MAX_COUNT)
	{
		counter = 0;
		stop = true;		
		return;
	}
	
	var t = setTimeout(function (){stopCheck();}, 100);
}

var sortsort = function() {

	var ab = document.querySelectorAll('.a-d-na.a-d.webstore-test-wall-tile.a-d-zc.Xd.dd');
	console.log(ab.length);
	var ab_arry = Array.from(ab);

	var index_str;
	var star_str;
	ab_arry.forEach((star) => {
		
		index_str = star.attributes.hasOwnProperty("index") ? Number(star.attributes.index.value.toString().replace(/,/g, '')) : 0
		star_str  = star.getElementsByClassName("nAtiRe").length > 0 ? Number(star.getElementsByClassName("nAtiRe")[0].textContent.toString().replace(/,/g, '')).toString() : "Not voted";

		console.log( index_str + " = >>>> " + star_str);		
	});

	ab_arry.sort(function (a,b) {
		var a_star =  a.getElementsByClassName("nAtiRe").length > 0 ? Number(a.getElementsByClassName("nAtiRe")[0].textContent.toString().replace(/,/g, '')) : 0;
		var b_star =  b.getElementsByClassName("nAtiRe").length > 0 ? Number(b.getElementsByClassName("nAtiRe")[0].textContent.toString().replace(/,/g, '')) : 0;
		
		return (b_star - a_star);	
	});


	let row_nodes = document.querySelectorAll('.h-a-x > [role="grid"] > [role="row"]');
	var row_nodes_arry = Array.from(row_nodes);
	var sr;

	for (var rr = 0; rr < row_nodes_arry.length; rr++)
	{	
		sr_start = rr * 3;
		
		var msg = rr.toString() + ' <--- ';
		for (var sr = sr_start; sr < sr_start + 3 && sr < ab_arry.length ; sr++)
		{
			msg += '1:' + sr + ' ';
			row_nodes_arry[rr].appendChild(ab_arry[sr]);
		}	
		console.log(msg);
	}

}

startCheck(3000);
stopCheck();
