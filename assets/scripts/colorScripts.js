/*
   @version:  0.2
   @license:  GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
   @author:   Alden J. Curnutt
   @created:  15 SEP 2014
   @updated:  15 FEB 2015 by: Alden J. Curnutt
*/

$(document).ready(function() {
	tabs.activate();
	tabs.convertHandler();
	dynamic.change();
	palette.options();
	palette.tabOptions();
	palette.creativeXfer();
});

tabs = { // Tab object handles all tab functions
	activate: function(hashVal) {
		if ( hashVal == undefined ) { // Default Tabs handler
			$('li').on('click', function(e) {
				var sourceTab = $(this);
				var activeValue = sourceTab.attr('value');
				if ( activeValue != undefined  && activeValue.indexOf('#') != -1 ) {
					sourceTab.addClass('active').siblings().removeClass('active');
					$('div' + activeValue).addClass('active').siblings().removeClass('active');
				}
				e.preventDefault();
			});
		}
		else if ( hashVal != undefined ) { // Activates corresponding tab with hashVal defined; e.g. '#tab1'
			var manualTab = $('li[value=' + hashVal + ']');
			manualTab.addClass('active').siblings().removeClass('active');
			$('div' + hashVal).addClass('active').siblings().removeClass('active');
		}
	},
	convertHandler: function() {
		$("#tab5 tr td input").keypress(function(e) {
			if ( e.keyCode === 13 ) { convert.toHex(); } 
		});
		$("#tab6 tr td input").keypress(function(e) {
			if ( e.keyCode === 13 ) { convert.toRgb(); }
		});
	}
} // End 'tabs' object


dynamic = { // Dynamic object handles requests to access dynamic color input
	update: function(colorType) { // Updates the 'Modify' button under 'CONVERT' tab
		if ( colorType === "hex" ) {
			$('#toHexCreative').show();
		}
		else if ( colorType === "rgb" ) {
			$('#toRgbCreative').show();
		}
	},

	change: function() { // Hide convert to dynamic input button when value changes
		$('#rToHex').change(function() { $('#toHexCreative').hide(); });
		$('#gToHex').change(function() { $('#toHexCreative').hide(); });
		$('#bToHex').change(function() { $('#toHexCreative').hide(); });
		$('#toRgbInput').change(function() { $('#toRgbCreative').hide(); });
		$('#creativeReset').on('click', function() {
			for ( var i = 1; i <= 5; i++ ) {
				document.getElementById('color' + i).color.fromString($("#color" + i).attr('value').split('#')[1]);
			}
			$('.creativeTitle').html('Creative Palette: <span>Default</span>');	
		});
	},

	single: function(colorType) { // Grab result from 'Convert' tab and send to 'Dynamic' tab for input
		if ( colorType === "hex" ) {
			var creativeHexVar = $('#HEXPreview').text().split("#")[1];
			tabs.activate('#tab1');
			document.getElementById('myColor').color.fromString(creativeHexVar);
		}
		else if ( colorType === "rgb" ) {
			var h = $("#toRgbInput").val();
			if ( h.indexOf("#") != -1 ) { // Strip '#' if present in the HEX code
				h = h.split("#")[1];
			}
			tabs.activate('#tab1');
			document.getElementById('myColor').color.fromString(h);
		}
	}
} // End 'dynamic' object


palette = { // Palette Object handles all palette functions

	options: function() { // Builds options under palette selector
		for ( var i = 0; i < colorsArray.length; i++ ) {
			var option = "<option>" + colorsArray[i].title + "</option>";
			$("#colorSelect").append(option);
		}
	},

	select: function() { // Filters on the selected color option
		var filter = $( "option:selected", $("#colorSelect") ).html();

		if ( filter === "See All Color Palettes" ) { // Display all palettes
			palette.clear();
			palette.all(filter);
		}
		else { // Display single selected palette
			palette.clear();
			palette.single(filter);
		}
	},

	clear: function() { // Clears the default palette table container
		$('#paletteTable').empty();
	},

	testContrast: function(hex) { // Tests 'lightness' / 'darkness' & returns integer
		// hex var passed without '#'
		var r = parseInt( (cutHex(hex) ).substring(0,2),16);
		var g = parseInt( (cutHex(hex) ).substring(2,4),16);
		var b = parseInt( (cutHex(hex) ).substring(4,6),16);
		function cutHex(h) { return ( h.charAt(0)=="#" ) ? h.substring(1,7):h; }
		var darkness = ( (r*299) + (g * 587) + (b*114) ) / 1000;
		return darkness;
	},

	tabOptions: function() { // Handles 'dynamic' / 'conversion' requests per single palette color
		splitID = '';
		$('#paletteTable').on("click", "td.tabOptions", function() {
			splitID = $(this).attr('id').split('-');
			selector = $('#' + splitID[0]);
			console.log(selector)
			tdHexValue = selector.text();
			if ( splitID[1] === 'dyn' ) {
				tabs.activate('#tool-dynamic');
				document.getElementById('myColor').color.fromString(tdHexValue);
			}
			else if ( splitID[1] === 'con' ) {
				tabs.activate('#tool-convert');
				tabs.activate('#tab6');
				$('#toRgbInput').val(tdHexValue);
				convert.toRgb(tdHexValue);
			}
		});

		$('#paletteTable').on('click', 'tr.paletteRow', function() {
			var filter = $(this).attr('value');
			$('#colorSelect').val("Select a color palette!");
			palette.single(filter);

		});
	},

	single: function(filterVal) { // Builds single palette requests
		palette.clear();
		var dID = 1;
		var singleTableString = "<tr class='paletteColor'></tr> \
								 <tr id='paletteOptions' class='paletteOptions'> \
									<td id='D1-dyn' class='tabOptions trans2'><i class='fa fa-gears trans2'></i></td><td id='D1-con' class='tabOptions trans2'><i class='fa fa-refresh trans2'></i></td> \
									<td id='D2-dyn' class='tabOptions trans2'><i class='fa fa-gears trans2'></i></td><td id='D2-con' class='tabOptions trans2'><i class='fa fa-refresh trans2'></i></td> \
									<td id='D3-dyn' class='tabOptions trans2'><i class='fa fa-gears trans2'></i></td><td id='D3-con' class='tabOptions trans2'><i class='fa fa-refresh trans2'></i></td> \
									<td id='D4-dyn' class='tabOptions trans2'><i class='fa fa-gears trans2'></i></td><td id='D4-con' class='tabOptions trans2'><i class='fa fa-refresh trans2'></i></td> \
									<td id='D5-dyn' class='tabOptions trans2'><i class='fa fa-gears trans2'></i></td><td id='D5-con' class='tabOptions trans2'><i class='fa fa-refresh trans2'></i></td> \
								 </tr> \
								 <tr class='paletteTitleWrap'> \
									<td colspan='7' class='paletteTitle'></td> \
									<td colspan='3' class='creativeButton trans2'> Creative </td> \
								 </tr>"
		$('#paletteTable').append(singleTableString);
		for ( var i = 1; i <=5; i++) { // Builds D1 - D5 td's
			$('.paletteColor').append("<td id='D" + i + "' class='paletteCell' colspan='2'></td>")
		}
		for ( var j = 0; j < colorsArray.length; j++ ) { // Fills out D1 - D5 td's
			if ( colorsArray[j].title === filterVal ) {
				for ( var colorKey in colorsArray[j] ) {
					if ( colorsArray[j][colorKey].indexOf("#") != -1 ) {
						var hexColor = colorsArray[j][colorKey];
						var tempTD = $('#D' + dID);
						var darkness = palette.testContrast( hexColor.split('#')[1] );
						if ( darkness >= 128 ) {
							tempTD.html(hexColor);
							tempTD.css({'background-color' : hexColor, 'color' : '#222'});
						}
						else {
							tempTD.html(hexColor);
							tempTD.css({'background-color' : hexColor, 'color' : '#E1E6E6'});
						}
						$('.paletteTitle').html( colorsArray[j].title );
						$('.creativeButton').attr( 'value', colorsArray[j].title );
						dID++;
					} 
				}				
			}
		}
	},

	all: function() { // Displays all palettes in 'paletteTable' table, one palette per row
		for ( var i = 0; i < colorsArray.length; i++ ) {
			var allTableString = "<tr class='paletteRow' value='" + colorsArray[i].title + "'> \
									<td class='paletteCell' style='background-color: " + colorsArray[i].color1 + "'> \
									<td class='paletteCell' style='background-color: " + colorsArray[i].color2 + "'> \
									<td class='paletteCell' style='background-color: " + colorsArray[i].color3 + "'> \
									<td class='paletteCell' style='background-color: " + colorsArray[i].color4 + "'> \
									<td class='paletteCell' style='background-color: " + colorsArray[i].color5 + "'> \
								  </tr> \
								  <tr class='paletteTitleWrap paletteRow' value='" + colorsArray[i].title + "'> \
								  	<td colspan='5'>" + colorsArray[i].title + "</td> \
								  </tr> \
								  <tr class='paletteSpacer'></tr>";
			$('#paletteTable').append(allTableString);
		}
	},

	creativeXfer: function() { // Grab entire palette w/ values and send to 'Creative' tab
		var colorIndex = '';
		$('#paletteTable').on('click', 'td.creativeButton', function() {
			var filter = $(this).attr('value');
			for ( var colorKey in colorsArray ) {
				if ( colorsArray[colorKey].title === filter ) {
					colorIndex = colorsArray.indexOf( colorsArray[colorKey] );
				}
			}
			tabs.activate('#tool-creative');
			for ( var i = 1; i <= 5; i++ ) {
				document.getElementById('color' + i).color.fromString(colorsArray[colorIndex]["color" + i].split('#')[1]);
			}
			$('.creativeTitle').html('Creative Palette: <span>' + colorsArray[colorIndex].title + '</span>');
		});
	}

} // End 'palette" object'


convert = { // Grab, clean, verify and convert hex value and pass for output
	toRgb: function(hexCode) { // Intake hex string, clean, verify and pass for output
		if ( hexCode ) { // Test if hexCode was passed to func
				var h = hexCode;
			}
		else { // If no hexCode, grab value from input
			var h = $("#toRgbInput").val();	
		}
		if ( h.indexOf("#") != -1 ) { // Strip '#' if present in the HEX code
			h = h.split("#")[1];
		}
		if ( h.length == 3 ) { // check code length for 3 chars
			var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#' + h);
			if ( isOk ) { // if code is 3 chars, do stuff
				var longHexVal = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
				// Call func to convert to R,G & B values
				var R = convert.hexToR(longHexVal);
				var G = convert.hexToG(longHexVal);
				var B = convert.hexToB(longHexVal);
				convert.buildRGBElements(R, G, B);
				$('#toRgbInput').val( '#' + h.toUpperCase() );
			}
			else { // Alert: code doesn't haz 0-9 and/ or A-F stuff
				alert("#" + h + ": Invalid code \nError: Invalid Value")
			}
		}
		else if ( h.length == 6 ) { // Check code length for 6 chars
			var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#' + h);
			if ( isOk ) {
				var R = convert.hexToR(h);
				var G = convert.hexToG(h);
				var B = convert.hexToB(h);
				convert.buildRGBElements(R, G, B);
				$('#toRgbInput').val( '#' + h.toUpperCase() );			
			}
			else { // Alert: code doesn't haz 0-9 and/ or A-F stuff
				alert("#" + h + ": Invalid code \nError: Invalid Value")
			} 
		}
		else { // Err if code is not 3 or 6 chars long
			alert("#" + h + ": Invalid code \nError Reason: Value Length")
		}
	},


	buildRGBElements: function(red, green, blue) { // receive rgb value and append to DOM
		var colorStyle = "";
		$("#R").html(red);
		$("#G").html(green);
		$("#B").html(blue);
		colorStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
		$("#RGBPreview").html("<p>" + colorStyle + "</p>").css("background-color", colorStyle);
		var darkness = ((red*299)+(green*587)+(blue*114))/1000;
		if ( darkness >= 128 ) {
			$("#RGBPreview").css("color", "#000");		
		}
		else {
			$("#RGBPreview").css("color", "#FFF");	
		}
		dynamic.update("rgb");	
	},


	toHex: function() { // Grab, clean, verify and convert rgb value and pass for output
		var red = Math.floor( $("#rToHex" ).val());
		var green = Math.floor( $("#gToHex" ).val());
		var blue = Math.floor( $("#bToHex" ).val());
		if ( isNaN(red) || isNaN(green) || isNaN(blue) ) { // Check if rgb int is a number
			alert("Invalid code \nError Reason: One or more values is not valid");
			$("#rToHex").focus();
		}
		else if ( red > 255 || green > 255 || blue > 255 ) { // Check if rgb int is greater than 255
			alert("Invalid code \nError Reason: one or more numbers is greater than 255");
			$("#rToHex").focus();
		}
		else if (red < 0 || green < 0 || blue < 0 ) { // Check if rgb int is less than 0
			alert("Invalid code \nError Reason: one or more numbers is negative...");
			$("#rToHex").focus();
		}
		else { // if int is valid, 
			var hexCode = convert.numToHex(red) + convert.numToHex(green) + convert.numToHex(blue);
			convert.buildHEXElements(hexCode);
		}
	},


	buildHEXElements: function(hexCode) { // receive hex value and append to DOM
		var darkness = palette.testContrast(hexCode);
		var hex = hexCode;
		$("#HEXPreview").html("#" + hexCode).css("background-color", "#" + hexCode);
		if ( darkness >= 128 ) {
			$("#HEXPreview").css("color", "#000");		
		}
		else {
			$("#HEXPreview").css("color", "#FFF");	
		}
		dynamic.update("hex");
	},


	numToHex: function(n) { // Receive value and convert to hex string
		if ( n == 0 ) return "00";
	 	n = Math.max( 0,Math.min(n,255 ));
	 	return "0123456789ABCDEF".charAt( (n-n%16)/16 ) + "0123456789ABCDEF".charAt( n%16 );
	},


	// Function block used in parsing hex string into rgb strings
	hexToR: function(h) { return parseInt( (convert.cutHex(h) ).substring(0,2),16); },
	hexToG: function(h) { return parseInt( (convert.cutHex(h) ).substring(2,4),16); },
	hexToB: function(h) { return parseInt( (convert.cutHex(h) ).substring(4,6),16); },
	cutHex: function(h) { return ( h.charAt(0)=="#" ) ? h.substring(1,7):h; }

} // End 'convert' object
