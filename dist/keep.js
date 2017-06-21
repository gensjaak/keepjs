;

"use strict"

const pluginName = 'keep'
const pluginVersion = '1.0.0'
const targetAttr = 'keep'
const allowedTargets = [ 'input', 'textarea', 'select' ]

class Keep {
	constructor(config) {
		if (!window.localStorage) {
			throw new Error('Your browser doesn\'nt support LocalStorage. Keep will switch to local json version. Not ready in this version.')
		}

		// Write configuration
		this.config = config

		// HTMLElements
		this.targets = []

		// Gets HTMLElements and set them to targets attribute
		this.setTargets()
	}

	// Setting normally the targets's HTMLElement
	setTargets () {
		if (Array.isArray(this.config)) {
			// Plugin initialized with defaults configuration. So just keep data and return the last one when required.
			// Here @config should be an array of the targets element id
			for (const id of this.config) {
				const el = document.getElementById(`${id}`)
				if (el && allowedTargets.includes(el.tagName.toLowerCase())) {
					if (el.tagName.toLowerCase() === 'input' && el.type === 'password') {
					} else {
						this.targets.push(el)
					}
				}
			}
		}
	}
}

window.keep = (config) => {
	return new Keep(config)
}
