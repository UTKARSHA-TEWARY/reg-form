const Validation = (values) => {
    let errors = {};

    if (!values.name) {
        errors.name = "Username is required";
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid";
    }

    if(!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(values.password)) {
        errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(values.password)) {
        errors.password = "Password must contain at least one digit";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.password = "Password must contain at least one special character";
    }


    return errors;
};

export default Validation;
