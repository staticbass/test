/**
 * Created by supervlad on 26.04.16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from '../source/colorPicker.jsx';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';

describe('colorPicker component', () => {

    let onColorChange = null,
        component = null;

    before(() => {
        onColorChange = expect.createSpy();
        component = TestUtils.renderIntoDocument(<ColorPicker onColorChange={onColorChange} />);
    });

    it('renders', () => {
        const node = ReactDOM.findDOMNode(component);
        expect(node).toExist();
    });
    it('creates color boxes', () => {
        const spy = expect.spyOn(ColorPicker.prototype, 'makeColorBoxes').andCallThrough();
        const colors = ['#fff', '#ccc'];
        component = TestUtils.renderIntoDocument(<ColorPicker onColorChange={onColorChange} colors={colors} />);
        const boxesLength = ReactDOM.findDOMNode(component).querySelectorAll('.color-box').length;
        const colorsLength = colors.length;

        expect(spy).toHaveBeenCalledWith(colors);
        expect(boxesLength).toEqual(colorsLength);

        spy.restore();
    });
    it('calls onColorChange on color-box click', () => {
        const node = ReactDOM.findDOMNode(component);
        const box = node.querySelectorAll('.color-box')[0];
        TestUtils.Simulate.click(box);
        expect(onColorChange).toHaveBeenCalled();
    });

});