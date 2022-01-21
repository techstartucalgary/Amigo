import validator from "validator";
import { FieldError } from "../types/FieldError";
import { RegisterUserType } from "../types/UserTypes";
import { Universities } from "../utils/universities";
import { UpdateUserType } from "../types/UserTypes"

export const validateUpdate = (data: UpdateUserType) => {
	const errors: FieldError[] = [];
	if (data.bio) { 
		const errBio = validateBio(data.bio); 
		if (errBio) errors.push(errBio); 
	}
	if (data.university) { 
		const errUniversity = validateBio(data.university); 
		if (errUniversity) errors.push(errUniversity); 
	}
	if (errors.length > 0) return { errors }
}

export const validateRegister = (data: RegisterUserType) => {
	let errors: FieldError[] = [];
	const validUniversity = validateUniversity(data.university);
	const validEmail = validateEmail(data.email, data.university);
	const validPassword = validatePassword(data.password);
	const validDOB = validateDOB(new Date(data.dateOfBirth));
	const validBio = validateBio(data.bio);
	if (validUniversity) errors.push(validUniversity);
	if (validEmail) errors.push(validEmail);
	if (validBio) errors.push(validBio);
	if (validDOB) errors.push(validDOB);
	if (validPassword) errors = errors.concat(validPassword);
	return errors.length > 0 ? errors : null;
};

export const validateUniversity = (university: string) => {
	const uni = Universities.find((u) => (u.name = university));
	if (!uni) {
		return {
			field: "university",
			message: "University is not available or Invalid University",
		};
	}
	return null;
};

export const validateDOB = (dob: Date) => {
	const today = new Date();
	const age = today.getFullYear() - dob.getFullYear();
	if (age < 18) {
		return {
			field: "dateOfBirth",
			message: "You must be 18 years or older to register.",
		};
	}
	return null;
};

export const validateBio = (bio: string) => {
	if (bio.length > 500) {
		return {
			field: "bio",
			message: "Bio must be less than 500 characters.",
		};
	}
	return null;
};

export const validateEmail = (email: string, university: string) => {
	if (!validator.isEmail(email)) {
		return {
			field: "email",
			message: "Invalid Email Address",
		};
	}
	const regex = Universities.find((u) => u.name === university)?.regex;
	if (regex && !email.match(regex)) {
		return {
			field: "email",
			message: "Please use your " + university + " email address.",
		};
	}
	return null;
};

export const validatePassword = (password: string) => {
	let errors: FieldError[] = [];

	if (!validator.isLength(password, { min: 8 })) {
		errors.push({
			field: "password",
			message: "Password needs to be at least 8 characters long.",
		});
	}

	if (!/[A-Z]/.test(password)) {
		errors.push({
			field: "password",
			message: "Password needs to have at least 1 uppercase character.",
		});
	}

	if (!/[a-z]/.test(password)) {
		errors.push({
			field: "password",
			message: "Password needs to have at least 1 lowercase character.",
		});
	}

	if (!/\d/.test(password)) {
		errors.push({
			field: "password",
			message: "Password needs to have at least 1 number.",
		});
	}

	if (!/\W/.test(password)) {
		errors.push({
			field: "password",
			message: "Password needs to have at least 1 special character.",
		});
	}

	return errors.length > 0 ? errors : null;
};
