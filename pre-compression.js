var scatter = {
	angle:0,
	doChildrenHaveText: function(n){
		if (n.nodeName.match(/SCRIPT|LINK|STYLE/)){
			n.parentNode.removeChild(n);
			return false;
		}
		if (n.nodeName.match(/#text/)){return false;}
		var c = n.childNodes;
		for(var i=0;i<c.length;i++){
			if (c[i].nodeName.match(/#text/) && c[i].nodeValue.match(/[^ \t\n]+/)){
				//console.log(c[i] + ' is a text node');
				return true;
			}
			if (this.doChildrenHaveText(c[i])){return true;}
		}
		return false;
	},
	topOffset: function(n){
		if (!n){return 0;}
		return n.offsetTop + this.topOffset(n.offsetParent);	
	},
	leftOffset: function(n){
		if (!n){return 0;}
		return n.offsetLeft + this.leftOffset(n.offsetParent);	
	},
	floatAway: function(n){
		
		var l = this.leftOffset(n);
		var t = this.topOffset(n);
		n.style.position='absolute';
		n.style.top=t+'px';
		n.style.left=l+'px';
		n.className='scatter-floated';
		n.parentNode.removeChild(n);
		document.getElementById('bubble-holder').appendChild(n);
		this.angle = (this.angle+.25)%360;
		var l =(function(n,tdif,ldif){
			return function(){
				n.style.top = (parseFloat(n.style.top)+(tdif*5))+'px';
				n.style.left = (parseFloat(n.style.left)+(ldif*5))+'px';
			}
		})(n,Math.sin(this.angle),Math.cos(this.angle));
		setInterval(l,10);
	},
	handleEvent: function (e){
		var t=e.target;
		if (t.nodeName.match(/BODY|HTML/)){return;}
		if (!t.btdt){t.btdt=0;}
		t.btdt++;
		if (t.btdt>4){
			console.log(t.nodeName);
			this.floatAway(t);
			return;
		}
		if (t.nodeName.match(/#text/)){return;}
		if (t.className=='scatter-floated'){return;}

		//if I have some children with text nodes in them, return
		var c = t.childNodes;
		for(var i=0;i<c.length;i++){
			if (this.doChildrenHaveText(c[i])){return;}
		}

		//if I'm my parents only child, rise up!
		while (t.parentNode.childNodes.length==1){
			//console.log('rising to parent');
			t=t.parentNode;
		}

		//detach and float away
		//t.parentNode.removeChild(t);
		this.floatAway(t);
	},
	setup: function(){
		var d= document.createElement('div');
		d.style.position='absolute';
		d.style.top=0;
		d.style.left=0;
		d.id='bubble-holder';
		document.getElementsByTagName('body')[0].appendChild(d);
	}
	
};

scatter.setup();
document.onmouseover = function(e){scatter.handleEvent(e)};

var fill = function(n,c){
	if (c++>2){return;}
	n.innerHTML = "<table border='1'><tr><td>O</td><td>O</td><td>O</td></tr><tr><td>O</td><td>O</td><td>O</td></tr><tr><td>O</td><td>O</td><td>O</td></tr></table>";
	fill(n.childNodes[0].childNodes[0].childNodes[0].childNodes[0],c);
	fill(n.childNodes[0].childNodes[0].childNodes[0].childNodes[2],c);
	fill(n.childNodes[0].childNodes[0].childNodes[1].childNodes[1],c);
	fill(n.childNodes[0].childNodes[0].childNodes[2].childNodes[0],c);
	fill(n.childNodes[0].childNodes[0].childNodes[2].childNodes[2],c);
	
};

fill(document.getElementById('fill'),0);
