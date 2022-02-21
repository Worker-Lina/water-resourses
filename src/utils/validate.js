export function emailValidation(value) {
    let txt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return txt.test(value);
}

export function nameValidate(value){
    let txt = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/;
    return txt.test(value);
}

export function passwordValidate(value){
    var re = /[a-z]\d|\d[a-z]/i;
    return re.test(value) && value.length > 4;
}
