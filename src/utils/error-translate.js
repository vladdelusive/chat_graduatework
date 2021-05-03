const translates = {
    "There is no user record corresponding to this identifier. The user may have been deleted.":
        "Немає запису користувача, що відповідає цьому ідентифікатору. Можливо, користувача видалено.",
    "The email address is already in use by another account.": "Адреса електронної пошти вже використовується іншим обліковим записом."
}

export const errorTranslate = (error) => error ? translates[error] : error