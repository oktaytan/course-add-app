(function() {
  // check fields and hide the submit
  document.addEventListener("DOMContentLoaded", function() {
    const display = new Display();
    display.checkFields();
    display.hideSubmit();
  });

  // add customer on submit
  document
    .getElementById("customer-form")
    .addEventListener("submit", function(e) {
      e.preventDefault();
      const name = this.querySelector("#name");
      const course = this.querySelector("#course");
      const author = this.querySelector("#author");

      const customer = new Customer(name.value, course.value, author.value);
      const display = new Display();

      display.feedback(customer);
      display.clearFields();
    });

  // display
  function Display() {
    this.inputs = document.querySelectorAll("input");
    this.name = document.getElementById("name");
    this.course = document.getElementById("course");
    this.author = document.getElementById("author");
    this.customers = document.querySelector(".customer__list");
    this.submitBtn = document.querySelector("#submitBtn");
  }

  // check fields
  Display.prototype.checkFields = function() {
    this.name.addEventListener("blur", this.validateField);
    this.course.addEventListener("blur", this.validateField);
    this.author.addEventListener("blur", this.validateField);
  };

  // validate easch field
  Display.prototype.validateField = function() {
    if (this.value !== "") {
      this.classList.add("validate");
      this.previousElementSibling.classList.add("active");
    } else {
      this.classList.remove("validate");
      this.previousElementSibling.classList.remove("active");
    }

    const validate = document.querySelectorAll(".validate");
    if (validate.length === 3) {
      document.querySelector("#submitBtn").disabled = false;
      document.querySelector("#submitBtn").classList.remove("disable");
    } else {
      document.querySelector("#submitBtn").disabled = true;
      document.querySelector("#submitBtn").classList.add("disable");
    }
  };

  // disable submit
  Display.prototype.hideSubmit = function() {
    const btn = document.querySelector("#submitBtn");
    btn.disabled = true;
    if (btn.disabled) {
      btn.classList.add("disable");
    } else {
      btn.classList.remove("disable");
    }
  };

  // show loading and feedback
  Display.prototype.feedback = function(customer) {
    const feedback = document.querySelector(".feedback");
    const loading = document.querySelector(".loading");
    const formTitle = document.querySelector(".form__title");
    formTitle.classList.add("hide");
    feedback.classList.add("show");
    loading.classList.add("show");

    const self = this;
    self.hideSubmit();

    setTimeout(function() {
      formTitle.classList.remove("hide");
      feedback.classList.remove("show");
      loading.classList.remove("show");
      self.addCustomer(customer);
    }, 3000);
  };

  // add Customer
  Display.prototype.addCustomer = function(customer) {
    const random = this.getRandom();
    let card = `
      <div class="card">
        <div class="card__image">
          <img src="./img/cust-${random}.jpeg">
        </div>
        <div class="card__body">
          <h6 class="card__detail"><span class="badge">Name</span><span id="customer-name">${
            customer.name
          }</span></h6>
          <h6 class="card__detail"><span class="badge">Course</span><span id="customer-name">${
            customer.course
          }</span></h6>
          <h6 class="card__detail"><span class="badge">Author</span><span id="customer-name">${
            customer.author
          }</span></h6>
          <a href="#" class="card__play"><i class="far fa-play-circle"></i></a>
      </div>
    `;

    this.customers.innerHTML += card;
  };

  // random number
  Display.prototype.getRandom = function() {
    let random = Math.floor(Math.random() * 5 + 1);
    return random;
  };

  // clear of all fields at form
  Display.prototype.clearFields = function() {
    this.name.value = "";
    this.course.value = "";
    this.author.value = "";
    this.inputs.forEach(function(input) {
      input.classList.remove("validate");
      input.previousElementSibling.classList.remove("active");
    });
    this.submitBtn.disabled = true;
    this.submitBtn.classList.add("disable");
  };

  // customer constructor function
  function Customer(name, course, author) {
    this.name = name;
    this.course = course;
    this.author = author;
  }
})();
