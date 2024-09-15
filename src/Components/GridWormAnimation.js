import React, { useEffect, useRef } from 'react';

function GridWormAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Variables and functions
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let SCREEN_WIDTH = window.innerWidth;
    let SCREEN_HEIGHT = window.innerHeight;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      SCREEN_WIDTH = canvas.width;
      SCREEN_HEIGHT = canvas.height;
    };

    setCanvasSize();

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      painter.refreshScreenSize(SCREEN_HEIGHT, SCREEN_WIDTH);
    };

    window.addEventListener('resize', handleResize);

    // GridWorm Animation code
    // Include the GridWorm classes and functions here, adjusted for React

    // GridWorm Class
    class GridWorm {
      constructor(point, interval, pointsList, screenWidth, screenHeight) {
        this.radius = 2;
        this.xCoord = point.x;
        this.yCoord = point.y;
        this.interval = interval;
        this.color = { color: 'rgba(255,0,0,1)', index: 0 }; // Set worms to red color
        this.mainColor = this.color.color; // Red color for the head and body
        this.mainColorIndex = this.color.index;
        this.nColor = { color: 'rgba(255,0,0,1)', index: 0 }; // Red color for arrowhead
        this.arrowHeadColor = this.nColor.color;
        this.arrowHeadColorIndex = this.nColor.index;
        this.pointsList = pointsList;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.speed = 5;
        this.velocity = this.getVelocity();
        this.junctionMemory = [{ point: point, velocity: this.velocity }];
        this.junctionMemoryLength = 6;
      }

      getVelocity() {
        let x, y;
        if (Math.random() > 0.5) {
          x = 0;
          y = Math.random() > 0.5 ? -this.speed : this.speed;
        } else {
          x = Math.random() > 0.5 ? -this.speed : this.speed;
          y = 0;
        }
        return { x: x, y: y };
      }

      drawCircle(x, y, circleradius, ctx, colorIndex) {
        for (let i = 0; i < 3; i++) {
          let color = 'rgba(255,0,0,1)'; // Red color
          let radius = 0;
          switch (i) {
            case 0:
              radius = circleradius;
              break;
            case 1:
              radius = circleradius * 2;
              color = 'rgba(255,0,0,0.5)'; // Red color with reduced opacity
              break;
            case 2:
              radius = circleradius * 6;
              color = 'rgba(255,0,0,0.2)'; // Red color with further reduced opacity
              break;
          }
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.stroke();
        }
      }

      drawArrowHead(x, y, circleradius, ctx, colorIndex) {
        let points = [];
        if (this.velocity.x === 0) {
          if (this.velocity.y > 0) {
            points.push({ x: x + this.interval / 3, y: y });
            points.push({ x: x - this.interval / 3, y: y });
            points.push({ x: x, y: y + this.interval / 3 });
          } else {
            points.push({ x: x + this.interval / 3, y: y });
            points.push({ x: x - this.interval / 3, y: y });
            points.push({ x: x, y: y - this.interval / 3 });
          }
        } else {
          if (this.velocity.x > 0) {
            points.push({ x: x + this.interval / 3, y: y });
            points.push({ x: x, y: y - this.interval / 3 });
            points.push({ x: x, y: y + this.interval / 3 });
          } else {
            points.push({ x: x - this.interval / 3, y: y });
            points.push({ x: x, y: y - this.interval / 3 });
            points.push({ x: x, y: y + this.interval / 3 });
          }
        }

        for (let i = 0; i < points.length; i++) {
          let point = points[i];
          this.drawCircle(point.x, point.y, circleradius / 2, ctx, colorIndex);
        }
        this.drawTriangle(points[0], points[1], points[2], ctx);
      }

      drawTriangle(point1, point2, point3, ctx) {
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.lineTo(point3.x, point3.y);
        ctx.fillStyle = 'rgba(255,0,0,0.1)'; // Red color with very low opacity
        ctx.fill();
      }

      draw(ctx) {
        this.drawCircle(this.xCoord, this.yCoord, this.radius / 2, ctx, this.mainColorIndex);
        this.drawArrowHead(this.xCoord, this.yCoord, this.radius / 2, ctx, this.arrowHeadColorIndex);
        for (let i = 0; i < this.junctionMemory.length; i++) {
          let junction = this.junctionMemory[this.junctionMemory.length - (i + 1)];
          this.drawCircle(junction.point.x, junction.point.y, this.radius / 2, ctx, this.mainColorIndex);
          ctx.fillStyle = 'rgba(255,0,0,0.1)'; // Red color with very low opacity
          ctx.fillRect(junction.point.x, junction.point.y, this.interval, this.interval);
        }
        ctx.strokeStyle = 'red'; // Red color for stroke
        ctx.lineWidth = this.radius;
        ctx.beginPath();
        ctx.moveTo(this.xCoord, this.yCoord);
        for (let i = 0; i < this.junctionMemory.length; i++) {
          let junction = this.junctionMemory[this.junctionMemory.length - (i + 1)];
          ctx.lineTo(junction.point.x, junction.point.y);
        }
        ctx.stroke();
        ctx.closePath();
      }

      update(deltaTime) {
        this.junctionMemoryLength = this.junctionMemoryLength < 1 ? 1 : this.junctionMemoryLength;
        this.xCoord += this.velocity.x;
        this.yCoord += this.velocity.y;
        if (this.xCoord <= this.interval) {
          this.xCoord = this.interval;
          this.velocity.x = -this.velocity.x;
          this.xCoord += this.velocity.x * 3;
        }
        if (this.xCoord >= this.screenWidth - this.interval) {
          this.xCoord = this.junctionMemory[this.junctionMemory.length - 1].point.x;
          this.velocity.x = -this.velocity.x;
          this.xCoord += this.velocity.x * 3;
        }
        if (this.yCoord <= this.interval) {
          this.yCoord = this.interval;
          this.velocity.y = -this.velocity.y;
          this.yCoord += this.velocity.y * 3;
        }
        if (this.yCoord >= this.screenHeight - this.interval) {
          this.yCoord = this.junctionMemory[this.junctionMemory.length - 1].point.y;
          this.velocity.y = -this.velocity.y;
          this.yCoord += this.velocity.y * 4;
        }
        let currentCoord = { x: this.xCoord, y: this.yCoord };
        let latestJunction = this.getJunctionReached(currentCoord);
        if (latestJunction !== currentCoord) {
          let originalVelocity = this.velocity;
          let newVelocity = this.getVelocity();
          if (originalVelocity.y === 0) {
            this.velocity = newVelocity;
            if (newVelocity.y === 0 && newVelocity.x === -originalVelocity.x) {
              // Do nothing
            } else {
              let memory = { point: latestJunction, velocity: this.velocity };
              if (!this.isInMemory(memory)) {
                this.junctionMemory.push(memory);
              }
            }
            this.xCoord += this.velocity.x * 3;
          } else {
            this.velocity = newVelocity;
            if (newVelocity.x === 0 && newVelocity.y === -originalVelocity.y) {
              // Do nothing
            } else {
              let memory = { point: latestJunction, velocity: this.velocity };
              if (!this.isInMemory(memory)) {
                this.junctionMemory.push(memory);
              }
            }
            this.yCoord += this.velocity.y * 3;
          }
        }
        if (this.junctionMemory.length > this.junctionMemoryLength) {
          this.junctionMemory.shift();
        }
      }

      isInMemory(memory) {
        return this.junctionMemory.some(function (mem) {
          return mem.point === memory.point;
        });
      }

      getJunctionReached(currentCoord) {
        for (let i = 0; i < this.pointsList.length; i++) {
          let point = this.pointsList[i];
          if (Math.abs(currentCoord.x - point.x) > 2 * this.interval || Math.abs(currentCoord.y - point.y) > 2 * this.interval) {
            continue;
          }
          let distance = this.getDistance(currentCoord, point);
          if (distance <= this.radius) {
            return point;
          }
        }
        return currentCoord;
      }

      getDistance(p1, p2) {
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
      }
    }

    // Painter Class
    class Painter {
      constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.interval = 40;
        this.points = this.createPoints();
        this.gridWorms = this.createGridWorms();
        this.color = 'rgba(255,0,0,0.1)'; // Red color

        // Handle click event to recreate gridworms
        canvas.addEventListener('click', () => {
          this.points = this.createPoints();
          this.gridWorms = this.createGridWorms();
          this.color = 'rgba(255,0,0,0.1)'; // Red color
        });
      }

      createGridWorms() {
        let gridworms = [],
          numOfGridWorms = 30;
        for (var i = 0; i < numOfGridWorms; i++) {
          let point = this.points[Math.floor(this.getRandomNumber(0, this.points.length - 1))];
          gridworms.push(new GridWorm(point, this.interval, this.points, this.screenWidth, this.screenHeight));
        }
        return gridworms;
      }

      createPoints() {
        let points = [],
          interval = this.interval;
        for (var y = interval; y < this.screenHeight; y += interval) {
          if (y + interval > this.screenHeight) {
            continue;
          }
          for (var x = interval; x < this.screenWidth; x += interval) {
            if (x + interval > this.screenWidth) {
              continue;
            }
            points.push({ x: x, y: y });
          }
        }
        return points;
      }

      getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }

      refreshScreenSize(screenHeight, screenWidth) {
        if (this.screenHeight !== screenHeight || this.screenWidth !== screenWidth) {
          this.screenHeight = screenHeight;
          this.screenWidth = screenWidth;
          this.points = this.createPoints();
          this.gridWorms = this.createGridWorms();
        }
      }

      update(deltaTime) {
        this.gridWorms.forEach(function (gridworm) {
          gridworm.update(deltaTime);
        });
      }

      draw(ctx) {
        this.gridWorms.forEach(function (gridworm) {
          gridworm.draw(ctx);
        });
      }
    }

    // Initialize Painter
    const painter = new Painter(SCREEN_WIDTH, SCREEN_HEIGHT);
    let lastTime = 0;

    const updateCanvas = () => {
      ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      ctx.fillStyle = '#1E1E1E'; // Background color
      ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    };

    const animate = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      updateCanvas();
      painter.refreshScreenSize(SCREEN_HEIGHT, SCREEN_WIDTH);
      painter.update(deltaTime);
      painter.draw(ctx);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      // Cleanup function
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="gridwormCanvas" ref={canvasRef}></canvas>;
}

export default GridWormAnimation;
