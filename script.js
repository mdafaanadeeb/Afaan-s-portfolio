// 1. Typing Animation
// I updated these roles based on your resume
const texts = ["AI/ML Engineer", "Java Developer", "Python Expert", "Cloud Enthusiast"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    // Apply to both typing spans
    document.querySelectorAll(".typing, .typing-2").forEach(el => el.textContent = letter);

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 150);
    }
}());


// 2. Particle Background Effect
// This creates the floating dots effect from the portfolio you liked
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = '#00cec9'; // Neon Cyan
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
        if (this.size <= 0.2) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animateParticles();

// 3. Navbar Sticky Effect
window.addEventListener("scroll", function(){
    const header = document.querySelector(".navbar");
    header.classList.toggle("sticky", window.scrollY > 20);
});

// 4. Menu Button Toggle
document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('.navbar .menu').classList.toggle("active");
    document.querySelector('.menu-btn i').classList.toggle("active");
});
// 5. Contact Form Handling (AJAX)
const form = document.getElementById("contact-form");

async function handleSubmit(event) {
    event.preventDefault(); // Stop the page from reloading
    const status = document.getElementById("status");
    const data = new FormData(event.target);
    
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks for your submission!";
            status.style.display = "block";
            form.reset(); // Clear the form inputs
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form";
                }
                status.style.color = "red";
                status.style.display = "block";
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form";
        status.style.color = "red";
        status.style.display = "block";
    });
}

form.addEventListener("submit", handleSubmit);
