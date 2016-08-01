var DropTargetStyles = {
  "BaseStyle": {
    "position": "absolute",
    "backgroundColor": "rgb(200, 230, 255)",
    "zIndex": "1",
    "height": 100,
    "width": 200,
    "left": 350
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
  },
  "Styled": {
    "position": "absolute",
    "width": 200,
    "minHeight": 100,
    "left": 350,
    "backgroundColor": "pink",
    "top": 600
  }
};

module.exports = DropTargetStyles;
