/*
g = getElementById
f = fill()
sh = scatter-holder (id on a dom element)
sf = scatter floated (class on scattered elements)
s = global scatter object
  s.a = angle
  s.d = doChildrenHaveText
  s.tO topOffset
  s.lO leftOffset
  s.f floatAway
  s.s setup
p = position method
r = removeNode
d = document
m = node is type text
all return values that used to return false now return nothing
t = true
j = global var
v='nodeName'
y=body
z='style'

*/

var a=0,
c = function(n,i){
	if (i||i==0){
		return n[w][i];
	}
	return n[w];
},
d = document,
g = function(id){return d.getElementById(id);},
j,
k=Math,
m = function(n){return n[v].match(/#text/);},
o = function(n){
	if (!n){return [0,0];}
	j = o(n.offsetParent);
	return [n.offsetTop + j[0],n.offsetLeft+j[1]];	
},
p = function (n,t,l,p){	
	n[z].position = 'absolute';
	n[z].top=t;
	n[z].left=l;
},
q = 'parentNode',
r = function(n){n[q].removeChild(n)},
t=true,
u='px',
v='nodeName',
w='childNodes',
y=d.body,
z='style',
s = {
	d: function(n){
		if (!m(n)){
			j = c(n);
			for(var i=0;i<j.length;i++){
				if (m(j[i]) && j[i].nodeValue.match(/\w/)){
					return t;
				}
				if (s.d(j[i])){return t;}
			}
		}
	},
	f: function(n){
		j = o(n);
		p(n,j[0]+u,j[1]+u)
		r(n);
		y.appendChild(n);
		a = (a+.2)%360;
		l=function(n,t,l){
			return function(){
				p(n,(parseFloat(n[z].top)+t*5)+u,(parseFloat(n[z].left)+l*5)+u);
			}
		}(n,k.sin(a),k.cos(a));
		setInterval(l,10);
	},
	h: function (e){
		var t=e.target;
		if (!t[v].match(/BODY|HTML/)){
			while (c(t[q]).length==1){
				t=t[q];
			}
			s.f(t);
		}
	}
},
f = function(n,i){
	if (i++<21){
		j = '<tr><td>O<td>O';
		n.innerHTML = "<table border=1>"+j+j+j;
		f(c(c(c(c(n,0),0),1),1),i);
	}
};
d.onmouseover = s.h;
f(y,0);