import { useEffect, useRef } from 'react'

// Simple 3D particle field using canvas (no external libs)
function randomSpherePoint(radius: number) {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  return {
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.sin(phi) * Math.sin(theta),
    z: radius * Math.cos(phi)
  }
}

export default function Background() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    const DPR = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * DPR)
      canvas.height = Math.floor(h * DPR)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate particles on a sphere
    const N = 120
    const R = 320
    const particles = Array.from({ length: N }, () => randomSpherePoint(R))
    let t = 0

    function project3D(x: number, y: number, z: number, w: number, h: number) {
      // Simple perspective projection
      const fov = 600
      const scale = fov / (fov + z)
      return {
        x: w / 2 + x * scale,
        y: h / 2 + y * scale
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Subtle gradient background
      const gx = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gx.addColorStop(0, 'rgba(31,117,255,0.10)')
      gx.addColorStop(1, 'rgba(14,60,143,0.07)')
      ctx.fillStyle = gx
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      t += 0.012
      for (const p of particles) {
        // Rotate sphere
        const angleY = t * 0.7
        const angleX = t * 0.4
        // Y rotation
        const x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY)
        const z1 = p.x * Math.sin(angleY) + p.z * Math.cos(angleY)
        // X rotation
        const y1 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX)
        const z2 = p.y * Math.sin(angleX) + z1 * Math.cos(angleX)
        // Project
        const { x, y } = project3D(x1, y1, z2, canvas.width, canvas.height)
        // Draw particle
        ctx.beginPath()
        ctx.arc(x, y, 3 * DPR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(31,117,255,${0.18 + 0.12 * (z2/R)})`
        ctx.shadowColor = 'rgba(31,117,255,0.18)'
        ctx.shadowBlur = 8 * DPR
        ctx.fill()
        ctx.shadowBlur = 0
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
