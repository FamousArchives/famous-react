/* global document */

'use strict';

var Transform = require('famous/core/Transform');
var React = require('react');

var FamousReact = require('../../../src');
var DOM = FamousReact.DOM;

var App = React.createClass({
  displayName: 'demo',
  //mixins: [FamousReact.Mixin],

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

  contextClick: function() {
    console.log('context clicked');
    var ctx = this.refs.canvas.getDOMNode().getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillText('context clicked', 100, 100);
  },
  imageClick: function(e) {
    e.stopPropagation();
    console.log('img clicked');
    var img = this.refs.img.getDOMNode();
    var ctx = this.refs.canvas.getDOMNode().getContext('2d');
    ctx.drawImage(img, 0, 0, 200, 200);
  },
  videoClick: function(e) {
    e.stopPropagation();
    console.log('video clicked');
    var vid = this.refs.vid.getDOMNode();
    var ctx = this.refs.canvas.getDOMNode().getContext('2d');
    ctx.drawImage(vid, 0, 0, 200, 200);
  },
  headerClick: function(e) {
    e.stopPropagation();
    console.log('header clicked');
  },

  render: function() {
    var imageUrl = this.state.famous ? 'famous_logo.png' : 'react_logo.png';
    var headerText = this.state.famous ? 'Hello Famous' : 'Hello React';
    var translateX = this.state.famous ? 0 : 200;
    var transform = Transform.translate(0, translateX, 0);

    var header = DOM.div({
      ref: 'header',
      key: 'header',
      className: 'buddy',
      onClick: this.headerClick
    }, headerText);

    var img = DOM.img({
      ref: 'img',
      key: 'img',
      height: 200,
      width: 200,
      opacity: {
        value: 0.5,
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
      loop: true,
      autoPlay: true,
      transform: transform,
      className: 'vid-sup',
      src: './dizzy.mp4',
      onClick: this.videoClick
    });

    var canvas = DOM.canvas({
      ref: 'canvas',
      key: 'canvas',
      height: 200,
      width: 200
    });

    return DOM.div({
      ref: 'container',
      key: 'container',
      className: 'ctx-sup',
      onClick: this.contextClick
    }, [img, vid, canvas, header]);
  }
});
React.renderComponent(App(), document.body);