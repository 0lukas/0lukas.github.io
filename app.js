function n(){s.clearRect(0,0,t.width,t.height),a.update(),d.update(),requestAnimationFrame(n)}function o(){t.width=window.innerWidth,t.height=window.innerHeight,a.resize(),d.resize()}var t=document.createElement("canvas"),s=t.getContext("2d");t.width=window.innerWidth;t.height=window.innerHeight;document.body.appendChild(t);document.body.style.margin="0";document.body.style.overflow="hidden";t.style.backgroundColor="#1a1a1a";class h{x;y;radius;angle;speed;color;side;constructor(e,r){this.radius=Math.min(t.width,t.height)*0.7,this.side=r,this.x=this.side==="left"?this.radius*0.5:t.width-this.radius*0.5,this.y=Math.random()*t.height,this.angle=Math.PI/2,this.speed=0.5,this.color=e}draw(){const e=s.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius);e.addColorStop(0,this.color.replace("1)","0.15)")),e.addColorStop(0.6,this.color.replace("1)","0.05)")),e.addColorStop(1,this.color.replace("1)","0)")),s.beginPath(),s.arc(this.x,this.y,this.radius,0,Math.PI*2),s.fillStyle=e,s.fill()}update(){if(this.y+=Math.sin(this.angle)*this.speed,this.x+=Math.cos(this.angle)*this.speed*0.2,this.y<this.radius*0.1||this.y>t.height-this.radius*0.1)this.angle=-this.angle;if(this.side==="left")this.x=Math.max(this.x,this.radius*0.5),this.x=Math.min(this.x,t.width*0.4);else this.x=Math.max(this.x,t.width*0.6),this.x=Math.min(this.x,t.width-this.radius*0.5);this.angle+=(Math.random()-0.5)*0.02,this.draw()}resize(){this.radius=Math.min(t.width,t.height)*0.7,this.x=this.side==="left"?this.radius*0.5:t.width-this.radius*0.5,this.y=Math.min(Math.max(this.y,this.radius*0.1),t.height-this.radius*0.1)}}var a=new h("rgba(65, 105, 225, 1)","left"),d=new h("rgba(255, 0, 0, 1)","right");n();var i=document.createElement("div");i.style.position="fixed";i.style.top="50%";i.style.left="50%";i.style.transform="translate(-50%, -50%)";i.style.fontSize="64px";i.style.zIndex="1";i.textContent="\uD83E\uDD28";document.body.appendChild(i);window.addEventListener("resize",o);