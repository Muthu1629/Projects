
const contact = document.querySelector(".contact_form");
contact.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const mail = document.getElementById("mail").value;
    const message = document.getElementById("message").value;

    const body = {
        name: name,
        email: mail,
        message: message
    }

    try{
        const response = await fetch("https://mail-sender-api-10114431154.development.catalystappsail.com/send",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if(response.ok){
            alert(data.message);
            contact.reset();
        }
        else{
            alert(data.message);
        }
    }
    catch (error){
        console.error(error);
        alert("Server Error");
    }

});


// Active Link

const navLink = document.querySelectorAll('.nav_link')
navLink.forEach(n => n.classList.remove('active'))


function linkAction(){

         navLink.forEach(n => n.classList.remove('active'))
         this.classList.add('active')

         const navMenu = document.getElementById('nav_menu')
         navMenu.classList.remove('show')

}

navLink.forEach(n => n.addEventListener('click',linkAction));

// scroll

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.style.backgroundColor = "#F9FAFF";
    } else {
        header.style.backgroundColor = "transparent";
    }
});


