'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SceneStyle from './scene.css';
import Layer from './Layer'

export default class Scene extends React.Component {
	constructor() {
		super();

		this.layerSize = 0;
	}

	componentDidMount() {
		if(this.ready) {
			this.ready();
		}

		if(this.draw) {
			this.refs.background.draw = this.draw.bind(this);
			this.refs.background.initialize();
		}
	}

	addAnimation({name = 'default', action, callback, duration = 1000, frames = 5}) {
		this.refs.background.addAnimation({name, action, callback, duration, frames});
	}

	startAnimation({name = 'default'}) {
		this.refs.background.startAnimation({name});
	}

	stopAnimation() {
		this.refs.background.stopAnimation();
	}

	registerAnimationSequence(sequence) {
		sequence.register(this.animation);
	}

	render() {
		const style = {
			width: `${this.props.width}px`,
			height: `${this.props.height}px`
		};

		const className = 'react-graphics-scene'; 

		let width = this.props.width
		let height = this.props.height;

		this.width = width;
		this.height = height;

		this.layerSize = 0;

		let children = React.Children.map(this.props.children, (child) => {
			let ref = `layer-${this.layerSize++}`;
			let zIndex = this.layerSize * 10;

			return React.cloneElement(child, {ref, width, height, zIndex});
		} );

		return(
			<div id={this.props.id}
				style={style}
				className={className}>
				<Layer ref="background" 
					width={width}
					height={height}
					zIndex={0}/>
				{children}
			</div>
		);
	}
}