var DropTargetStyles = {
  "BaseStyle": {
    "position": "absolute",
    "backgroundColor": "rgb(200, 230, 255)",
    "zIndex": "1",
    "height": 400,
    "width": 400,
    "left": 500
  },
  "Dropping": {
    "backgroundColor": "pink",
    "padding": "20px"
  },
  "Dropped": {
    "backgroundColor": "seagreen",
    "width": 300,
    "height": 60,
    "textAlign": "center",
    "fontFamily": "sans-serif",
    "cursor": "-webkit-grab",
    "margin": "20px 0",
    "zIndex": 2
  }
};

module.exports = DropTargetStyles;
