var App = {
	$content: $('.content'),
	$form: $('.form-search'),
	userInput: '',
	userInputIsValid: false,
	apiKey: '3a0c38bc0fe818d552f634bafe5a271e',
	apiurl: 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=3a0c38bc0fe818d552f634bafe5a271e&per_page=10&format=json&nojsoncallback=1',
	apiurl_size: '',
	
	toggleLoading: function() {
		// Toggle loading indicator
		this.$content.toggleClass('content--loading');
		// Toggle the submit button to avoid double submissions
		this.$form.find('button').prop('disabled', function(i,v){return !v;});
	},
	validate: function() {
		this.userInputIsValid = true;
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
	request: function() {
		$.getJSON(this.apiurl, function(data) {
			var pics = data.photos.photo;
			for (var i = 0; i < pics.length; i++) {
				console.log(pics[i]);
				var image = new Image();
				image.src =  'https://farm' + pics[i].farm + '.staticflickr.com/' + pics[i].server + '/' + pics[i].id + '_' + pics[i].secret + '_q.jpg';
				$(".content").append(image);
			}
		});
		this.toggleLoading();
	},
	apiRequest: function() {
		$.getJSON(this.apiurl, function(json) {
			$.each(json.photos.photo, function(i, myresult) {
				this.apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=3a0c38bc0fe818d552f634bafe5a271e&photo_id="+myresult.id+"&format=json&nojsoncallback=1"
				$.getJSON(this.apiurl_size, function(size) {
					$.each(size.sizes.size, function(i, myresult_size) {
						if (myresult_size.width == 500) {
							$(".content").append(
								'<p><a href="'+myresult_size.url+'" target="_blank"><img src="'+myresult_size.source+'"/></a></p>'
							);
						}
					});
				});
			});
		});
		this.toggleLoading();
	}
};

$(document).ready(function() {
	// On page load, do this
	App.$form.on('submit', function(e) {
		// Prevent default form action: page refresh
		e.preventDefault();
		// Call the loading function
		App.toggleLoading();
		// Get user input
		App.userInput = $(this).find('input').val();
		// Validate input
		App.validate();

		if (App.userInputIsValid) {
			// App.apiRequest();
			App.request();
		}
	});
});


















