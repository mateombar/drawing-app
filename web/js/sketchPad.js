class SketchPad {
  constructor(container, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
            background-color: white;
            box-shadow: 0px 0px 10px 2px black;
        `;
    container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");

    this.paths = [];
    this.isDrawing = false;

    // Listeners for mouse actions (private method)
    this.#addEventListeners();
  }

  //   Private method means that it can not be called outside this class
  #addEventListeners() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.#getMouse(evt);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#redraw();
      }
    };

    // End drawing
    this.canvas.onmouseup = () => {
      this.isDrawing = false;
    };

    // Mobile listeners
    this.canvas.ontouchstart = (evt) => {
      // Get the locations
      const loc = evt.touches[0];
      this.canvas.onmousedown(loc);
    };
    this.canvas.ontouchmove = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmousemove(loc);
    };
    this.canvas.ontouchend = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmouseup(loc);
    };
  }

  #redraw() {
    // Clearing the canvas
    this.ctx.clearRect[(0, 0, this.canvas.width, this.canvas.height)];
    // Draw the path
    // Implement a draw utility object
    draw.paths(this.ctx, this.paths);
  }

  // Get the coordinates of the mouse event
  #getMouse = (evt) => {
    //   Get the rectangle of the canvas bounding area
    const rect = this.canvas.getBoundingClientRect();

    //   Get the mouse coordinates
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ];
  };
}
