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

    const lineBreak = document.createElement("br");
    container.appendChild(lineBreak);

    this.undoBtn = document.createElement("button");
    this.undoBtn.className = "btn btn-dark mt-2";
    this.undoBtn.innerHTML = "UNDO";
    container.appendChild(this.undoBtn);

    this.ctx = this.canvas.getContext("2d");

    this.reset();

    // Listeners for mouse actions (private method)
    this.#addEventListeners();
  }

  reset() {
    this.paths = [];
    this.isDrawing = false;
    this.#redraw();
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
    document.onmouseup = () => {
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
    document.ontouchend = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmouseup(loc);
    };

    // Button events
    this.undoBtn.onclick = () => {
      this.paths.pop();
      this.#redraw();
    };
  }

  #redraw() {
    // Clearing the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw the path
    // Implement a draw utility object
    draw.paths(this.ctx, this.paths);
    if (this.paths.length > 0) {
      this.undoBtn.disabled = false;
    } else {
      this.undoBtn.disabled = true;
    }
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
