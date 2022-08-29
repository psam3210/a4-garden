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
- **Rendering the shape**: based on the shape properties, render to the `gardenEl` "canvas" a preview of the shape being created. This preview shape follows the mouse around until it is placed and the mouse cursor should be at the center of the shape.
- **Placing the shape**: when a mouse click occurs, place the shape into the `gardenEl` and create a new preview shape based on the existing configuration.
- **Clearing the canvas**: when the `Clear` button is pressed, clear the `gardenEl` elements and create a new preview shape based on the existing configuration.

### Shapes
We will create shapes out of our good friend, the `<div>` element. There are two shapes we can create: rectangles and circles. They will share certain CSS properties that you will need to adjust such as:

- `color`
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

```
document.querySelector(input[name="shape"]:checked.value // Gets the value of the checked radio button: 'rectangle' or 'circle'

document.querySelector(input[name="rectangle-height"]).value // Gets the value of the rectangle height: '25'
parseInt(document.querySelector(input[name="rectangle-height"]).value) // Gets the value of the rectangle height, and then parses it as an integer: 25
```

Each `<input>` element has a `name` attribute which you can use to target it using `querySelector()`. Keep in mind that you will have to use `this.controlsEl.querySelector()` when you call it from `garden.js`.