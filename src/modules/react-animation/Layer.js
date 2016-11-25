'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import EntityStyle from './layer.css';
import Animation from './Animation';

export default class Layer extends React.Component {

	constructor() {
		super();

		this.animation = new Animation({});
	}

	addAnimation({name = 'default', action, callback, duration = 1000, frames = 5}) {
		this.animation.register({name, action, callback, duration, frames});
	}

	startAnimation({name = 'default'}) {
		this.animation.startAnimation({name, override: true});
	}

	stopAnimation() {
		this.animation.stopAnimation();
	}

	registerAnimationSequence(sequence) {
		sequence.register(this.animation);
	}

	componentDidMount() {
		this.initialize();
	}

	componentDidUpdate() {
		this.initialize();
	}

	initialize() {
		let canvas = ReactDOM.findDOMNode(this.refs.layer);

		if(canvas.width > 0 && canvas.height > 0 && canvas.getContext('2d') && this.draw) {
			let graphics = canvas.getContext('2d');
			let width = canvas.width;
			let height = canvas.height;

			if(this.draw) {
				this.draw({graphics, width, height});
			}
		}
	}

	render() {
		const className = 'react-graphics-layer';

		const style = {
			zIndex: this.props.zIndex
		}

		this.width = this.props.width;
		this.height = this.props.height;

		return(
			<canvas ref="layer"
					width={this.props.width} 
					height={this.props.height}
					className={className}
					style={style}>
			</canvas>
		);
	}

}