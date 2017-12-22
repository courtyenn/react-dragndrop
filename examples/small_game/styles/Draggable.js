var DraggableStyle = {
  "Normal": {
    "backgroundColor": "gray",
    "width": 300,
    "height": 60,
    "textAlign": "center",
    "fontFamily": "sans-serif",
    "cursor": "-webkit-grab",
    "margin": "20px 0",
    "zIndex": 2
  },
  "Ghost": {
    "boxSizing": "border-box",
    "backgroundColor": "transparent",
    "width": 300,
    "height": 60,
    "textAlign": "center",
    "fontFamily": "sans-serif",
    "cursor": "-webkit-grab",
    "margin": "20px 0",
    "zIndex": 2,
    "border": "4px dashed gray"
  },
  "Dragging": {
    "backgroundColor":"whitesmoke",
    "textAlign": "center",
    "fontFamily": "sans-serif",
    "transform": "rotate(-30deg)",
    "cursor": "-webkit-grabbing",
    "position": "absolute"
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

module.exports = DraggableStyle;
