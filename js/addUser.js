var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/shawnx';
var CLOUDINARY_UPLOAD_PRESET = 'cxbjl5br';

function addUser(){
    var file = document.getElementById("file-upload").files[0];
    var id = document.getElementById("StudentID").value;
    var nickname = document.getElementById("nickName").value;
    
//    console.log(id + " " + nickname);
    
    if(file == null || id == "" || nickname == ""){
        alert("Please fill out all information ");
        return false;
    }
    
    var idPattern = new RegExp("^[0-9]{3}$");
    if (!idPattern.test(id)) {
        alert("Student ID must be 3 digit number");
        return false;
    }
    
    var nickNamePattern = new RegExp("^[A-Za-z]{6}$");
    if (!nickNamePattern.test(nickname)) {
        alert("Nickname must be 6 alphabetic characters");
        return false;
    }
    
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    var xhr = new XMLHttpRequest();

    //add user to the firebase when image is stored in cloudinary
    xhr.onreadystatechange = function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
    	alert("User added, please refresh the page")
		var response = JSON.parse(xhr.responseText);
		var url = response.secure_url;
		  var messageListRef = firebase.database().ref("users");
		  var newMessageRef = messageListRef.push();
		  newMessageRef.set({
		    'StudentID': id,
			'Nickname': nickname,
			'img' : url
		  });
		load_js();
        }
    };
    
    //send the POST request to upload the image to cloudinary
    xhr.open('POST', CLOUDINARY_URL + "/upload", true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(formData);

}


//reload delete.js when an image is uploaded
function load_js()
{
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.src= 'js/delete.js';
   head.appendChild(script);
}