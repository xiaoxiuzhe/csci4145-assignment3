$('document').ready(function(){
	
	var size = "w_100,h_100,c_scale";
	
	var messageListRef = firebase.database().ref("users");
	messageListRef.once('value', function(snapshot) {
		  snapshot.forEach(function(childSnapshot) {
			
			//create a container in the home page that will display users' info
			var StudentID = childSnapshot.child("StudentID").val();
		    var Nickname = childSnapshot.child("Nickname").val();
		    var img = childSnapshot.child("img").val();
		    
		    var userContainer = document.createElement("div");
		    userContainer.className = "usercontainer";
		    
		    var pic = document.createElement("img");
    		//resize img
    		var array = img.split('/'); 
    		array.splice(-2, 0, size);
    		var output = array.join('/');
    		pic.src = output;
    		pic.className = "userimg";
    		
    		var ID = document.createElement("P");                      
    		var t1 = document.createTextNode("StudentID: " + StudentID);      
    		ID.appendChild(t1);                                        
    		ID.className = "id";
    		
    		var name = document.createElement("P");                     
    		var t2 = document.createTextNode("Nickname: " + Nickname);    
    		name.appendChild(t2);                                         
    		name.className = "name";
    		
    		userContainer.appendChild(pic);
    		userContainer.appendChild(ID);
    		userContainer.appendChild(name)
    		
    		document.getElementById("users").appendChild(userContainer);
    		load_js();
		  });
		});
});

//reload delete.js when an image is uploaded
function load_js()
{
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.src= 'js/delete.js';
   head.appendChild(script);
}