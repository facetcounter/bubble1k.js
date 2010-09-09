//my aborted attempt to get the recursive table creation into a tweet

f=function(n,i){
	var c = function(n,i){
			return n.childNodes[i];
	}
	if (i++<21){
		j = '<tr><td>O<td>O';
		n.innerHTML = "<table border=1>"+j+j+j;
		f(c(c(c(c(n,0),0),1),1),i);
	}
};
f(document.body,0);