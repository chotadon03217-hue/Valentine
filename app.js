let photos=[
"assets/img1.jpg",
"assets/img2.jpg",
"assets/img3.jpg",
"assets/img4.jpg",
"assets/img5.jpg",
"assets/img6.jpg"
];

let i=0;

document.getElementById("yes").onclick=function(){
document.getElementById("ask").classList.add("hidden");
document.getElementById("gallery").classList.remove("hidden");
document.getElementById("music").play();
}

document.getElementById("no").onmouseover=function(){
this.style.position="absolute";
this.style.left=Math.random()*80+"%";
this.style.top=Math.random()*80+"%";
}

function nextPhoto(){
i++;
if(i>=photos.length){
document.getElementById("gallery").classList.add("hidden");
document.getElementById("final").classList.remove("hidden");
}
else{
document.getElementById("photo").src=photos[i];
}
}