jest.dontMock('../../components/Draggable.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

/** http://brandonokert.com/2015/08/04/TestingInReact/#You_Cannot_Check_State/Render_or_Simulate_Right_After_Simulating_an_Event **/
var waitsInProgress = [];

var waitFor = (test, message, done, timeLeft) => {
    timeLeft = timeLeft === undefined ? 100 : timeLeft;
    waitsInProgress.push(setTimeout(() => {
        if (timeLeft <= 0) {
            fail(message);
            done();
        } else if (test()) {
            done();
        } else {
            waitFor(test, message, done, timeLeft - 10);
        }
    }, 10));
};

/** end **/

waitFor.clear = () => waitsInProgress.map(clearTimeout); //optionally call this in the beforeEach to ensure rogue tests are not still waiting

const Draggable = require('../../components/Draggable.js').default;

describe('Draggable', function() {
    var ele = (<Draggable x={100} y={100} width={100} height={100}>Hello</Draggable>);
    var draggable;

    beforeEach(function() {
        draggable = TestUtils.renderIntoDocument(ele);
    });

    it('should contain the text passed into it', function(){
        var draggableNode = ReactDOM.findDOMNode(draggable);
        expect(draggableNode.textContent).toEqual('Hello');
    });

    it('should toggle the clicked state on click', (done) => {
        expect(draggable.clicked).toEqual(false);
        TestUtils.Simulate.mouseDown(draggable);
        waitFor(() => draggable.clicked === true, 'Clicked was not updated', done);
    });
});
