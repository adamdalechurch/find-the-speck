let invl = 0;
let score = 0;
let no_speck = false;
let light_health = 100;

function elem(id) {
    return document.getElementById(id);
}

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
    set_element_position(elem("flashlight"), event.pageX, event.pageY);
}

document.addEventListener("mousemove", function(e) {
    set_element_position(elem("gradient"), e.pageX, e.pageY);

    move_flashlight();

    let speck = elem("speck");
    let gradient = elem("gradient");

    let gradientRect = gradient.getBoundingClientRect();
    let speckRect = speck.getBoundingClientRect();

    // Check if the gradient is within the vicinity of the speck
    if (Math.abs(gradientRect.x - speckRect.x) < 50 && Math.abs(gradientRect.y - speckRect.y) < 50) {
        setTimeout(() => {
            // Move the speck to a new random position
            set_element_position(speck, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }, 1000); // Delay of 1 second
    }
});


function move_circle_randomly() {
    let direction = Math.floor(Math.random() * 4);
    let speck = elem("speck");
    switch (direction) {
        case 0:
            speck.style.left = parseInt(speck.style.left) + 10 + 'px';
            break;
        case 1:
            speck.style.left = parseInt(speck.style.left) - 10 + 'px';
            break;
        case 2:
            speck.style.top = parseInt(speck.style.top) + 10 + 'px';
            break;
        case 3:
            speck.style.top = parseInt(speck.style.top) - 10 + 'px';
            break;
    }
}

function assign_random_position(event) {
    clearInterval(invl);
    let speck = elem("speck");

    //if event is not equal to null, then check if the mouse cursor is within 10px of the speck
    if (event != undefined) {
        let speckRect = speck.getBoundingClientRect();
        if (Math.abs(event.pageX - speckRect.x) > 30  || Math.abs(event.pageY - speckRect.y) > 30) {
            //if the mouse cursor is within 10px of the speck, then return
            return;
        }

      score++;
      light_health += light_health < 100 ? 10 : 0;
      draw_light(light_health);
      elem("score").innerHTML = "Score: " + score;
    }

    set_element_position(speck, Math.random() * window.innerWidth, Math.random() * window.innerHeight);

    // at a random rate of 1/10, set the speck display to none
    if (Math.random() < 0.1) {
        speck.style.display = "none";
        no_speck = true;
    } else {
        speck.style.display = "block";
        no_speck = false;
    }

    invl = setInterval(update_game, 1000);
}

function draw_light(light_health) {
    const max_width = 500
    elem("gradient").style.width = light_health / 100 * max_width + "px";
    elem("gradient").style.height = light_health / 100 * max_width + "px";
}

function tick_flashlight() {
    draw_light(light_health--);

    let batteryLife = elem("batteryLife");
    if (light_health > 90){
        batteryLife.src = "battery_life100.png"
    }
    if (light_health <= 90 && light_health > 70){
        batteryLife.src = "battery_life90.png"
    }
    if (light_health <= 70 && light_health > 50){
        batteryLife.src = "battery_life70.png"
    }
    if (light_health <= 50 && light_health > 30){
        batteryLife.src = "battery_life50.png"
    }
    if (light_health <= 30 && light_health > 10){
        batteryLife.src = "battery_life30.png"
    }
    if (light_health <= 10 && light_health > 0){
        batteryLife.src = "battery_life10.png"
    }
}

function update_game() {
    move_circle_randomly();
    tick_flashlight();
    if (light_health <= 0) {
        clearInterval(invl);
        alert("Game over! Your score is " + score);
        score = 0;
        light_health = 100;
        elem("score").innerHTML = "Score: " + score;
        elem("flashlight").style.opacity = 1;
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

    elem("score").innerHTML = "Score: " + score;

}

function change_text_color(color) {
    elem("score").style.color = color;
    elem("title").style.color = color;
}

function reveal_speck() {
    fade_out(elem("darkness"));
    fade_out(elem("gradient"));

    change_text_color("black");

    // remove event listener from speck:
    document.body.removeEventListener("click", assign_random_position);
    window.setTimeout(hide_speck, 5000);
}

function hide_speck() {
    fade_in(elem("darkness"));

    change_text_color("white");

    window.setTimeout(function(){
        assign_random_position();
        document.body.addEventListener("click", assign_random_position);
        fade_in(elem("gradient"));
    }, 1000);
}

// vanilla document reay using domcontentloaded:
document.addEventListener("DOMContentLoaded", function(event) {
    //do work
    assign_random_position();
    //add event lister to the body
    document.body.addEventListener("click", assign_random_position);     
});