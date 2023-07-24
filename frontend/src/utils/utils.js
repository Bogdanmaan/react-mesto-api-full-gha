export const config = {
    formSelector: '.edit-form',
    inputSelector: '.edit-form__field',
    submitButtonSelector: '.edit-form__button',
    inactiveButtonClass: 'edit-form__button_inactive',
    inputErrorClass: 'edit-form__field_type_error',
    errorClass: 'edit-form__field-error'
}

export const apiConfig = {
    baseUrl: 'http://localhost:4000',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      // authorization: '0e72c463-84b1-4b3c-b41a-79efe4f96a53',
      'Content-Type': 'application/json'
    }
}