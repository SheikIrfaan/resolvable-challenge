$(document).ready(function () {

	var apiUrl = 'https://restapi.co.uk';
	var inviteCode = null;

	// Create invite
	$.ajax({
		url: apiUrl+'/api/invite/create',
		method: 'GET',
		dataType: "json"
	}).done(function(response) {
		if (!response.invite) {
			alert('Please try again later !');
			$('.container').remove();
			return false;
		}
		inviteCode = response.invite.code;
		$('.heading img').prop('src', response.invite.agent.picture_url);
		$('span.name').text(response.invite.agent.first_name+' '+response.invite.agent.last_name);
	});
    
	$('.btn-rating .btn').click(function(e){
		e.preventDefault();
		if (inviteCode === null) {
			return false;
		}
		var score = $(this).data('score');
		$.ajax({
			url: apiUrl+'/api/invite/'+inviteCode+'/rate',
			method: 'POST',
			data: {score: score},
			dataType: "json"
		}).done(function(response) {
			if (response.errors) {
				alert(response.message);
				$('.container').remove();
				return false;
			}
			$('.section').fadeOut(2, 'swing', function() {
				$('.comment').fadeIn(1000);
			});
		});
	});

	$('.comment button[type="submit"]').click(function(e){
		e.preventDefault();
		if (inviteCode === null) {
			return false;
		}
		var comment = $('#comment').val();
		$.ajax({
			url: apiUrl+'/api/invite/'+inviteCode+'/comment',
			method: 'POST',
			data: {comment: comment},
			dataType: "json"
		}).done(function(response) {
			if (response.errors) {
				alert(response.message);
				$('.container').remove();
				return false;
			}
			$('.section').fadeOut(2, 'swing', function() {
				$('.message').fadeIn(1000);
			});
		});
	});

});	