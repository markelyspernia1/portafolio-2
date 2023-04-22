// Menu e hamburger .s


class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();

//-------------------------formulario----------------------------------------------


const fields = document.querySelectorAll("[required]")

function ValidateField(field) {
  //  verificar se existem erros
  function verifyErrors() {
      let foundError = false;

      for(let error in field.validity) {
          // se não for customError
          //  verifica se tem erro
          if (field.validity[error] && !field.validity.valid ) {
              foundError = error
          }
      }
      return foundError;
  }

  function customMessage(typeError) {
      const messages = {
          text: {
              valueMissing: "Por favor, preencha este campo"
          },
          email: {
              valueMissing: "Email é obrigatório",
              typeMismatch: "Por favor, preencha um email válido"
          }
      }

      return messages[field.type][typeError]
  }

  function setCustomMessage(message) {
      const spanError = field.parentNode.querySelector("span.error")
      
      if (message) {
          spanError.classList.add("active")
          spanError.innerHTML = message
      } else {
          spanError.classList.remove("active")
          spanError.innerHTML = ""
      }
  }

  return function() {

      const error = verifyErrors()

      if(error) {
          const message = customMessage(error)

          field.style.borderColor = "yellow"
          setCustomMessage(message)
      } else {
          field.style.borderColor = "green"
          setCustomMessage()
      }
  }
}


function customValidation(event) {

  const field = event.target
  const validation = ValidateField(field)

  validation()

}

for( field of fields ){
  field.addEventListener("invalid", event => { 
      // eliminar o bubble
      event.preventDefault()

      customValidation(event)
  })
  field.addEventListener("blur", customValidation)
}