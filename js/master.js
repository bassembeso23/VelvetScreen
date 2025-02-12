// Check if there is local storage color
let mainColor = localStorage.getItem("color-option")
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main--color", mainColor);

    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === mainColor) {
            element.classList.add("active");
        }
    });
}

// Random background option
let backgroundOption = true;
let backgroundInterval; 
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
    document.querySelectorAll(".background span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;    
        document.querySelector(".background .yes").classList.add("active");
    } 
    else {
        backgroundOption = false;
        document.querySelector(".background .no").classList.add("active");   
    }
}

// Settings icon    
let settingsIcon = document.querySelector(".toggle-settings i");
let settingsBox = document.querySelector(".settings-box")

settingsIcon.addEventListener("click" , function() {
    this.classList.toggle("fa-spin")
    settingsBox.classList.toggle("open");
});

// Switch colors 
colorLi = document.querySelectorAll(".colors-list li")

colorLi.forEach(li => {
    li.addEventListener("click" , (e) => {
        document.documentElement.style.setProperty("--main--color", e.target.dataset.color);
        localStorage.setItem("color-option", e.target.dataset.color);
        handleActiveState(e);
    });
});

// Switch backgrounds 
randomBackEl = document.querySelectorAll(".option-box .background span");

randomBackEl.forEach(span => {
    span.addEventListener("click" , (e) => {
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();    
            localStorage.setItem("background_option", true);
        }
        else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
        handleActiveState(e);
    });
});

// Select landing page element
let landingPage = document.querySelector(".landing-page");

// Get array of Images
let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];


function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get random number
            let randomNumber = uniqueRandom(); 
        
            // Change background image url 
            landingPage.style.backgroundImage  = 'url("./images/' + imgArray[randomNumber] +'")';
        
        },4000);
    }
}
let lastNumber = null;

function uniqueRandom() {
    let newNumber;
    do {
        newNumber = Math.floor(Math.random() * 4); // Generates 0 to 3
    } while (newNumber === lastNumber);
    
    lastNumber = newNumber;
    return newNumber;
}
randomizeImgs();

// Remove active class from all links and put it on the clicked link
let links = document.querySelectorAll(".header-area .list li a");
links.forEach(a => {
    a.addEventListener("click", (e) => {
        links.forEach(link => {
            link.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
        skill.style.width = skill.dataset.progress;
        });
    }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".now-shown img");

function createPopup(img) {
    const overlay = document.createElement("div");
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);

    const popupBox = document.createElement("div");
    popupBox.className = 'popup-box';
    if (img.alt) {
        const imgHeading = document.createElement("h3");
        imgHeading.textContent = img.alt;
        popupBox.appendChild(imgHeading);
    }
    const popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);

    const closeButton = document.createElement("span");
    closeButton.className = 'close-button';
    closeButton.textContent = 'X';
    popupBox.appendChild(closeButton);

    document.body.appendChild(popupBox);
}

ourGallery.forEach(img => {
    img.addEventListener('click', () => createPopup(img));
});

// Close Popup
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        // Remove The Current Popup
        e.target.parentNode.remove();
        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select all links
const allLinks = document.querySelectorAll(".header-area .links li a");
const allLinksFooter = document.querySelectorAll(".footer-links ul li a"); 

function scrollToAnySection(elements) {
    elements.forEach(element => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
scrollToAnySection(allBullets);
scrollToAnySection(allLinks);
scrollToAnySection(allLinksFooter);

function handleActiveState(event) {
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    event.target.classList.add("active");
}

// Show Bullets
let bulletsLocalItem = localStorage.getItem("bullets_option");
let bulletsSpan = document.querySelectorAll(".bullets span");
let navBullets = document.querySelector(".nav-bullets");

if (bulletsLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletsLocalItem === 'block') {
        navBullets.style.display = "block";
        document.querySelector(".bullets .yes").classList.add("active");
    } 
    else {
        navBullets.style.display = "none";
        document.querySelector(".bullets .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        handleActiveState(e);
        if (e.target.dataset.display === 'block') {
            navBullets.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        }
        else {
            navBullets.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
    });
});

// Reset Button
document.querySelector(".settings-box .reset-settings").addEventListener("click", (e) => {
    localStorage.removeItem("color-option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    window.location.reload();
});

// toggle menu
let toggleMenu = document.querySelector(".toggle-menu");
let divLinks = document.querySelector(".landing-page .header-area .links");

toggleMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu.classList.toggle("active");
    divLinks.classList.toggle("open");
});
divLinks.addEventListener("click", (e) => {
    e.stopPropagation();
});
// Click Anywhere to hide links
document.addEventListener("click", (e) => {
    if (e.target !== toggleMenu && e.target !== divLinks) {
        if (divLinks.classList.contains("open")) {
            toggleMenu.classList.toggle("active");
            divLinks.classList.toggle("open");
        }
    }
});