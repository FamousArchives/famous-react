/* global document */

'use strict';

var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var SpringTransition = require('famous/transitions/SpringTransition');
var SnapTransition = require('famous/transitions/SnapTransition');
var React = require('react');

var FamousReact = require('../../../src');
var DOM = FamousReact.DOM;

Transitionable.registerMethod('spring', SpringTransition);
Transitionable.registerMethod('snap', SnapTransition);

var App = React.createClass({
  displayName: 'demo',
  mixins: [FamousReact.Mixin],

  getInitialState: function() {
    return {
      famous: true
    };
  },
  componentDidMount: function() {
    setInterval(this.toggle, 1000);
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

    var centeredBlock = DOM.span({
      height: 20,
      width: 20,
      align: [0.5, 0.5],
      origin: [0.5, 0.5],
      style: {
        backgroundColor: '#111111'
      }
    });

    var centered = DOM.span({
      ref: 'centered',
      key: 'centered',
      height: 200,
      width: 200
    }, centeredBlock);

    var img = DOM.img({
      ref: 'img',
      key: 'img',
      height: 200,
      width: 200,
      className: 'img-sup',
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
      transform: {
        value: transformX,
        transition: {
          method: 'snap',
          period: 500
        }
      },
      className: 'vid-sup',
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
      width: 600,
      transform: {
        value: transformY,
        transition: {
          method: 'spring',
          period: 500
        }
      }
    }, [img, vid, canvas, centered]);
  }
});
React.renderComponent(App(), document.body);