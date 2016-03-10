/*
   @version:  0.2
   @license:  GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
   @author:   Alden J. Curnutt
   @created:  15 SEP 2014
   @updated:  14 FEB 2015 by: Alden J. Curnutt
   @purpose:  operates navigation functions for WDCS
*/

$(document).ready(function() {
	navigation();
});

function navigation() { // Navigation function block

	$("#navLeft li").on('click', function() {
		javascript:history.go(0);
	});

	$(document).mouseup(function (e) { // slideUp all navigation if click out of nav
		var fullContainer = $("#full");
		var fullContainerNav = $("#navRight li");
		var minContainerNav = $("#hamenu li");
		var minContainer = $("#min");
		if ( !fullContainer.is(e.target) && !fullContainerNav.is(e.target) && fullContainer.has(e.target).length === 0 ) {
			fullContainer.children().stop().slideUp();
			fullContainerNav.removeClass('active');
		}
		if ( !minContainer.is(e.target) && minContainer.has(e.target).length === 0 ) {
			minContainer.children().stop().slideUp();
		}
	});

	$("#navRight li").on('click', function() { // roll up / down of full nav body
		var templi = $(this).text();
		$(this).toggleClass("active").siblings().removeClass('active');
		if ( templi === "ABOUT" ) { fullNav("#aboutFull"); }
		else if ( templi === "TOOLS" ) { fullNav("#toolsFull"); }
		else if ( templi === "CONTACT" ) { fullNav("#contactFull"); }
	});


	$("#hamenu li").on('click', function() { // slideToggle when hamenu menu is clicked
		$(this).toggleClass("backlit");
		$("#min li.minTitle").stop().slideToggle();
		console.log("its running");
	});

	$("#min li.minTitle").on('click', function() { // execute minNav() if minified menu elements are clicked
		var templi = $(this).attr("id");
		if ( templi === "aboutMin" ) { minNav("#aboutExpand"); }
		else if ( templi === "toolsMin" ) { minNav("#toolsExpand"); }
		else if ( templi === "contactMin" ) { minNav("#contactExpand"); }
	});

	function fullNav(fullUL) { // slideToggle func for full navigation
		$(fullUL).stop().slideToggle().siblings().stop().slideUp();
	}

	function minNav(minUL) { // slideToggle func for minified navigation
		$("#min li.minExpand").stop().slideUp();
		$(minUL).stop().slideToggle();	
	}

	$(window).resize(function(){ // If window size changes, roll up nav body
   		$("#navRight li").removeClass('active');
		$("#hamenu li").removeClass('backlit');
   		$("#full").children().css("display", "none");
   		$("#min li").css("display", "none");
	});
}