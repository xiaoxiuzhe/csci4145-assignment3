$('document').ready(function(){
	
	var size = "w_100,h_100,c_scale";
	
	var messageListRef = firebase.database().ref("users");
	messageListRef.once('value', function(snapshot) {
		  snapshot.forEach(function(childSnapshot) {
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
    		
    		var ID = document.createElement("P");                       // Create a <p> element
    		var t1 = document.createTextNode("StudentID: " + StudentID);      // Create a text node
    		ID.appendChild(t1);                                          // Append the text to <p>
    		
    		var name = document.createElement("P");                       // Create a <p> element
    		var t2 = document.createTextNode("Nickname: " + Nickname);      // Create a text node
    		name.appendChild(t2);                                          // Append the text to <p>
    		
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