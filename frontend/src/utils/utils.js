export const config = {
    formSelector: '.edit-form',
    inputSelector: '.edit-form__field',
    submitButtonSelector: '.edit-form__button',
    inactiveButtonClass: 'edit-form__button_inactive',
    inputErrorClass: 'edit-form__field_type_error',
    errorClass: 'edit-form__field-error'
}

export const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
      authorization: 'f078c62b-1864-449f-b8d5-c0f5ce819d9e',
      'Content-Type': 'application/json'
    }
}