class FormErrors {
    constructor(req, options) {
        this.errors = {};
        if( options.requiredFields.length ) {
            options.requiredFields.forEach(field => {
                if( !req.body[field] ) {
                    this.errors[field] = `Please enter a ${field}`;
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