if (!window.keep) {
	throw new Error('Keep can not be found. Please include keep plugin.')
}

keep(['full_name', 'gender', 'agree', 'address', 'password'])
