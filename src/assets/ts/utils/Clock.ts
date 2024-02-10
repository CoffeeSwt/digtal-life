export class Clock {
  timerInterval: NodeJS.Timeout | null
  count: number
  duration: number
  callback: () => void
  constructor(duration: number, callback: () => void) {
    this.timerInterval = null
    this.count = 0
    this.duration = duration
    this.callback = callback
  }
  start() {
    if (!this.timerInterval) {
      this.timerInterval = setInterval(() => {
        this.count++
        this.callback()
      }, this.duration)
    }
  }
  stop() {
    if (!this.timerInterval) return
    clearInterval(this.timerInterval)
    this.timerInterval = null
  }
}
