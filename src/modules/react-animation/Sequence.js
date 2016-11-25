'use strict';

export default class Sequence {
	constructor({name, animation, duration = 1000}) {
		this.name = name;
		this.duration = duration;
		this.animation = animation;
		this.animationFrames = [];
	}

	addAnimationFrame(animationFrame) {
		this.animationFrames.push(animationFrame);
	}

	register(animation) {
		animation.register({name: this.name, action: this.run.bind(this), callback: this.done ? this.done.bind(this) : null,
							duration: this.duration, frames: this.animationFrames.length});
	}

	start(override) {
		this.animation.startAnimation({name: this.name, override: override ? override : false});
	}

	stop() {
		if(this.animation.getState() === this.name) {
			this.animation.stopAnimation();
		}
	}

	run(frameIndex) {
		if(frameIndex < this.animationFrames.length) {
			let frame = this.animationFrames[frameIndex];

			frame();
		}
	}
}