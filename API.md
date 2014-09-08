These are just some thoughts I'm collecting on the API

## Transitionable Attributes

- translate
- rotate
- scale
- skew
- perspective
- height
- width
- opacity
- origin
- align
- transform

### Sugar attributes (also transitionable)

- center
- x
- y

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

## Mounted/Unmounted Animation

- Animation states are
  - unmounted (not rendered)
  - mounting (rendered)
  - mounted (rendered and animation complete)
  - unmounting (rendered, but being removed)
- Animations can be specified for mounting and unmounting states
- Start and finish values are specified with `unmounted` and `mounted`

### Automatic

Animates opacity `0 -> 1 -> 0`

In this case, the default famous animation will be used to transition.

```js
var txt = DOM.div({
  opacity: {
    unmounted: 0,
    mounted: 1
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
    unmounted: 0,
    mounted: 500,
    transition: spring
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
    unmounted: 0,
    mounted: 500,
    transition: {
      mounting: spring,
      unmounting: ease
    }
  }
});
```

### Animation Functions

If you want to plug in custom sequences (documented below) or transitions, you can simply specify one.

```js
// in this case we just invert the animation
var bounceUp = bounceDown.inverse();

var txt = DOM.div({
  mount: bounceDown,
  unmount: bounceUp
});
```

## Chaining Animations

### Sequences

In all aspects of famous-react, animations are "sequences".

- unmounted -> mounted
- mounted -> unmounted
- Component property changes

Sequences are simply a set of updates to be performed on a modifier, including all transition information.

### Creating Sequences

In this example the element will bounce down 200px, ease over 500px, bounce up to 0px, bounce down 200px, then ease over 500px.

```js
var spring = require('animation-spring');
var ease = require('animation-ease');

var springInst = spring({
  duration: 750,
  dampingRatio: 500
});

// spring y to 0
var bounceUp = {
  y: {
    value: 0,
    transition: springInst
  }
};

// spring y to 200
var bounceDown = {
  y: {
    value: 200,
    transition: springInst
  }
};

// add 500 to current x
// stateful animations are specified
// as functions
var slideOver = function(curr){
  return {
    x: {
      value: curr.x + 500,
      transition: ease({
        duration: 100
      })
    }
  };
};

// specify one portion of our animation
// as its own piece
var bounceUpAndDown = sequence()
  .step(bounceUp)
  .step(bounceDown);

var animIn = sequence()
  .step(bounceDown)
  .step(slideOver)
  .step(bounceUpAndDown)
  .step(slideOver);

var animOut = animIn.inverse();
```
