import { type LengthArray } from '../types'

class DataEngine {
  manager: BlocksManager
  width: number
  height: number
  constructor(width: number, height: number) {
    this.manager = new BlocksManager()
    this.width = width
    this.height = height
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < height; y++) {
        this.manager.addBlock(new Block(x, y))
      }
    }
  }
  updataTick() {
    this.manager.updateNotify()
  }
}

class BlocksManager {
  blocks: Array<Block>
  constructor() {
    this.blocks = []
  }
  addBlock(block: Block) {
    this.blocks.push(block)
  }
  removeBlock(index: number) {
    if (!this.blocks[index]) return
    this.blocks.splice(index, 1)
  }
  updateNotify() {
    this.blocks.forEach((block) => block.update())
  }
}

class Block {
  pos: [number, number]
  state: boolean
  rounds: LengthArray<Block | null, 8>
  constructor(x: number, y: number) {
    this.state = false
    this.pos = [x, y]
    this.rounds = new Array().fill(null, 0, 8) as LengthArray<Block | null, 8>
  }
  update() {}
  changeState() {
    this.state = !this.state
  }
  /*
  8 1 2
  7 x 3
  6 5 4
  */
  addRounds(index:number){}
}
