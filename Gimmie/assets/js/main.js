var Gimmie = {
	$content: $('.content'),
	$form: $('.form-search'),
	userInput: '',
	userInputIsValid: false,
	appID: '',

	toggleLoading: function() {
		// Toggle loading indicator
		this.$content.toggleClass('content--loading');
		// Toggle the submit button to avoid double submissions
		this.$form.find('button').prop('disabled', function(i,v){return !v;});
	},

	validate: function() {
		// Use regex to test if input is valid. It's valid if:
        // 1. It begins with 'http://itunes'
        // 2. It has '/id' followed by digits in the string somewhere
        var regUrl = /^(http|https):\/\/itunes/;
        var regId = /\/id(\d+)/i;
        if ( regUrl.test(this.userInput) && regId.test(this.userInput) ) {
            this.userInputIsValid = true;
            var id = regId.exec(this.userInput);
            this.appId = id[1];
        } else {
            this.userInputIsValid = false;
            this.appId = '';
        }
	},

	throwError: function(header, text) {
		// Remove animation class
		this.$content.removeClass('content--error-pop');
		// Trigger reflow
		this.$content[0].offsetWidth = this.$content[0].offsetWidth;
		// Add classes and content
		this.$content
			.html('<p><strong>' + header + '</strong> ' + text + '</p>')
			.addClass('content--error content--error-pop');
       	// Toggle loading
       	this.toggleLoading();
	},

	render: function(response) {
		// Create image element
		var icon = new Image();
		// Set image source from response
		icon.src = response.artworkUrl512;
		// When image loads
		icon.onload = function() {
			// Set html of $content to the image
			Gimmie.$content
				.html(this)
				// Append html element - After artwork image
				.append('<p><strong>' + response.trackName + '</strong></p>')
				// Remove class
				.removeClass('content--error');
			// Toggle loading - OFF
			Gimmie.toggleLoading();

			// If it's an iOS icon, load the soft edges mask too
			if (response.kind != 'mac-software') {
				var mask = new Image();
				mask.src = 'assets/img/icon-mask.png';
				// When mask loads
				mask.onload = function() {
					// Prepend html element - Before artwork image
					Gimmie.$content.prepend(this);
				}
			}
		}
	},

	apiRequest: function() {
		$.ajax({
			url: 'https://itunes.apple.com/lookup?id=' + Gimmie.appId,
			dataType: 'JSONP'
		})
		.done(function(response) {
			// Get the first element of the response
			var response = response.results[0];
			console.log(response);
			// Check that request is valid and contains the artwork info
			if (response && response.artworkUrl512 != null) {
				Gimmie.render(response);
			} else {
				// Throw error - Invalid data from response
				Gimmie.throwError(
					'Invalid Response',
					'The request you made appears to not have an associated icon. <br> Try a different URL.'
				);
			}
		})
		.fail(function(data) {
			// Throw error - API Error
			Gimmie.throwError(
				'iTunes API Error',
				'There was an error retrieving the info. Check the URL or try again later.'
				);
		})
	},
};

$(document).ready(function() {
	// On page load, do this
	Gimmie.$form.on('submit', function(e) {
		// Prevent default form action: page refresh
		e.preventDefault();
		// Toggle loading
		Gimmie.toggleLoading();
		// Get the value from the input field
		Gimmie.userInput = $(this).find('input').val();
		// Validate the input
		Gimmie.validate();
		if (Gimmie.userInputIsValid) {
			// Make API request
			Gimmie.apiRequest();
		} else {
			// Throw error - Invalid input
			Gimmie.throwError(
				'Invalid Link',
				'You must submit a standard iTunes link'
			);
		}
	})
});


























