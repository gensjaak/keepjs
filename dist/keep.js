;

//////
// keep.js v-1.0.0
// Keep inputs, textareas and selects data even if page is refreshed.
// An Ovaaar product
// Jean-jacques AKAKPO (akakpo.jeanjacques@gmail.com)
// Ovaar's website : 228itlabo.com
// Private repository (on Bitbucket) : https://phareal@bitbucket.org/phareal/keepjs.git
// Github : https://phareal@github.org/phareal/keepjs.git
// 
// keep
// keep-lazy
// keep-multiple (ignored in this version) @dev-ing
//////

"use strict"

const pluginName = 'keep'
const pluginVersion = '1.0.0'

const tagAttr = 'keep'
const lazyAttr = `${tagAttr}-lazy`
const multipleAttr = `${tagAttr}-multiple`

const allowedTagNames = [ 'input', 'textarea', 'select' ]
const deniedTypes = ['password']

const dbKey = `${pluginName}@${pluginVersion}`

class Keep {
	constructor(config) {
		if (!window.localStorage) {
			throw new Error('Your browser doesn\'nt support LocalStorage. Keep will switch to local json version. Not ready in this version.')
		}

		// Local DB
		this.db = JSON.parse(window.localStorage.getItem(dbKey) || "{}")

		// Write configuration
		this.config = config

		// HTMLElements
		this.els = []

		// Options
		this.opts = { lazy: 1, multiple: 0 }

		// Gets HTMLElements and set them to targets attribute
		this.setElts()

		// Return stored values
		this.serve()

		// Listen to targets el
		this.eat()
	}

	// Just return this
	getKeeper () {
		return this
	}

	// Write DB to LocalStorage
	write () {
		window.localStorage.setItem(dbKey, JSON.stringify(this.db))
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

	// eat to events
	eat () {
		for (const el of this.els) {
			const elOpts = {
				lazy: el.hasAttribute(lazyAttr) || this.opts.lazy,
				multiple: el.hasAttribute(multipleAttr) || this.opts.multiple
			}

			let evtFn = evt => {
				if (evt.isTrusted) {
					let data2Keep = []

					if (el.type === 'checkbox') {
						data2Keep.push(el.checked)
					} else {
						data2Keep.push(el.value)
					}

					this.db[el.id] = data2Keep
					this.write()
				}
			}

			if (elOpts.lazy) {
				// Keep data on blur
				el.onblur = evtFn
			} else {
				// Keep data on keyup
				el.onkeyup = evtFn
			}

			// Whatever, I'll keep all data as array but if multiple is falsy, latest will be returned
			if (elOpts.multiple) {
				// Don't overwrite old data for this el
			} else {
				// Old data will be replaced by new one
			}
		}
	}

	// Return kept data to correspondant fields
	serve () {
		for (const id in this.db) {
			let el = document.getElementById(id)
			const entries = this.db[id]
			const val = entries[entries.length - 1]

			if (el) {
				if (el.type === 'checkbox') {
					el.value = el.checked = val
				} else {
					el.value = val
				}
			}
		}
	}
}

window.keep = config => {
	return new Keep(config)
}
