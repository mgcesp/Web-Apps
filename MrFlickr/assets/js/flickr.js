var Flickr = {
	apiKey: '3a0c38bc0fe818d552f634bafe5a271e',
	apiUrl: 'https://api.flickr.com/services/rest/',

	buildPhotoUrl: function(photo) {
		return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
             '/' + photo.id + '_' + photo.secret + '.jpg';
   	},
};

$(document).ready(function() {

});