 $(function(){
 	var loaded = [];
 	function video () {
 		window.scrollTo(0, 0);
		if(window.innerWidth < 992){
			$('video').each(function  (i) {
				$this = $(this);
	        	var newSrc = $this.children('source').attr('src').replace('.','_light.');
	        	$this.children('source').attr('src',newSrc);
	        	$this.load();
	        	$this.on('canplay',function  () {
	        		canPlay(this);
	        	});
			});
		}else{
			$('video').each(function  (i) {
				var $this = $(this);
				$this.on('canplay',function  () {
	        		canPlay(this);
	        	});
			});
		}
	}
	function canPlay (element) {
		console.log(element)
		var $video = $('video');
		loaded.push(element);
		if(loaded.length === $video.length){
			$('#loader').removeClass('loading');
			$('body').removeClass('noscroll');
		}
	}
	console.log('btoe')
	video();
}); 