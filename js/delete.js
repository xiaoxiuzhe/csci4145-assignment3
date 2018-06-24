
var usercontainer = document.getElementsByClassName('usercontainer');

//when clicked on user container, it will delete the user
for (i = 0; i < usercontainer.length; i++) {
	usercontainer[i].addEventListener('click', function(e){
		  if (e.target !== this)
			    return;
		var img = e.target.querySelector('.userimg').src;
		var id = e.target.querySelector('.id').innerHTML;
		var name = e.target.querySelector('.name').innerHTML;
//		console.log(img);
//		console.log(id);
//		console.log(name);
		
		var pieces =  img.split("/");
		var img_id = pieces[pieces.length-1].split(".")[0];
//		console.log(img_id)
		pieces =  id.split(": ");
		student_id = pieces[pieces.length-1].split(".")[0];
//		console.log(student_id)
		pieces =  name.split(": ");
		nickName = pieces[pieces.length-1].split(".")[0];
//		console.log(nickName)
		
		var formData = new FormData();
		formData.append('img_id', img_id);
		formData.append('student_id', student_id);
		formData.append('nickName', nickName);
		
		var xhr = new XMLHttpRequest();
		
	    xhr.open('DELETE', "http://localhost:8888/", true);
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=----7dd322351017c');
	    xhr.send(img_id + "#" + student_id +"#" + nickName);

	    xhr.onreadystatechange = function(e) {
	        if (xhr.readyState == 4 && xhr.status == 200) {
	        		alert("Image deleted, please refresh the page");
	        		load_js();
	            }
	        };
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