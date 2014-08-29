These are just some thoughts I'm collecting on the API

## Transitionable Attributes

- x
- y
- z
- scale
- skew
- perspective
- height
- width
- opacity
- origin
- align
- transform

### Sugar attributes

- center

## Animation functions

Animation modules will be functions that take arguments to produce famous Transitionables. Renderable animations will support animation functions or Transitionables. When given an animation function, default options will be used.

```js
var spring = require('animation-spring');

var springAnim = spring({
  duration: 1000, // 1 second
  dampingRatio: 500
});
```

## No Animation

If you don't want to animate something, but still want to take advantage of alignment/transforms/etc. you can simply pass a value in and it will be applied immediately.

```js
var txt = DOM.div({
  opacity: 0.5,
  center: 'vertical',
  perspective: 1000
});
```

## Enter/Exit Animation

- Animation states are
  - inactive (not rendered)
  - activating (rendered)
  - active (rendered and animation complete)
  - deactivating (rendered, but being removed)
- Animations can be specified for activating and deactivating states
- Start and finish values are specified with `active` and `inactive`

### Automatic

Animates opacity `0 -> 1 -> 0`

In this case, the default famous animation will be used to transition.

```js
var txt = DOM.div({
  opacity: {
    inactive: 0,
    active: 1
  }
});
```

### Custom

Animates a Y transform `0 -> 500 -> 0`

In this case, the element will bounce down when rendered and bounce up when removed.

```js
var spring = require('animation-spring');

var txt = DOM.div({
  y: {
    inactive: 0,
    active: 500,
    animation: spring()
  }
});
```

### Custom (per-state)

Animates a Y transform `0 -> 500 -> 0`

In this case, the element will bounce down when rendered but ease out when removed.

```js
var spring = require('animation-spring');
var ease = require('animation-ease');

var txt = DOM.div({
  y: {
    inactive: 0,
    active: 500,
    animation: {
      activate: spring,
      deactivate: ease
    }
  }
});
```

### Animation Functions

If you want to plug in custom sequences (documented below) or transitions, you can simply specify one.

```j
var txt = DOM.div({
  activate: bounceDown,
  deactivate: bounceOut
});
```

## Chaining Animations

### Creating Sequences

In this example the element will bounce down 200px, ease over 500px, bounce up to 0px, bounce down 200px, then ease over 500px.

```js
var spring = require('animation-spring');
var ease = require('animation-ease');

// spring y to 0
var bounceUp = {
  y: {
    value: 0,
    animation: spring,
    duration: 750
  }
};

// spring y to 200
var bounceDown = {
  y: {
    value: 200,
    animation: spring,
    duration: 750
  }
};

// add 500 to current x
var slideOver = function(curr){
  return {
    x: {
      value: curr.x + 500,
      animation: ease,
      duration: 100
    }
  };
};

var bounceUpAndDown = animation()
  .step(bounceUp)
  .step(bounceDown);

var anim = animation()
  .step(bounceDown)
  .step(slideOver)
  .step(bounceUpAndDown)
  .step(slideOver);
```

##### TODO: This is a work in progress

Notes:

- Need to be able to nest sequences recursively
- Need to specify sequence steps
- Need to specify N animations per sequence step
- Need to specify duration of each animation
  - step duration will be the total of all sub-animations durations
- Step animations can be either plain objects or functions that return objects
- Current animation state will be passed into step animation functions