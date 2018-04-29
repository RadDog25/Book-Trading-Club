class FormErrors {
    constructor(req, options) {
        this.errors = {};
        if( options.requiredFields.length ) {
            options.requiredFields.forEach(field => {
                var key = field.key || field;
                var label = field.label || field;
                if( !req.body[key] ) {
                    this.errors[key] = `Please enter a ${label}`;
                }
            })
        }
    }

    set(field, message) {
        this.errors[field] = message;
    }

    get() {
        return this.errors;
    }

    any() {
        return Object.keys( this.errors ).length > 0;
    }
}

module.exports = FormErrors;