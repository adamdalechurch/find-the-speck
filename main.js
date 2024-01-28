
let invl = 0;
let score = 0;
let no_speck = false;
let light_health = 100;
const flashlight = document.getElementById("flashlight");

function set_element_position(element, x, y) {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
}

function fade_out(element) {
    element.style.opacity = 0;
    element.style.transition = "opacity 1s ease";
}

function fade_in(element) {
    element.style.opacity = 1;
    element.style.transition = "opacity 1s ease";
}

function move_flashlight(){
    set_element_position(flashlight, event.pageX, event.pageY);
}

document.addEventListener("mousemove", function(e) {
    set_element_position(document.getElementById("gradient"), e.pageX, e.pageY);

    move_flashlight();

    let gradientRect = gradient.getBoundingClientRect();
    let redCircleRect = redCircle.getBoundingClientRect();

    // Check if the gradient is within the vicinity of the red circle
    if (Math.abs(gradientRect.x - redCircleaRect.x) < 50 && Math.abs(gradientRect.y - redCircleRect.y) < 50) {
        setTimeout(() => {
            // Move the red circle to a new random position
            set_element_position(redCircle, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }, 1000); // Delay of 1 second
    }
});


function move_circle_randomly() {
    let direction = Math.floor(Math.random() * 4);
    switch (direction) {
        case 0:
            redCircle.style.left = parseInt(redCircle.style.left) + 10 + 'px';
            break;
        case 1:
            redCircle.style.left = parseInt(redCircle.style.left) - 10 + 'px';
            break;
        case 2:
            redCircle.style.top = parseInt(redCircle.style.top) + 10 + 'px';
            break;
        case 3:
            redCircle.style.top = parseInt(redCircle.style.top) - 10 + 'px';
            break;
    }
}

function assign_random_position(event) {
    clearInterval(invl);
    let redCircle = document.getElementById("redCircle");

    //if event is not equal to null, then check if the mouse cursor is within 10px of the red circle
    if (event != undefined) {
        let redCircleRect = redCircle.getBoundingClientRect();
        if (Math.abs(event.pageX - redCircleRect.x) > 30  || Math.abs(event.pageY - redCircleRect.y) > 30) {
            //if the mouse cursor is within 10px of the red circle, then return
            return;
        }

      score++;
      document.getElementById("score").innerHTML = "Score: " + score;
    }

    set_element_position(redCircle, Math.random() * window.innerWidth, Math.random() * window.innerHeight);

    // at a random rate of 1/10, set the red circle display to none
    if (Math.random() < 0.1) {
        redCircle.style.display = "none";
        no_speck = true;
    } else {
        redCircle.style.display = "block";
        no_speck = false;
    }

    invl = setInterval(update_game, 1000);
}

function tick_flashlight() {
    const max_width = 500
    light_health--;
    document.getElementById("gradient").style.width = light_health / 100 * max_width + "px";
    document.getElementById("gradient").style.height = light_health / 100 * max_width + "px";
}

function update_game() {
    move_circle_randomly();
    tick_flashlight();
    if (light_health <= 0) {
        clearInterval(invl);
        alert("Game over! Your score is " + score);
        score = 0;
        light_health = 100;
        document.getElementById("score").innerHTML = "Score: " + score;
        document.getElementById("flashlight").style.opacity = 1;
        assign_random_position();
    }
}

function there_is_no_speck() {
    reveal_speck();
    
    if (no_speck) {
        score++;
    } else {
        score--;
    }

    document.getElementById("score").innerHTML = "Score: " + score;

}

function reveal_speck() {
    fade_out(document.getElementById("darkness"));
    fade_out(document.getElementById("gradient"));
    
    // remove event listener from speck:
    document.body.removeEventListener("click", assign_random_position);
    window.setTimeout(hide_speck, 5000);
}

function hide_speck() {
    fade_in(document.getElementById("darkness"));
    window.setTimeout(function(){
        assign_random_position();
        document.body.addEventListener("click", assign_random_position);
        fade_in(document.getElementById("gradient"));
    }, 1000);
}

// vanilla document reay using domcontentloaded:
document.addEventListener("DOMContentLoaded", function(event) {
    //do work
    assign_random_position();
    //add event lister to the body
    document.body.addEventListener("click", assign_random_position); 
});