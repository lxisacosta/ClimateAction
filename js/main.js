document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (this.href === window.location.href) {
                event.preventDefault();
            }
        });
    });
 
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const serviceID = 'service_q8zvcbt'; 
            const templateID = 'template_hwkt5xo'; 
            const userID = 'fsE9ppmYAWBgTfP7Y'; 

            emailjs.init(userID);

            const formData = {
                name: this.elements["name"].value,
                email: this.elements["email"].value,
                subject: this.elements["subject"].value,
                message: this.elements["message"].value
            };

            emailjs.send(serviceID, templateID, formData)
                .then((response) => {
                    alert('Mensagem enviada com sucesso!');
                    console.log('SUCCESS!', response.status, response.text);
                    this.reset();
                }, (error) => {
                    alert('Erro ao enviar mensagem: ' + JSON.stringify(error));
                    console.log('FAILED...', error);
                });
        });
    }
});