;

"use strict"

const pluginName = 'keep'
const pluginVersion = '1.0.0'

const tagAttr = 'keep'
const lazyAttr = `${tagAttr}-lazy`
const multipleAttr = `${tagAttr}-multiple`

const allowedTagNames = [ 'input', 'textarea', 'select' ]
const deniedTypes = ['password']

class Keep {
	constructor(config) {
		if (!window.localStorage) {
			throw new Error('Your browser doesn\'nt support LocalStorage. Keep will switch to local json version. Not ready in this version.')
		}

		// Write configuration
		this.config = config

		// HTMLElements
		this.els = []

		// Options
		this.opts = { lazy: 0, multiple: 0 }

		// Gets HTMLElements and set them to targets attribute
		this.setElts()

		// Listem to targets el
		this.core()
	}

	// Setting normally the targets's HTMLElement
	setElts () {
		// Plugin initialized by tag attributes
		// Get all allowed tag elements that got @tagAttr
		for (const tagName of allowedTagNames) {
			for (const candidateEl of document.getElementsByTagName(tagName)) {
				if (candidateEl.hasAttribute(tagAttr) && !this.els.includes(candidateEl) && (!deniedTypes.includes(candidateEl.type))) {
					this.els.push(candidateEl)
				}
			}
		}

		if (this.config) {
			// Plugin initialized by keep([...IDs])
			// Get all allowed tag elements by those IDs
			let tIDs = []
			if (Array.isArray(this.config)) {
				tIDs = this.config
			} else {
				if (this.config.hasOwnProperty('targets')) {
					tIDs = this.config.targets
					this.opts = this.config.opts
				}
			}

			for (const id of tIDs) {
				const el = document.getElementById(`${id}`)
				if (el && allowedTagNames.includes(el.tagName.toLowerCase())) {
					if (el.tagName.toLowerCase() === 'input' && deniedTypes.includes(el.type)) {
					} else {
						if (!this.els.includes(el)) {
							this.els.push(el)
						}
					}
				}
			}
		}
	}

	// Listen to el.keypress
	core () {
		for (const el of this.els) {
			const elOpts = {
				lazy: el.hasAttribute(lazyAttr) || this.opts.lazy,
				multiple: el.hasAttribute(multipleAttr) || this.opts.multiple
			}

			if (elOpts.lazy) {
				// Keep data on focusout or blur
			} else {
				// Keep data on keypress
			}

			if (elOpts.multiple) {
				// Don't overwrite old data for this el
			} else {
				// Old data will be replaced by new one
			}
		}
	}
}

window.keep = config => {
	return new Keep(config)
}
