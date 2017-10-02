/**
* @Author: gyanl, ananayarora, colllnwalkr
* @Date:   2017-10-01T09:56:56+05:30
* @Last modified by:   saxten2011
* @Last modified time: 2017-10-01T20:00:14+05:30
*/

var newColour = [];
var format = 'hex';
var currentColor = 0;
var numButtons = 6;
var listOfIndexes = [0,1,2,3,4,5];
var orientations = ['bottom', 'left', 'top', 'right'];
var orientationArrows = ['&#x2193;', '&#x2190;', '&#x2191;', '&#x2192;'];
var orientation = 0;

function synchronize() {
    function synchronizeList(index) {
        if(index === currentColor) {
            document.getElementById("c" + index).classList.add("focus");
        }
        else {
            document.getElementById("c" + index).classList.remove("focus");
        }
    }

    listOfIndexes.forEach(synchronizeList);
}

function clearFocus() {
    function removeFocus(index) {
        document.getElementById("c" + index).classList.remove("focus");
    }

    listOfIndexes.forEach(removeFocus);
}

function changeColorFormat() {
    format = document.querySelector('input[type="radio"]:checked').value;
}

function genColor() {
    var a = "";
    for (var i = 0; i < 3; i++)
        a = a.concat(Math.floor(Math.random() * 255).toString(16));

    if (a.length < 6) {
        for (var i = 0; i < (6 - a.length); i++)
            a = "0" + a;
    }
    return "#" + a;
}

// Returns either a single color, or a gradient definition
function colorString(color, fullStyle) {
    if (!color) {
        return '';
    }
    var colors = color.split(',');
    switch (colors.length) {
        case 0: return '';
        case 1: return formatColor(color);
        case 2:
            var grad = 'linear-gradient(to ' + orientations[orientation] + ', ' + formatColor(colors[0]) + ', ' + formatColor(colors[1]) + ')';
            if (fullStyle) {
                grad = 'background: ' + formatColor(colors[0]) + '; /* fallback for old browsers */ <br>' +
                    'background: -webkit-' + grad + '; /* Chrome 10-25, Safari 5.1-6 */ <br>' +
                    'background: ' + grad + '; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ <br><br><br>';
            }
            return grad;
    }
}

function rotate(deg) {
    orientation = (orientation + 1) % orientations.length;
    document.getElementById('direction').innerHTML = orientationArrows[orientation];
    synchronize();
    updateUI(new_color);
}

function changeColour(num, gradient) {
    if (num !== -1) {
        currentColor = num;
        new_color = newColour[num];
        synchronize();
        //outline();  either use the fn or just write the code here.
    } else {
        new_color1 = genColor();
        new_color2 = genColor();
        newColour.unshift(new_color1 + (gradient ? ',' + new_color2 : ''));
        currentColor = 0;
        for (var i = 0; i < 6; i++) {
            var div_id = "c" + (i);
            document.getElementById(div_id).style.background = colorString(newColour[i]);
            document.getElementById('c0').focus();
        }
        new_color = newColour[0];
        clearFocus();
    }
    updateUI(new_color);
}

function updateUI(color){
	//made style a var reachable by all if statements //
    var style = colorString(color);
    document.getElementById('generate').style.background = style;
    document.getElementById('rotate').style.background = style;

    if(color){
        document.body.style.background = style;
        document.getElementById('clipboard').style.background = style;
        document.getElementById('gradient').style.background = style;
        document.getElementById('copyall').style.background = style;
        document.getElementById('solid').style.background = style;
        document.getElementById('clipboard').setAttribute("data-clipboard-text", colorString(color, true));
    }
}

function formatColor(color) {
    color = convertColor(color, format);
    return color;
}

function toast(yo) {
    synchronize();
    var style = colorString(newColour[currentColor], true);
    yo.setAttribute("data-clipboard-text", style);
    document.getElementById("toast").innerHTML = yo.getAttribute("data-clipboard-text") + " copied to clipboard.";
    copyTextToClipboard(style);
}

function copyAll(yo) {
    synchronize();
    var styles = colorString(newColour[0]);
    for (var i = 1; i < 6; i++) {
        if (newColour[i]) {
            styles = styles + ", " + colorString(newColour[i], true);
        }
    }
    document.getElementById('copyall').setAttribute("data-clipboard-text", styles);
    copyTextToClipboard(styles)
    document.getElementById("toast").innerHTML = yo.getAttribute("data-clipboard-text") + " copied to clipboard.";
}

function start() {
    changeColour(-1);
}

//added to make background on colorGradient.html page start with a gradient color scheme//

function startGradient(){
	changeColour(-1,5);
}

function shiftColor(offset) {
    var num = (currentColor + offset + numButtons) % numButtons;
    document.getElementById('c' + num).focus()
    updateUI(newColour[num]);
    currentColor = num;
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 82:
        changeColour(-1);
        break;

        case 67:
        var color = document.getElementById('clipboard');
        toast(color)
        break;

        case 65:
        var color = document.getElementById('copyall');
        copyAll(color)
        break;

        case 37:
        shiftColor(-1)
        break;

        case 39:
        shiftColor(1)
        break;
    }
};

// From: Dean Taylor at http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
//removed data that does nothing//
    textArea.value = text;
    document.querySelector(".results").appendChild(textArea);

    //does nothing textArea.select(); //

    try {
        var successful = document.execCommand('copy');
    } catch (err) {
		//added an alert if there is an error on copying//
		alert("Unable to copy");
    }

    document.querySelector(".results").removeChild(textArea);
}
