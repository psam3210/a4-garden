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

      <input type="range" id="rectangle-width" name="rectangle-width" value="25" min="1" max="100" step="1" list="tickmarks-rectangle-width">
      <input type="range" id="rectangle-height" name="rectangle-height" value="25" min="1" max="100" step="1" list="tickmarks-rectangle-height">
      <input type="color" id="rectangle-color" name="rectangle-color">

      <input type="range" id="circle-radius" name="circle-radius" value="5" min="1" max="100" step="1" list="tickmarks-circle-radius">
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
      radius: 5,
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
    expect(el.style.left).toBe('-12.5vw');
    expect(el.style.top).toBe('-12.5vh');
  });

  it('should render position as a circle', () => {
    controlsEl.querySelector('#rectangle').checked = false;
    controlsEl.querySelector('#circle').checked = true;

    let g = new Garden(gardenEl, controlsEl);
    let el = gardenEl.firstChild;
    expect(getComputedStyle(el).getPropertyValue('background-color')).toBe('absolute');
    expect(el.offsetTop).toBe('-12.5vw');
    expect(el.style.top).toBe('-12.5vh');
  });
});