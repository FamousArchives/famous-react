'use strict';

function propSugar(nextProps) {
  if (nextProps.center) {
    if (nextProps.center === 'vertical') {
      nextProps.align = [0, 0.5];
      nextProps.origin = [0, 0.5];
    } else if (nextProps.center === 'horizontal') {
      nextProps.align = [0.5, 0];
      nextProps.origin = [0.5, 0];
    } else if (nextProps.center === true) {
      nextProps.origin = [0.5, 0.5];
      nextProps.align = [0.5, 0.5];
    }
  }

  var xyz = [0, 0, 0];
  var xyzUsed = false;
  if (typeof nextProps.x === 'number') {
    xyz[0] = nextProps.x;
    xyzUsed = true;
  }
  if (typeof nextProps.y === 'number') {
    xyz[1] = nextProps.y;
    xyzUsed = true;
  }
  if (typeof nextProps.z === 'number') {
    xyz[2] = nextProps.z;
    xyzUsed = true;
  }
  if (!nextProps.transform && xyzUsed) {
    nextProps.transform = xyz;
  }
  return nextProps;
}

module.exports = propSugar;