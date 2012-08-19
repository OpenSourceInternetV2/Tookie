var page = 1;

$(window).scroll(function()
{
    if($(window).scrollTop() >= ($(document).height() - $(window).height()) - 10)
    {
        $('div#loader').show();
        var ajaxUrl = "";
        if ($('#findKeywords').val() != undefined){
	        ajaxUrl = "/api/findMoviesPaginated/" + $('#findKeywords').val() + "/" + page * 30 + "/30";
    	}else{
    		ajaxUrl = "/api/getPaginated/" + page * 30 + "/30";
    	}

    	$.ajax({
		        url: ajaxUrl,
		        success: function(html)
		        {
		            if(html)
		            {
		            	page++;

		            	$("#contentHolder").append("<div class='pageSpace'> Page " + page + "</div>");
		                $("#contentHolder").append(html);
		                $('div#loader').hide();
		            }else
		            {
		                $('div#loader').html("<div class='pageSpace'>No more movies to show.</div>");
		            }
		        }
	        });
    }
});

var toTitleCase = function(str){
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$(document).ready(function() {

	var $qtab = $('#qualitytab');
	var $gtab = $('#genretab');
	var $ttab = $('#titletab');

	var redirectToFind = function(keywords){
		$(location).attr('href', 'http://localhost:3000/find/' + keywords);
	};
	

	$(".searchBox").keypress(function(e) {
	    if(e.which == 13) {
	        redirectToFind(toTitleCase($(".searchBox").val()));
	    }
	});

	$("#searchicon").click(function(event) {
        redirectToFind(toTitleCase($(".searchBox").val()));
    });
    /*

	var showTab = function(tab){
		$('.quality').removeClass('active');
		$('.genre').removeClass('active');
		$('.title').removeClass('active');

		$qtab.addClass('hidden');
		$gtab.addClass('hidden');
		$ttab.addClass('hidden');

		if (tab == 'quality'){
			$('.quality').addClass('active');
			$('.main').css('height', '40px');
			$qtab.removeClass('hidden');
		}
		if (tab == 'genre'){
			$('.genre').addClass('active');
			$('.main').css('height', '40px');
			$gtab.removeClass('hidden');
		}
		if (tab == 'title'){
			$('.title').addClass('active');
			$('.main').css('height', '40px');
			$ttab.removeClass('hidden');
		}
	}

    $('.quality').click(function(){
    	if ($qtab.hasClass('hidden')){
    		showTab('quality');
    	}
    });

    $('.genre').click(function(){
    	if ($gtab.hasClass('hidden')){
    		showTab('genre');
    	}
    });

    $('.title').click(function(){
    	if ($ttab.hasClass('hidden')){
    		showTab('title');
    	}
    });
*/
});