
console.log('just testing');

var socket = io.connect('http://linguistics.usask.ca');

socket.on('ready', function() {
  console.log('received ready');
  socket.emit('ok');
  getText('');
});

var getText = function(data) {
  console.log('in getText');
  var transport = {};
  transport['text'] = data;
  socket.emit('get', transport);
};

socket.on('text ready', function(text) {
  $('#myMain').html(text);
  $('a.myText').unbind('click').click( handleClick);
});

socket.on('dicInfo', function(text) {
  $('#myBottomInfo').html(text);
});

var handleClick = function(event) {
  console.log('click received');
  var i = parseInt(event.target.id);
  console.log('sending query for', i);
  socket.emit('query', i);
};

socket.on('info', function(word) {
 $('#myTopInfo').html('<h2>Info on: ' + word + '</h2>'); 
});

$('#LogIn').on('shown.bs.modal', function(e) {
  $('#email').focus();
  $('input').unbind('keyup').keyup(function(e) {checkField(e);});
});

var checkField = function(e) {
	console.log(e.target);
	console.log(e.target.id);
	console.log($(e.target).val());
	var re = undefined;
	var message = undefined;
	var id = undefined

	if (e.target.id === 'email') {
		re = /\S+@\S+\.\S+/;
		message = "Enter a valid email address";
		id = '#emailHelp';
	} 
	if (e.target.id === 'password') {
		re = /^\S{5,}$/;
		message = "Password too short. Spaces are not allowed";
		id = '#passwordHelp';
	} 


	if (re.test($(e.target).val())) {
		$(e.target).parents('.form-group').removeClass('has-warning');
		$(e.target).parents('.form-group').addClass('has-success');
		$(id).html('&nbsp;');
	} else {
		$(e.target).parents('.form-group').removeClass('has-success');
		$(e.target).parents('.form-group').addClass('has-warning');
		$(id).html(message);
	}
};

  /*
                console.log('modal displayed');
		$('.form-control').focus(function(element){
                        console.log(element.target);
			$(element).parents('.form-group').addClass('highlight');
		});
		$('.form-control').blur(function(element){
			$(element).parents('.form-group').removeClass('highlight');
		});
		
		$("#myForm").validate({ onkeyup : false, highlight : function(e) { $(e).parents('.form-group').addClass('has-error')}, success : function(e) { $(e).parents('.form-group').addClass('has-success')}});
});
                */

// $(document).ready(function() {
// });


	
