function t(){const e=document.getElementById("app");if(e)e.innerHTML=`<h1>Hello from Bun!</h1>
                         <p>The time is: ${(new Date()).toLocaleTimeString()}</p>`}setInterval(t,1000);document.addEventListener("DOMContentLoaded",t);
