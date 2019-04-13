const w : number = window.innerWidth
const h : number = window.innerHeight
const scGap : number = 0.05
const scDiv : number = 0.51
const strokeFactor : number = 90
const sizeFactor : number = 2.9
const nodes : number = 5
const balls : number = 4
const foreColor : string = "#673AB7"
const backColor : string = "#BDBDBD"

class ScaleUtil {

    static scaleFactor(scale) : number {
        return Math.floor(scale / scDiv)
    }

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n
    }

    static mirrorValue(scale : number, a : number, b : number) : number {
        const k : number = ScaleUtil.scaleFactor(scale)
        return (1 - k) / a + k / b
    }

    static updateValue(scale : number, dir : number, a : number, b : number) : number {
        return ScaleUtil.mirrorValue(scale, a, b) * dir * scGap
    }
}

class DrawingUtil {

    static drawMovingBall(context : CanvasRenderingContext2D, y : number, x : number, r : number) {
        context.save()
        context.translate(x, y)
        context.beginPath()
        context.arc(0, 0, r, 0, 2 * Math.PI)
        context.fill()
        context.restore()
    }

    static drawBFSNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        const gap : number = h / (nodes + 1)
        const sc1 : number = ScaleUtil.divideScale(scale, 0, 2)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, 2)
        const size : number = gap / sizeFactor
        const yGap : number = 2 * size / balls
        const r : number = yGap / 2
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor
        context.strokeStyle = foreColor
        context.save()
        context.translate(w / 2, gap * (i + 1))
        context.rotate(Math.PI/ 2 * sc2)
        for (var j = 0; j < balls; j++) {
            const sc : number = ScaleUtil.divideScale(sc1, i, balls)
            const x : number = (w / 2 + r) * sc * (1 - 2 * (j % 2))
            context.save()
            DrawingUtil.drawMovingBall(context, size - yGap * j - r, x, r)
            context.restore()
        }
        context.restore()
    }
}

class BallFromSideStage {
    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = foreColor
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : BallFromSideStage = new BallFromSideStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
