import throttle from 'lodash.throttle';
const LOCAL_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

const formData = {};
populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(LOCAL_KEY);
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  let savedMessage = localStorage.getItem(LOCAL_KEY);
  if (savedMessage) {
    savedMessage = JSON.parse(savedMessage);
    Object.entries(savedMessage).forEach(([name, value]) => {
      refs.form.elements[name].value = value;
      formData[name] = value;
    });
  }
}
