/* global document, window */

'use strict';

var Timer = require('famous/utilities/Timer');
var Transform = require('famous/core/Transform');
var Spring = require('famous/transitions/SpringTransition');
var Wall = require('famous/transitions/WallTransition');

var React = require('react');
window.React = React; // for dev

var FamousReact = require('../../../src');
var Transitionable = FamousReact.Transitionable;
var DOM = FamousReact.DOM;

var App = React.createClass({
  displayName: 'demo',

  getInitialState: function() {
    return {
      famous: false,
      animation: Spring
    };
  },
  componentDidMount: function() {
    this.interval = Timer.setInterval(this.toggle, 1000);
  },
  componentWillUnmount: function() {
    Timer.clear(this.interval);
  },
  toggle: function() {
    this.setState({
      famous: !this.state.famous
    });
  },

  render: function() {
    var swap1 = this.state.famous ? 0 : 600;
    var swap2 = this.state.famous ? 0 : -600;
    var translate = this.state.famous ? 0 : 200;
    var scale = this.state.famous ? 2 : 1;
    
    var swap1Transform = Transitionable(Transform.translate(swap1, 0, 0), {
      method: this.state.animation,
      period: 500
    });
    var swap2Transform = Transitionable(Transform.translate(swap2, 0, 0), {
      method: this.state.animation,
      period: 500
    });

    var transformX = Transitionable(Transform.translate(0, translate, 0), {
      method: this.state.animation,
      period: 500
    });
    var transformY = Transitionable(Transform.translate(translate, 0, 0), {
      method: this.state.animation,
      period: 500
    });
    var transformScale = Transitionable(Transform.scale(scale), {
      method: this.state.animation,
      period: 500
    });

    var centeredBlock = DOM.div({
      height: 50,
      width: 50,
      center: true,
      transform: transformScale,
      style: {
        backgroundColor: '#0074D9'
      }
    });

    var centered = DOM.div({
      key: 'centered',
      height: 200,
      width: 200,
      style: {
        backgroundColor: '#111111',
        display: 'inline-block'
      }
    }, centeredBlock);

    var img = DOM.img({
      ref: 'img',
      key: 'img',
      height: 200,
      width: 200,
      transform: swap1Transform,
      src: 'famous_logo.png'
    });

    var img2 = DOM.img({
      ref: 'img2',
      key: 'img2',
      height: 200,
      width: 200,
      transform: swap2Transform,
      src: 'react_logo.png'
    });

    var vid = DOM.video({
      ref: 'vid',
      key: 'vid',
      height: 200,
      width: 200,
      muted: true,
      loop: true,
      autoPlay: true,
      style: {
        backgroundColor: '#111111'
      },
      transform: transformX,
      src: './dizzy.mp4'
    });

    var container = DOM.div({
      height: 200,
      width: 800,
      transform: transformY,
    }, [img, vid, centered, img2]);

    return container;
  }
});
React.renderComponent(App(), document.body);