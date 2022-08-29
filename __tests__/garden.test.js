/**
 * @jest-environment jsdom
 */

import {jest} from '@jest/globals';
import Garden from './../garden';

let gardenEl, controlsEl;

  beforeEach(() => {
    gardenEl = document.createElement('div');
    Object.defineProperty(gardenEl, 'clientWidth', { value: 1024});
    Object.defineProperty(gardenEl, 'clientHeight', { value: 768});

    controlsEl = document.createElement('div');
    controlsEl.innerHTML = `
      <input type="radio" id="rectangle" name="shape" value="rectangle" checked>
      <input type="radio" id="circle" name="shape" value="circle">

      <input type="range" id="rectangle-width" name="rectangle-width" value="25" min="1" max="1000" step="1" list="tickmarks-rectangle-width">
      <input type="range" id="rectangle-height" name="rectangle-height" value="25" min="1" max="1000" step="1" list="tickmarks-rectangle-height">
      <input type="color" id="rectangle-color" name="rectangle-color">

      <input type="range" id="circle-radius" name="circle-radius" value="25" min="1" max="1000" step="1" list="tickmarks-circle-radius">
      <input type="color" id="circle-color" name="circle-color">
    `
  });

describe('Set shape correctly', () => {
  it('when shape is rectangle', () => { 
    let g = new Garden(gardenEl, controlsEl);
    expect(g.activeShape).toEqual({
      color: '#000000',
      height: 25,
      width: 25,
      type: 'rectangle',
      pos: {
        x: 0,
        y: 0
      }
    });
  });

  it('when shape is a circle', () => { 
    controlsEl.querySelector('#rectangle').checked = false;
    controlsEl.querySelector('#circle').checked = true;
    let g = new Garden(gardenEl, controlsEl);
    expect(g.activeShape).toEqual({
      color: '#000000',
      radius: 25,
      type: 'circle',
      pos: {
        x: 0,
        y: 0
      }
    });
  });
});

describe('Render shape correctly', () => {
  it('should render one element to the dom', () => {
    let g = new Garden(gardenEl, controlsEl);
    expect(gardenEl.childElementCount).toBe(1);
  });

  it('should render color', () => {
    controlsEl.querySelector('#rectangle-color').value = '#0000ff';
    let g = new Garden(gardenEl, controlsEl);
    let el = gardenEl.firstChild;
    expect(getComputedStyle(el).getPropertyValue('background-color')).toBe('rgb(0, 0, 255)');
  });

  it('should render position as a rectangle', () => {
    let g = new Garden(gardenEl, controlsEl);
    let el = gardenEl.firstChild;
    expect(getComputedStyle(el).getPropertyValue('position')).toBe('absolute');
    expect(getComputedStyle(el).getPropertyValue('top')).toBe('-12.5px');
    expect(getComputedStyle(el).getPropertyValue('left')).toBe('-12.5px');
  });

  it('should render position as a circle', () => {
    controlsEl.querySelector('#rectangle').checked = false;
    controlsEl.querySelector('#circle').checked = true;

    let g = new Garden(gardenEl, controlsEl);
    let el = gardenEl.firstChild;
    expect(getComputedStyle(el).getPropertyValue('position')).toBe('absolute');
    expect(getComputedStyle(el).getPropertyValue('top')).toBe('-25px');
    expect(getComputedStyle(el).getPropertyValue('left')).toBe('-25px');
  });

  it('should render position after mouse move', () => {
    let g = new Garden(gardenEl, controlsEl);

    let cx = Math.round(Math.random()*10);
    let cy = Math.round(Math.random()*10);

    let me = new MouseEvent('mousemove', {
      clientX: cx,
      clientY: cy,
    });
    gardenEl.dispatchEvent(me);
    
    let el = gardenEl.firstChild;
    
    expect(getComputedStyle(el).getPropertyValue('top')).toBe(`${-12.5+cy}px`);
    expect(getComputedStyle(el).getPropertyValue('left')).toBe(`${-12.5+cx}px`);
  });

  it('should render shape after input change and mouse move', () => {
    let g = new Garden(gardenEl, controlsEl);

    controlsEl.querySelector('#rectangle-width').value = '500';
    controlsEl.querySelector('#rectangle-width').dispatchEvent(new Event('input'));

    let cx = Math.round(Math.random()*10);
    let cy = Math.round(Math.random()*10);

    let me = new MouseEvent('mousemove', {
      clientX: cx,
      clientY: cy,
    });
    gardenEl.dispatchEvent(me);
    
    let el = gardenEl.firstChild;
    
    expect(getComputedStyle(el).getPropertyValue('top')).toBe(`${-12.5+cy}px`);
    expect(getComputedStyle(el).getPropertyValue('left')).toBe(`${-250+cx}px`);
  });
});

describe('Place shape correctly', () => {
  it('should place shape and create another', () => {
    let g = new Garden(gardenEl, controlsEl);
    gardenEl.dispatchEvent(new MouseEvent('click'));

    let me = new MouseEvent('mousemove', {
      clientX: 10,
      clientY: 10,
    });
    gardenEl.dispatchEvent(me);

    expect(gardenEl.childElementCount).toBe(2);

    let firstEl = gardenEl.children[0];
    expect(getComputedStyle(firstEl).getPropertyValue('top')).toBe('-12.5px');
    expect(getComputedStyle(firstEl).getPropertyValue('left')).toBe('-12.5px');

    let secondEl = gardenEl.children[1];
    expect(getComputedStyle(secondEl).getPropertyValue('top')).toBe('-2.5px');
    expect(getComputedStyle(secondEl).getPropertyValue('left')).toBe('-2.5px');
  });
});

describe('Clear garden correctly', () => {
  it('should remove all elements from garden and recreate a render', () => {
    let g = new Garden(gardenEl, controlsEl);
    gardenEl.dispatchEvent(new MouseEvent('click'));
    gardenEl.dispatchEvent(new MouseEvent('click'));

    expect(gardenEl.childElementCount).toBe(3);

    g.clear();

    expect(gardenEl.childElementCount).toBe(1);
  });
});