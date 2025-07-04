import { ctx } from "../index.js"

const GRAVITY = 0.3
const FRICTION = 0.98
const MAX_FORCE = 20
const MIN_FORCE = 12

let force = 0

class Trail {
  constructor(start, end) {
    this.start = start
    this.end = end

    const angle = Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x)
    const speed = 15
    this.velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    }

    this.hue = Math.floor(Math.random() * 360)
  }

  draw(lastPos) {
    ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`
    ctx.lineWidth = 5

    ctx.beginPath()
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(this.start.x, this.start.y)
    ctx.closePath()

    ctx.stroke()
  }

  update() {
    const lastPos = {
      x: this.start.x,
      y: this.start.y,
    }
    this.hue += 5

    this.start.x += this.velocity.x
    this.start.y += this.velocity.y

    this.draw(lastPos)
  }
}

class Particle {
  constructor(x, y, velocity, hue) {
    this.x = x
    this.y = y

    this.velocity = velocity

    this.hue = hue
    this.opacity = 1
  }

  draw(lastPos) {
    ctx.strokeStyle = `hsl(${this.hue}, 80%, 50%)`
    ctx.lineWidth = 2

    ctx.save()

    ctx.globalAlpha = this.opacity
    ctx.beginPath()
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(this.x, this.y)
    ctx.closePath()
    ctx.stroke()

    ctx.restore()
  }

  update() {
    const lastPos = {
      x: this.x,
      y: this.y,
    }
    this.opacity -= 0.01

    this.velocity.x *= FRICTION
    this.velocity.y *= FRICTION
    this.velocity.y += GRAVITY

    this.x += this.velocity.x
    this.y += this.velocity.y

    this.draw(lastPos)
  }
}

const trails = []
const particles = []

function playFirework(endPos) {
  const count = 100
  const angle = Math.PI * 2 / count
  for (let i = 0; i < count; ++i) {
    particles.push(new Particle(endPos.x, endPos.y, {
      x: Math.cos(angle * i) * force * Math.random(),
      y: Math.sin(angle * i) * force * Math.random()
    },
      Math.random() * 360))
  }
}

export function spawnTrail() {
  trails.push(new Trail(
    {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
    },
    {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    },
  ))
}

export function animateFireworks() {
  particles.forEach((particle, i) => {
    particle.update()
    if (particle.opacity <= 0.01)
      particles.splice(i, 1)
  });
  trails.forEach((trail, i) => {
    trail.update()
    if (trail.start.y <= trail.end.y) {
      trails.splice(i, 1)
      playFirework(trail.end)
    }
  });
}

function calcForce() {
  force = window.innerWidth / 40

  if (force > MAX_FORCE) {
    force = MAX_FORCE
  }

  if (force < MIN_FORCE) {
    force = MIN_FORCE
  }
}

calcForce();
