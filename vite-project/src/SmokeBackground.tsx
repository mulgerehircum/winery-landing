import { useEffect, useRef } from 'react';

const CURVES = 5;
const STEPS = 35;
const SPEED = 0.4;
const CIGARETTE_ORIGIN_WIDTH = 80;
const MAX_LENGTH = 512;
const MIN_LENGTH = 256;
const WHISKER_LENGTH = 128;
const STROKE_COLOR = 'dimgray';
const STROKE_WIDTH = 0.15;

// Optimized: inline random calculation
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

// Optimized: reuse array to reduce allocations
function interpolatePoints(pointA: number[], pointB: number[], progress: number, out?: number[]): number[] {
  if (!out) out = [0, 0];
  out[0] = progress * (pointA[0] - pointB[0]) + pointB[0];
  out[1] = progress * (pointA[1] - pointB[1]) + pointB[1];
  return out;
}

interface Bezier {
  startPoint: number[];
  endPoint: number[];
  cp1: number[];
  cp2: number[];
}

class Curve {
  startPoint: number[];
  length: number;
  startWhiskerLength: number;
  endWhiskerLength: number;
  endPoint: number[];
  interpolatedCurves: Curve[] = [];
  forcedBezier?: Bezier;
  maxWidth: number;
  minWidth: number;
  originX: number;
  currentY: number;
  private _cachedBezier?: Bezier; // Cache bezier calculation

  constructor(params: { startPoint?: number[]; forcedBezier?: Bezier; maxWidth?: number; minWidth?: number; originX?: number; currentY?: number } = {}) {
    this.maxWidth = params.maxWidth || 256;
    this.minWidth = params.minWidth || 128;
    this.originX = params.originX ?? 0;
    this.currentY = params.currentY ?? (params.startPoint ? params.startPoint[1] : 0);

    if (params.forcedBezier) {
      this.forcedBezier = params.forcedBezier;
      this.startPoint = params.forcedBezier.startPoint;
      this.endPoint = params.forcedBezier.endPoint;
      this.length = 0;
      this.startWhiskerLength = WHISKER_LENGTH;
      this.endWhiskerLength = WHISKER_LENGTH;
      return;
    }

    this.startPoint = params.startPoint || [randomInRange(0, this.maxWidth), 0];
    this.length = randomInRange(MIN_LENGTH, MAX_LENGTH);
    this.startWhiskerLength = WHISKER_LENGTH;
    this.endWhiskerLength = WHISKER_LENGTH;

    // Optimized: calculate spread factor once
    const startX = this.startPoint[0];
    const heightRatio = Math.min(1, this.currentY / (this.maxWidth * 2));
    const spreadFactor = 0.2 + (heightRatio * 0.6);
    const maxDrift = this.maxWidth * spreadFactor;
    
    // Clamp endX in one operation
    const endX = Math.max(0, Math.min(this.maxWidth, startX + randomInRange(-maxDrift, maxDrift)));
    this.endPoint = [endX, this.startPoint[1] + this.length];
  }

  draw(context: CanvasRenderingContext2D, color: string = STROKE_COLOR): void {
    const bez = this.toBezier();
    context.beginPath();
    context.moveTo(bez.startPoint[0], bez.startPoint[1]);
    context.bezierCurveTo(bez.cp1[0], bez.cp1[1], bez.cp2[0], bez.cp2[1], bez.endPoint[0], bez.endPoint[1]);
    context.strokeStyle = color;
    context.lineWidth = STROKE_WIDTH;
    context.stroke();
  }

  step(): void {
    const oldBez = this.toBezier();
    // Optimized: reuse existing bezier if available, otherwise create new
    if (!this.forcedBezier) {
      this.forcedBezier = { startPoint: [0, 0], endPoint: [0, 0], cp1: [0, 0], cp2: [0, 0] };
    }
    this.forcedBezier.startPoint[0] = oldBez.startPoint[0];
    this.forcedBezier.startPoint[1] = oldBez.startPoint[1] - SPEED;
    this.forcedBezier.endPoint[0] = oldBez.endPoint[0];
    this.forcedBezier.endPoint[1] = oldBez.endPoint[1] - SPEED;
    this.forcedBezier.cp1[0] = oldBez.cp1[0];
    this.forcedBezier.cp1[1] = oldBez.cp1[1] - SPEED;
    this.forcedBezier.cp2[0] = oldBez.cp2[0];
    this.forcedBezier.cp2[1] = oldBez.cp2[1] - SPEED;
    this.currentY = this.forcedBezier.startPoint[1];
    this._cachedBezier = undefined; // Invalidate cache
  }

  toBezier(): Bezier {
    if (this.forcedBezier) return this.forcedBezier;
    // Cache computed bezier to avoid recalculating
    if (!this._cachedBezier) {
      this._cachedBezier = {
        startPoint: this.startPoint,
        endPoint: this.endPoint,
        cp1: [this.startPoint[0], this.startPoint[1] + this.startWhiskerLength],
        cp2: [this.endPoint[0], this.endPoint[1] - this.endWhiskerLength]
      };
    }
    return this._cachedBezier;
  }

  interpolateWith(curve: Curve): Curve[] {
    return interpolateCurves(this, curve, STEPS, this.maxWidth, this.minWidth, this.originX);
  }
}

function interpolateCurves(curveA: Curve, curveB: Curve, count: number = STEPS, maxWidth?: number, minWidth?: number, originX?: number): Curve[] {
  const result: Curve[] = [];
  result.length = count; // Pre-allocate array
  const bezierA = curveA.toBezier();
  const bezierB = curveB.toBezier();
  const invCount = 1 / (count + 1);
  const temp = [0, 0]; // Reusable temp array

  for (let i = 1; i <= count; i++) {
    const progress = i * invCount;
    const forcedBezier: Bezier = {
      startPoint: interpolatePoints(bezierA.startPoint, bezierB.startPoint, progress, temp).slice() as [number, number],
      endPoint: interpolatePoints(bezierA.endPoint, bezierB.endPoint, progress, temp).slice() as [number, number],
      cp1: interpolatePoints(bezierA.cp1, bezierB.cp1, progress, temp).slice() as [number, number],
      cp2: interpolatePoints(bezierA.cp2, bezierB.cp2, progress, temp).slice() as [number, number],
    };
    result[i - 1] = new Curve({ forcedBezier, maxWidth, minWidth, originX, currentY: forcedBezier.startPoint[1] });
  }
  return result;
}

class Path {
  curves: Curve[] = [];
  interpolatedCurves: Curve[][] = [];
  minLength: number;
  maxWidth: number;
  minWidth: number;
  originX: number;

  constructor(canvasHeight: number, maxWidth: number, minWidth: number, originX: number) {
    this.minLength = canvasHeight + 512;
    this.maxWidth = maxWidth;
    this.minWidth = minWidth;
    this.originX = originX;
  }

  extend(): Curve {
    let childCurve: Curve;
    if (this.curves.length) {
      const parentCurve = this.curves[this.curves.length - 1];
      const bez = parentCurve.toBezier();
      // Use the actual endPoint from bezier (which accounts for movement)
      // Pass current Y position to allow spreading behavior
      childCurve = new Curve({ 
        startPoint: [...bez.endPoint], 
        maxWidth: this.maxWidth, 
        minWidth: this.minWidth, 
        originX: this.originX,
        currentY: bez.endPoint[1]
      });
    } else {
      // First curve starts at the origin X position (narrow cigarette point)
      childCurve = new Curve({ 
        startPoint: [this.originX, 0], 
        maxWidth: this.maxWidth, 
        minWidth: this.minWidth, 
        originX: this.originX,
        currentY: 0
      });
    }
    this.curves.push(childCurve);
    return childCurve;
  }

  draw(context: CanvasRenderingContext2D): void {
    // Optimized: batch draw operations
    const len = this.curves.length;
    for (let i = 0; i < len; i++) {
      this.curves[i].draw(context, STROKE_COLOR);
    }
    const interpLen = this.interpolatedCurves.length;
    for (let i = 0; i < interpLen; i++) {
      const curveArray = this.interpolatedCurves[i];
      const curveLen = curveArray.length;
      for (let j = 0; j < curveLen; j++) {
        curveArray[j].draw(context, STROKE_COLOR);
      }
    }
  }

  step(): void {
    // Optimized: use for loops instead of forEach
    const len = this.curves.length;
    for (let i = 0; i < len; i++) {
      this.curves[i].step();
    }
    const interpLen = this.interpolatedCurves.length;
    for (let i = 0; i < interpLen; i++) {
      const curveArray = this.interpolatedCurves[i];
      const curveLen = curveArray.length;
      for (let j = 0; j < curveLen; j++) {
        curveArray[j].step();
      }
    }
  }

  interpolateWith(path: Path): void {
    this.interpolatedCurves = this.curves.map((curve, idx) => {
      if (typeof path.curves[idx] === 'undefined') path.extend();
      return curve.interpolateWith(path.curves[idx]);
    });
  }

  getBottom(): number {
    if (!this.curves.length) return 0;
    const lastCurve = this.curves[this.curves.length - 1];
    const bez = lastCurve.toBezier();
    return bez.endPoint[1];
  }

  getTop(): number {
    if (!this.curves.length) return 0;
    const firstCurve = this.curves[0];
    const bez = firstCurve.toBezier();
    return bez.startPoint[1];
  }

  shiftPath(): void {
    this.curves.shift();
  }
}

class PathController {
  paths: Path[];
  canvasWidth: number;
  canvasHeight: number;
  context: CanvasRenderingContext2D;
  animationFrameId?: number;

  constructor(count: number, canvasWidth: number, canvasHeight: number, context: CanvasRenderingContext2D) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.context = context;
    // Use full viewport width
    const maxWidth = canvasWidth;
    const minWidth = Math.max(128, maxWidth * 0.2);
    
    // Cigarette smoke: start from a narrow point (like center of screen, slightly random)
    const centerX = maxWidth / 2;
    const originSpread = CIGARETTE_ORIGIN_WIDTH / 2; // Half width on each side of center
    
    this.paths = [...Array(count)].map(() => {
      // All paths start near center (cigarette tip), with small random variation
      const originX = centerX + randomInRange(-originSpread, originSpread);
      return new Path(canvasHeight, maxWidth, minWidth, originX);
    });
  }

  extendPaths(): void {
    this.paths.forEach(p => p.extend());
  }

  ensureCanvasFilled(): void {
    const MIN_LENGTH = this.canvasHeight + 1024;
    const pathsLen = this.paths.length;
    
    // Optimized: use for loop and cache getBottom calls
    for (let i = 0; i < pathsLen; i++) {
      const path = this.paths[i];
      while (path.getBottom() < MIN_LENGTH) {
        this.extendPaths();
      }
    }

    // Optimized: batch shift operations
    for (let i = 0; i < pathsLen; i++) {
      const path = this.paths[i];
      if (path.curves.length > 0 && path.getTop() < -512) {
        this.shiftPaths();
      }
    }

    this.interpolatePaths();
  }

  shiftPaths(): void {
    this.paths.forEach(path => path.shiftPath());
  }

  drawPaths(): void {
    // Optimized: use for loop
    const len = this.paths.length;
    for (let i = 0; i < len; i++) {
      this.paths[i].draw(this.context);
    }
  }

  interpolatePaths(): void {
    this.paths.forEach((path, idx) => {
      if (typeof this.paths[idx + 1] !== 'undefined') {
        path.interpolateWith(this.paths[idx + 1]);
      }
    });
  }

  stepPaths(): void {
    // Optimized: use for loop
    const len = this.paths.length;
    for (let i = 0; i < len; i++) {
      this.paths[i].step();
    }
  }

  clearCanvas(): void {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  animate = (): void => {
    this.clearCanvas();
    this.stepPaths();
    this.ensureCanvasFilled();
    this.drawPaths();
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  stop(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

export default function SmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathControllerRef = useRef<PathController | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      if (pathControllerRef.current) {
        pathControllerRef.current.stop();
      }
      
      pathControllerRef.current = new PathController(
        CURVES,
        canvas.width,
        canvas.height,
        context
      );
      pathControllerRef.current.ensureCanvasFilled();
      pathControllerRef.current.drawPaths();
      pathControllerRef.current.animate();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (pathControllerRef.current) {
        pathControllerRef.current.stop();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -9,
        opacity: 0.15,
        pointerEvents: 'none',
      }}
    />
  );
}

