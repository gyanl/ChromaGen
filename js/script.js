/**
* @Author: gyanl, ananayarora
* @Date:   2016-09-29T09:56:56+05:30
* @Last modified by:   ananayarora
* @Last modified time: 2016-09-29T10:00:14+05:30
*/

var newColour = [];
var format = 'hex';
//The index of the currently selected color
var currentColour = 0;
var numColours = 0;

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

function changeColour(num) {
    if (num != -1) {
        currentColour = num;
        new_color = newColour[currentColour];
        document.getElementById('c'+currentColour).focus();
        //outline();  either use the fn or just write the code here.
    } else {
        currentColour = 0;
        new_color = genColor();
        newColour.unshift(new_color);
        if (numColours<6){
            numColours++;
        }
        for (var i = 0; i < 6; i++) {
            var div_id = "c" + (i);
            document.getElementById(div_id).style.background = newColour[i];
            document.getElementById('c0').focus();
        }
    }
    document.body.style.backgroundColor = new_color;
    document.getElementById('clipboard').style.background = new_color;
    document.getElementById('generate').style.background = new_color;
    document.getElementById('copyall').style.background = new_color;
    document.getElementById('clipboard').setAttribute("data-clipboard-text", formatColor(new_color));
}

function formatColor(color) {
    color = convertColor(color, format);
    return color;
}

function toast(yo) {
    yo.setAttribute("data-clipboard-text", formatColor(newColour[currentColour]));
    document.getElementById("toast").innerHTML = yo.getAttribute("data-clipboard-text") + " copied to clipboard.";
}

function copyAll(yo) {
    var colors = formatColor(newColour[0]);
    for (var i = 1; i < 6; i++) {
        if (newColour[i]) {
            colors = colors + ", " + formatColor(newColour[i]);
        }
    }
    document.getElementById('copyall').setAttribute("data-clipboard-text", colors);
    document.getElementById("toast").innerHTML = yo.getAttribute("data-clipboard-text") + " copied to clipboard.";
}

function start() {
    var clipboard = new Clipboard('.btn');
    changeColour(-1);
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 82:
        changeColour(-1);
        break;

        case 67:
        var color = document.getElementById('clipboard');
        color.click();
        break;
        
        case 65:
        var color = document.getElementById('copyall');
        color.click();
        break;

        case 37:
        if(currentColour>0){
            changeColour(currentColour-1);
        }
        else{
            changeColour(numColours-1);
        }
        break;

        case 39:
        if(currentColour<numColours-1){
            changeColour(currentColour+1);
        }
        else{
            changeColour(0);
        }
    }
};
