'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import Board from './Board';

export default class Roulette extends React.Component {
	constructor() {
		super();

		this.state = {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}

	componentDidMount() {
		window.onresize = this.onResize.bind(this);
	}

	onResize(e) {
		let width = e.target.innerWidth;
		let height = e.target.innerHeight;

		this.setState({width, height});
	}

	render() {
		return(
			<Table ref="table"
				width={this.state.width} 
				height={this.state.height}>
				<Board />
			</Table>
		);
	}
}