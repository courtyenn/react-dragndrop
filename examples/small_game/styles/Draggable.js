var DraggableStyle = {
  "Normal": {
    "backgroundColor": "gray",
    "width": 300,
    "height": 60,
    "textAlign": "center",
    "fontFamily": "sans-serif",
    "cursor": "-webkit-grab",
    "margin": "20px 0"
  },
  "Dragging": {
    "backgroundColor":"whitesmoke",
    "textAlign": "center",
    "fontFamily": "sans-serif",
    "transform": "rotate(-30deg)",
    "cursor": "-webkit-grabbing",
    "position": "absolute"
  }
};

module.exports = DraggableStyle;
