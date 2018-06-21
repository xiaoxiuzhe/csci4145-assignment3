
var usercontainer = document.getElementsByClassName('usercontainer');

//when clicked on user images, it will delete the user
for (i = 0; i < usercontainer.length; i++) {
	usercontainer[i].addEventListener('click', function(event){
		var url = event.target;
		console.log(url);
		
//		var pieces =  url.split("/");
//		var img_id = pieces[pieces.length-1].split(".")[0];
//		console.log(img_id)
//		
//		var formData = new FormData();
//		formData.append('img_id', img_id);
//		
//		var xhr = new XMLHttpRequest();
//		
//	    xhr.open('DELETE', "http://localhost:8888/", true);
//	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//	    xhr.send(img_id);
//	    
//	    xhr.onreadystatechange = function(e) {
//	        if (xhr.readyState == 4 && xhr.status == 200) {
//	        		alert("Image deleted, please refresh the page");
//	        		load_js();
//	            }
//	        };
//	        
	});
}

//reload delete.js when an image is uploaded
function load_js()
{
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.src= 'js/delete.js';
   head.appendChild(script);
}