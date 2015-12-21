var arrayOfPeople;
var displayThisDiv = 0;
var intervalID;

$(document).ready(function(){
    getData();

});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data){
            arrayOfPeople = data.people;
            buildCarousel();
            buildIndexButtons();
            updateCarousel();
            eventListeners();
        }
    });
}

function eventListeners(){
    $('.button-container').on('click', '.go-button', goToIndividual);
    $('.carousel-container').on('click', '.next', goToNext);
    $('.carousel-container').on('click', '.previous', goToPrev);
}

function buildCarousel () {
    for (var i = 0; i<arrayOfPeople.length; i++) {
        $('.carousel-container').append("<div class='person, individual-" + i + "'></div>");

        var $el = $('.carousel-container').children().last()

        $($el).append('<button class="previous"><</button>');
        $($el).append('<div class="kitty-foo display' + i + '"></div>');

        $('.display' + i).append('<h1>' + arrayOfPeople[i].name + '</h1>');
        $('.display' + i).append('<p>' + arrayOfPeople[i].location + '</p>');
        $('.display' + i).append('<p>' + arrayOfPeople[i].animal + '</p>');

        $($el).append('<button class="next">></button>');

        $($el).hide();
    }
}

function buildIndexButtons() {
    for (var i = 0; i < arrayOfPeople.length; i++) {
        $(".button-container").append('<button class="go-button individual' + i + '" data-index="' + i + '"></button>');
    }
}

function hideIndividual() {
    var $el = $('.carousel-container').children();
    $($el).fadeOut(300);
}

function highlightCurrentIndex() {
    $('.go-button').removeClass('highlight');
    $('.individual' + displayThisDiv).addClass('highlight');
}
function displayIndividual() {
    var individual = ".individual-" + displayThisDiv;
    $(individual).delay(300).fadeIn(300);
    highlightCurrentIndex();
}

function autoChange() {
    intervalID = setInterval(goToNext, 10000);
}

function stopAutoChange() {
    clearInterval(intervalID);
}

function updateCarousel() {
    hideIndividual();
    displayIndividual();
    autoChange();
}

function goToIndividual() {
    stopAutoChange();
    var $info = $(this).data("index");
    displayThisDiv = parseInt($info);
    updateCarousel();
}

function goToNext() {
    stopAutoChange();
    if (displayThisDiv < arrayOfPeople.length - 1) {
        displayThisDiv++;
    } else {
        displayThisDiv = 0;
    }
    updateCarousel();
}

function goToPrev() {
    stopAutoChange();
    if (displayThisDiv > 0) {
        displayThisDiv--;
    } else {
        displayThisDiv = arrayOfPeople.length - 1;
    };
    updateCarousel();
}
