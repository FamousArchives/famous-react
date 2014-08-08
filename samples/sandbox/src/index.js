/* global document */

'use strict';

var Timer = require('famous/utilities/Timer');
var Transform = require('famous/core/Transform');
var React = require('react');
window.React = React; // for dev

var FamousReact = require('../../../src');
var Transitionable = FamousReact.Transitionable;
var DOM = FamousReact.DOM;

var App = React.createClass({
  displayName: 'demo',

  getInitialState: function() {
    return {
      famous: true
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

  imageClick: function(e) {
    this.drawImage(this.refs.img.getDOMNode());
  },
  videoClick: function(e) {
    this.drawImage(this.refs.vid.getDOMNode());
  },
  drawImage: function(img) {
    var ctx = this.refs.canvas.getDOMNode().getContext('2d');
    ctx.drawImage(img, 0, 0, 200, 200);
  },

  render: function() {
    var imageUrl = this.state.famous ? 'famous_logo.png' : 'react_logo.png';
    var translateX = this.state.famous ? 0 : 200;
    var transformX = Transform.translate(0, translateX, 0);
    var translateY = this.state.famous ? 200 : 0;
    var transformY = Transform.translate(translateY, 0, 0);
    var scale = this.state.famous ? 1 : 2;
    var transformScale = Transform.scale(scale);

    var centeredBlock = DOM.div({
      ref: 'centeredBlock',
      key: 'centeredBlock',
      height: 50,
      width: 50,
      align: [0.5, 0.5],
      origin: [0.5, 0.5],
      transform: Transitionable(transformScale, true),
      style: {
        backgroundColor: '#0074D9'
      }
    });

    var centered = DOM.div({
      ref: 'centered',
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
      src: imageUrl,
      onClick: this.imageClick
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
      transform: Transitionable(transformX, true),
      src: './dizzy.mp4',
      onClick: this.videoClick
    });

    var canvas = DOM.canvas({
      ref: 'canvas',
      key: 'canvas',
      height: 200,
      width: 200,
      style: {
        backgroundColor: '#0074D9'
      }
    });

    return DOM.div({
      height: 200,
      width: 800,
      transform: Transitionable(transformY, true),
    }, [img, vid, canvas, centered]);
  }
});
React.renderComponent(App(), document.body);