/* global document */

'use strict';

var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var SpringTransition = require('famous/transitions/SpringTransition');
var React = require('react');

var FamousReact = require('../../../src');
var DOM = FamousReact.DOM;

Transitionable.registerMethod('spring', SpringTransition);

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
    var headerText = this.state.famous ? 'Hello Famous' : 'Hello React';
    var translateX = this.state.famous ? 0 : 200;
    var transform = Transform.translate(0, translateX, 0);
    var header = DOM.div({
      ref: 'header',
      key: 'header',
      origin: [0.5, 0.5],
      align: [0, 1],
    }, headerText);

    var img = DOM.img({
      ref: 'img',
      key: 'img',
      height: 200,
      width: 200,
      opacity: {
        value: 0.8,
        transition: null
      },
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
        value: transform,
        transition: {
          method: 'spring',
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

    return DOM.div(null, [img, vid, canvas, header]);
  }
});
React.renderComponent(App(), document.body);