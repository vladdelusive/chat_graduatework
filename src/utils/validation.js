function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const rulesHandler = {
    required: (value, rule, /*fieldName*/) => {
        if (rule === true && ['', undefined, null].some(v => v === value)) {
            return `Поле обов'язкове`;
        }
    },

    minLength: (value, length, /*fieldName*/) => {
        if (value && value.length < length) {
            return `Повинно бути як мінімум ${length} символів.`;
        }
    },

    maxLength: (value, length, /*fieldName*/) => {
        if (value && value.length > length) {
            return `Повинно бути як максимум ${length} символів.`;
        }
    },

    email: (value, rule) => {
        if (rule === true && !isEmail(String(value))) {
            return 'Імейл не валідний';
        }
    },

    fileSize: (value, max, /*fieldName*/) => {
        let flag = true;
        if (value && value.length) {
            for (let i = 0; i < value.length; i++) {
                if (value[i].size / 1024 > Number(max)) {
                    flag = false;
                    break;
                }
            }
        }
        if (!flag) {
            return `Обсяг файлу не повинен перевищувати ${max}kB`;
        }
    },

    fileTypes: (value, types, /*fieldName*/) => {
        let flag = true;
        if (value && value.length) {
            let exts = types.replace(/\s/g, '').replace(/,/g, '|');
            for (let i = 0; i < value.length; i++) {
                if (!new RegExp('.(' + exts + ')$', 'i').test(value[i].name)) {
                    flag = false;
                }
            }
        }
        if (!flag) {
            return `Допустимі розширення файлів: ${types}`;
        }
    },
};

export function checkValue(value, rules, fieldName) {
    for (const rule in rules) { // eslint-disable-line
        if (!rules.hasOwnProperty(rule)) continue; // eslint-disable-line
        let error = rulesHandler[rule].call(null, value, rules[rule], fieldName);
        if (error) return error;
    }
}

export function checkForm(values, rules) {
    return Object.keys(rules).reduce((result, fieldName) => {
        return {
            ...result,
            [fieldName]: rules[fieldName]['key']
                ? checkValue(values[fieldName][rules[fieldName]['key']], rules[fieldName], fieldName)
                : checkValue(values[fieldName], rules[fieldName], fieldName)
        };
    }, {});
}
