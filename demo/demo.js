if (!window.keep) {
	throw new Error('Keep can not be found. Please include keep plugin.')
}

keep()
// keep(['full_name', 'gender', 'agree', 'address', 'password'])
// keep({
// 	targets: ['gender', 'agree', 'address', 'password'],
// 	opts: {
// 		lazy: 1,
// 		multiple: 1
// 	}
// })
