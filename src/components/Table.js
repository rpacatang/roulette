'use strict';

import ReactAnimation from '../modules/react-animation.js';

export default class Table extends ReactAnimation.Scene {
	ready() {
		this.addAnimation({
			action: (frameIndex) => {
				let graphics = this.graphics;
				let width = this.width;
				let height = this.height;

				graphics.globalAlpha = 1;
				this.drawFloor({graphics, width, height});
				console.log(frameIndex);
				graphics.globalAlpha = frameIndex / 200;

				this.drawTable({graphics, width, height});

				graphics.globalAlpha = 1;
			},
			duration: 1000,
			frames: 200
		});
	}


	draw({graphics, width, height}) {
		this.graphics = graphics;
		this.width = width;
		this.height = height

		this.startAnimation({});
	}

	drawFloor({graphics, width, height}) {
		graphics.fillStyle = '#d2691e';
		graphics.fillRect(0, 0, width, height);

		let cols = width / 20;
		let rows = height / 20;

		for(let i = 0; i < cols; i++) {
			for(let j = 0; j < rows; j++) {
				this.drawCube({graphics, x: (i * 40) - (j % 2 == 0 ? 0 : 20), y: j * 40, length: 20});
			}	
		}

		let radius = Math.min(width, height) / 2;
		let gradient = graphics.createRadialGradient(width / 2, height / 2, radius, width / 2, height / 2, radius * 2);

		gradient.addColorStop(0, '#cd853f');
		gradient.addColorStop(1, '#000000');
		
		graphics.globalAlpha = 0.4;
		graphics.fillStyle = gradient;

		graphics.fillRect(0, 0, width, height);

		graphics.globalAlpha = 1;
	}

	drawCube({graphics, x, y, length}) {
		graphics.fillStyle = '#deb887';
		graphics.beginPath();
		graphics.moveTo(x, y);
		graphics.lineTo(x + length, y + length);
		graphics.lineTo(x + length, y + (length * 2));
		graphics.lineTo(x , y + length);
		graphics.lineTo(x, y);
		graphics.closePath();
		graphics.fill();

		graphics.fillStyle = '#8b0000';
		graphics.beginPath();
		graphics.moveTo(x + length, y + length);
		graphics.lineTo(x + (length * 2), y);
		graphics.lineTo(x + (length * 2), y + length);
		graphics.lineTo(x + length, y + (length * 2));
		graphics.lineTo(x + length, y + length);
		graphics.closePath();
		graphics.fill();
	}

	drawTable({graphics, width, height}) {
		graphics.save();

		let radius = Math.min(width, height) / 2;
		let reduceBy = 20;
		let x = 0;
		let y = 0;

		graphics.shadowColor = '#000000';
		graphics.shadowBlur = 10;

		let gradient = graphics.createRadialGradient(width / 2, height / 2, radius, width / 2, height / 2, radius * 1.5);

		graphics.shadowColor = null;
		graphics.shadowBlur = 0;

		gradient.addColorStop(0, "#696969");
		gradient.addColorStop(1, "#000000");

		this.drawRectWithRoundCorners({graphics, x, y, width, height, reduceBy, fillStyle: gradient});

		gradient = graphics.createRadialGradient(width / 2, height / 2, radius * 0.75, width / 2, height / 2, radius * 1.5);

		gradient.addColorStop(0, '#cd853f');
		gradient.addColorStop(0.5, '#d2691e');
		gradient.addColorStop(1, '#8b4513');

		reduceBy += 8;

		this.drawRectWithRoundCorners({graphics, x, y, width, height, reduceBy, fillStyle: gradient});

		reduceBy += 25;

		this.drawRectWithRoundCorners({graphics, x, y, width, height, reduceBy, fillStyle: '#008b8b'});

		if(width < height) {
			y += 15;
			height -= y * 2;
		} else {
			x += 15;
			width -= x * 2;
		}

		reduceBy += 10;

		this.drawRectWithRoundCorners({graphics, x, y, width, height, reduceBy, fillStyle: '#008080'});
	}

	drawRectWithRoundCorners({graphics, x, y, width, height, borderRadius = 0.5, reduceBy = 0, fillStyle = null, strokeStyle = null}) {
		x += reduceBy;
		y += reduceBy;
		width -= reduceBy * 2;
		height -= reduceBy * 2;

		let radius = (Math.min(width, height) / 2) * borderRadius;

		if(fillStyle) {
			graphics.fillStyle = fillStyle;
		}

		if(strokeStyle) {
			graphics.strokeStyle = strokeStyle;
		}

		graphics.beginPath();
		graphics.moveTo(x + radius, y);
		graphics.lineTo(x + width - radius, y);
		graphics.arcTo(x + width, y, x + width, y + radius, radius);
		graphics.lineTo(x + width, y + height - radius);
		graphics.arcTo(x + width, y + height, x + width  - radius, y + height, radius);
		graphics.lineTo(x + radius, y + height);
		graphics.arcTo(x, y + height, x, y + height - radius, radius);
		graphics.lineTo(x, y + radius);
		graphics.arcTo(x, y, x + radius, y, radius);

		if(fillStyle) {
			graphics.fill();
		}

		if(strokeStyle) {
			graphics.stroke();
		}
	}
}