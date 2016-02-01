jest.dontMock('../../components/Draggable.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Draggable = require('../../components/Draggable.js');

describe('Draggable', function() {
	it('should toggle clicked on click', function(){
		expect(1).toBe(1);
	});
});
