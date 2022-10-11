# A4: Garden

Refer back to A1 for information on running the development server, and with running tests locally.

<img src="https://user-images.githubusercontent.com/207651/187252286-47234c93-0249-46d4-b591-955f8c326bb1.gif" width="500">

Create a virtual garden which implements the ability to render and place elements where you click your mouse. Inspiration for this assignment is based on the demo for [Put That There](https://www.youtube.com/watch?v=RyBEUyEtxQo).

You may choose to complete this assignment individually or with a partner.

You will learn: DOM and JS Relationship, Functions, Modularizing code, Event listeners

## Approach

In this assignment, we’ll be using HTML to create our garden. The webpage is composed of a `#controls` element, which floats above the page, and a `#garden` element, which contains our garden elements. The controls in the `#controls` element will adjust the CSS properties of `<div>`s which form the components of our garden. 

In our garden, we can make two basic shapes: rectangles and squares. Rectangles contain a width and a height, as well as a color. Circles contain a radius and color. You can only place one shape at a time, and once you place the shape by clicking on the mouse, another shape with the same properties will immediately take its place. We can control where the shape is placed by moving the mouse around, and the shape will follow our mouse as we move it. We can manipulate a `<div>` to do this by setting it `position: absolute;` and setting its `top` and `left` properties. This will place it `absolute`ly in relation to its nearest `relative` parent, the `#garden` element.

Our shapes will respond to our inputs, dynamically adjusting their visual form in response to toggling and sliding around the control panel. In addition, clicking `Clear` will remove all elements of the garden and leave us just with a shape before it is placed. 

We will provide the control panel, as well as the garden container, but you will be responsible for handling all the actual behavior of the garden. We can break down this behavior into the following:

- **Handling interaction**: you will be responsible for handling `input` events on all `<input>` fields, `mousemove` and `click` events on the provided `gardenEl` parameter passed in the constructor.
- **Setting the shape**: read the input values and set the shape properties accordingly, based on shape type. These values should update as the inputs are being adjusted. 
- **Rendering the shape**: based on the shape properties, render to the `gardenEl` "canvas" a preview of the shape being created. This preview shape follows the mouse around until it is placed and the mouse cursor should be at the center of the shape. We should see a preview the minute the page loads.
- **Placing the shape**: when a mouse click occurs, place the shape into the `gardenEl` and create a new preview shape based on the existing configuration.
- **Clearing the canvas**: when the `Clear` button is pressed, clear the `gardenEl` elements and create a new preview shape based on the existing configuration.

### Shapes
We will create shapes out of our good friend, the `<div>` element. There are two shapes we can create: rectangles and circles. They will share certain CSS properties that you will need to adjust such as:

- `background-color`
- `position` (this should always be absolute)
- `left`
- `top`
- `border-radius`
- `width`
- `height`

#### Rectangle
Rectangles will have an input for both width and height, as well as color. You will set the properties as follows:
- `width` and `height` should correspond to the inputs for each.
- `top` and `left` should be offset by half the `height` and `width` respectively.
- `border-radius` should be `0%` for the `<div>` to appear normally without rounded corners.

#### Circles
The input for circles are its radius and color, so you will need to set its properties accordingly:
- `width` and `height` are both twice the value of the radius. 
- `top` and `left` should be offset by the radius in order for the shape to be centered.
- `border-radius` should be `100%` in order for the `<div>` to appear as a circle.


## Implementation

You will be provided with an `index.html` and `garden.js` file. All your code should be written in `garden.js`. 

### `index.html`
The `index.html` file will contain the canvas on which add shapes, as well as a control `div`. When we load the page, we will initialize a new instance of a `Garden` class, and provide it the `gardenEl` element `#garden`, as well as the `controlsEl` element `#controls`. We also create an event listener which will call a `clear()` function.

The `#controls` div contains the following input controls:
- Two radio buttons, which determine which shape type you are creating. 
- Rectangle width input slider, which ranges from 1 to 1000px.
- Rectangle height input slider, which ranges from 1 to 1000px.
- Rectangle color picker.
- Circle radius input slider, which ranges from 1 to 1000px.
- Circle color picker.

For `<input>` values, you can use `element.querySelector()` to target the element and the `value` property to get its value as a string. You may need to then wrap it in `parseInt()` in order to get an integer value. Here’s an example:

```js
document.querySelector('input[name="shape"]:checked').value // Gets the value of the checked radio button: 'rectangle' or 'circle'

document.querySelector('input[name="rectangle-height"]').value // Gets the value of the rectangle height: '25'
parseInt(document.querySelector('input[name="rectangle-height"]').value) // Gets the value of the rectangle height, and then parses it as an integer: 25
```

Each `<input>` element has a `name` attribute which you can use to target it using `querySelector()`. Keep in mind that you will have to use `this.controlsEl.querySelector()` when you call it from `garden.js`.

### `garden.js`
You will be implementing a `Garden` class, which handles the functionality of our garden. There is some basic code there to get you going, but you will need to add your own data structures and functions to flesh it fully out. The only function you *must* implement is a `clear()` function. Otherwise, the implementation is up to you. 

A good way to begin planning sketching out your code is to think about which functions `Garden` should support and sketch it out. Here is one potential way to do it, based on the requirements outlined above:
```js
class Garden {
  constructor(gardenEl, controlsEl) // Constructor, do not change function signature.
  initInteraction()
  setShape()
  renderShape()
  placeShape()
  clear() // Required.
}
```

One thing you may notice is there is one class method per behavior outlined above. This is because your job as a developer is to understand how to tease apart project requirements into reusable chunks of code. Each function should do one thing in particular. You may abide by this, add additional functions, or approach it on your own, but I think the above is a pretty good starting point.

#### `constructor(gardenEl, controlsEl)`
The constructor gets called immediately and so anything you want to happen right away, such as initializing interaction, setting the shape, and rendering the shape should happen here. You’ll also set up your instance variables here. Take stock of what you may need to keep track of as state throughout the life of a `Garden` object. You may want to hold as an instance variable:
- `this.activeShape = {}` which initializes an empty object mapping, which will later hold the properties of the shape being created.
- `this.mousePos = {x: 0, y: 0}` which contains the current position of the mouse cursor.
- `this.activeShapeEl = null` which points to the element that is being created.

#### `initInteraction()`
This function will set up all the interaction, including:
- Adding a `mousemove` event listener to the garden element which updates the mouse position, and rerenders the shape.
- Placing the shape when a `click` event occurs on the garden element
- Adding an `input` event listener for all `<input>`s in the controls element which sets the shape properties, and then renders the shape (HINT: when you rerender, you can just update the properties of an existing `activeShapeEl`).

#### `setShape()`
Here, we’ll just update the properties of `this.activeShape`. It won’t do anything visual. We’ll first want to clear its values and set it to `{}`, and then set the relevant properties as such:
```js
// Rectangle
this.activeShape = {
  color: '#000000',
  width: 25,
  height: 25,
  type: 'rectangle'
}

// Circle
this.activeShape = {
  color: '#000000',
  radius: 25,
  type: 'circle'
}
```

To do this, we’ll use the `querySelector()` function to get the values from all the inputs and update `this.activeShape` each time the function is called. 

#### `renderShape()`
This function should create an element if `this.activeShapeEl` is `null` and set it to that. You can create the element by calling:

```js
this.activeShapeEl = document.createElement('div');
this.gardenEl.appendChild(this.activeShapeEl);
```

Then, depending on the shape type (which we store in `this.activeShape.type`) update its `style` attribute. For example, we could set the width of the element if it is a rectangle like so:

```js
this.activeShapeEl.style.width = `${this.activeShape.width}px`;
```

You may need to do some clever math to position the mouse directly in the center of the element, as traditionally the top left is based relative to the top left of the element. (May I suggest something like `this.mousePos.x - this.activeShape.radius` for the `left` attribute for Circle?)

#### `placeShape()`
This places the shape and creates a new one. One really easy way to do this is to just create a new element and set `activeShapeEl` to that new element. Perhaps we should make a function for `createEl()` since we use it in this and `renderShape()`.

Once the element has been placed, re-render a new preview shape.

#### `clear()`
Clears all the contents of `this.gardenEl` and then creates a new preview shape.

## Submission

Besides submitting this via GitHub, please also include a screenshot of a creation you make using this! We’ll use it to create a small gallery in our site. You won’t be graded on the contents of your creation, just that you submitted one, so go wild!