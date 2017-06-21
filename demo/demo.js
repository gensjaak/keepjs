if (!window.keep) {
	throw new Error('Keep can not be found. Please include keep plugin.')
}

keep([
	'password',
	'birthday',
	'full_name',
	'gender',
	'paypal',
	'agree',
	'description',
	'job',
	'workplace',
	'favorite_color',
	'authorname'
])

// Password inputs aren't kept
// Notice that input#address wasn't kept. His value won't be saved so.
