'use strict';

export default class Animation {

	constructor({action = null, callback = null, duration = 1000, frames = 5}) {
		this.state = null;
		this.nextState = null;
		this.timeout = null;
		this.animations = {};

		if(action) {
			registerAction('default', action, callback, duration, frames);
		}
	}

	register({name = 'default', action, callback, duration = 1000, frames = 5}) {
		if(this.animations[name]) {
			throw `${name} is already registered`;
		}
		
		this.animations[name] = {action, callback, duration, frames};
	}

	getState() {
		return this.state;
	}

	isAnimating() {
		return this.state !== null;
	}

	startAnimation({name = 'default', override = false}) {
		let animation = this.animations[name];
		let {action, callback, duration, frames} = animation;

		if(animation) {
			if(this.isAnimating()) {
				if(override) {
					this.nextState = action ? name : null;
					this.state = null;
				} else {
					return;
				}
			} else {
				let interval = duration / (frames - 1);

				this.state = name;

				this.run({action, callback, frames, interval});
			}
		}
	}

	stopAnimation() {
		this.nextState = null;
		this.state = null;
	}

	run({action, callback, frames, frameIndex = 0, interval}) {
		if(this.timeout) {
			clearTimeout(this.timeout);
		}

		if(this.isAnimating() && frames > 0) {
			action(frameIndex);

			this.timeout = setTimeout(() => {
				this.run({action, callback, frames: frames - 1, frameIndex: frameIndex + 1, interval});
			}, interval);
		} else {
			let state = this.state;

			this.timeout = null;
			this.state = null;

			if(this.nextState) {
				let name = this.nextState;
				this.nextState = null;
				this.startAnimation({name});
			} else if(frames === 0 && callback){
				callback(state);
			}
		}
	}
};