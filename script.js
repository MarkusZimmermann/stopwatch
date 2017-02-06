/**
 * Created by mz on 06/02/2017.
 */

var formResponse = "https://docs.google.com/a/starship.co/forms/d/e/1FAIpQLSd45fatauSzdGu33ZWZiDOMIU0wFFv9ia3r5YpVjQPrEx_XGA/formResponse";

var concepts = [
    "static",
    "flashing"
];

var reactions = [
    "unchanged speed",
    "brake reaction",
    "full stop"
];

var backoffs = [
    "standing",
    "backoff"
];

var active = {
    concept: 0,
    backoff: 0
}

var timer;
var time = 0;

function submit(reaction, additional) {
    var data = {
        "entry.364832717": concepts[active["concept"]],
        "entry.1995415787": reactions[reaction],
    };
    if (additional) {
        $.extend(data, additional);
    }
    $.ajax({
        cache: false,
        type: "POST",
        url: formResponse,
        data: data,
        dataType: "xml",
        success: function() {
            alert("Response submitted");
        },
        error: function(error) {
            alert("Response submitted");
        }
    });
}

function change(what, concept) {
    active[what] = concept;
    $("." + what).removeClass("active");
    $("#"+what+concept).addClass("active");
}

function react(reaction) {
    if (reaction < 2) {
        submit(reaction);
    } else {
        time = 0;
        timer = setInterval(function(){
            time += 1;
            $('#watch').text(time);
        }, 1000);
        $('#stop').show();
        $('.concept').prop('disabled', true);
        $('.reaction').prop('disabled', true);
    }
}

function stop() {
    clearInterval(timer);

    $('#stop').hide();
    $('.concept').prop('disabled', false);
    $('.reaction').prop('disabled', false);

    submit(2, {
        "entry.275698104":backoffs[active['backoff']],
        "entry.919184611":time
    });
}