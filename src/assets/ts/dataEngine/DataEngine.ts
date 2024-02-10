import { type LengthArray } from '../types'

export class DataEngine {
  manager: BlocksManager
  width: number
  height: number
  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.manager = new BlocksManager(width, height)
    //初始化生成细胞
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.manager.addBlock(new Block(x, y))
      }
    }

    //对细胞位置链接
    const blocks = this.manager.getBlocks()
    blocks.forEach((block) => {
      //获取当前细胞位置
      const { x, y } = block.getPos()
      //获取附近细胞
      // 0 1 2
      // 7 x 3
      // 6 5 4
      block.addRounds(0, this.manager.getBlockByPos(x - 1, y - 1))
      block.addRounds(1, this.manager.getBlockByPos(x, y - 1))
      block.addRounds(2, this.manager.getBlockByPos(x + 1, y - 1))
      block.addRounds(3, this.manager.getBlockByPos(x + 1, y))
      block.addRounds(4, this.manager.getBlockByPos(x + 1, y + 1))
      block.addRounds(5, this.manager.getBlockByPos(x, y + 1))
      block.addRounds(6, this.manager.getBlockByPos(x - 1, y + 1))
      block.addRounds(7, this.manager.getBlockByPos(x - 1, y))
    })
  }
  updataTick() {
    //下一刻状态计算
    this.manager.computeNextTickState()
    //执行更新
    this.manager.updateNofify()
  }
  getData() {
    return this.manager.getBlocks().map((i) => i)
  }
  changeBlockState(x: number, y: number) {
    this.manager.changeBlockState(x, y)
  }
  getBlockState(x: number, y: number) {
    this.manager.getBlockState(x, y)
  }
  getBlockStateMap() {
    const chunkSize = this.width
    const result = []

    for (let i = 0; i < this.getData().length; i += chunkSize) {
      result.push(this.getData().slice(i, i + chunkSize))
    }
    return result
  }
}

class BlocksManager {
  blocks: Array<Block>
  width: number
  height: number
  constructor(width: number, height: number) {
    this.blocks = []
    this.width = width
    this.height = height
  }
  addBlock(block: Block) {
    this.blocks.push(block)
  }
  removeBlock(index: number) {
    if (!this.blocks[index]) return
    this.blocks.splice(index, 1)
  }
  computeNextTickState() {
    this.blocks.forEach((block) => block.computeNextState())
  }
  updateNofify() {
    this.blocks.forEach((block) => block.update())
  }
  getBlocks() {
    return this.blocks
  }
  getBlockByPos(x: number, y: number): Block | null {
    //越界
    if (x < 0 || x > this.width) return null
    if (y < 0 || y > this.height) return null
    //没越界
    const index = this.width * y + x
    const block = this.blocks[index]
    return block
  }
  changeBlockState(x: number, y: number) {
    const targetBlock = this.getBlockByPos(x, y)
    targetBlock?.changeState()
  }
  getBlockState(x: number, y: number): boolean {
    const targetBlock = this.getBlockByPos(x, y)
    return targetBlock?.getState()!
  }
}

class Block {
  pos: [number, number]
  state: boolean
  rounds: LengthArray<Block | null, 8>
  nextState: boolean | null
  constructor(x: number, y: number) {
    this.state = false
    this.pos = [x, y]
    this.nextState = null
    this.rounds = new Array().fill(null, 0, 8) as LengthArray<Block | null, 8>
  }
  computeNextState() {
    if (this.state) {
      this.nextState = this.checkThisCellLive()
    } else {
      this.nextState = this.checkThisCellRespawn()
    }
  }
  update() {
    this.state = this.nextState!
    this.nextState = null
  }
  private checkThisCellLive() {
    const liveCount = this.getLiveCount()
    //细胞周围少于三个细胞，人口不足，死亡
    if (liveCount < 2) return false
    //细胞周围多余三个细胞，人口过剩，死亡
    if (liveCount > 3) return false
    //细胞周围有2个或3个细胞，存活
    return true
  }
  private checkThisCellRespawn() {
    const liveCount = this.getLiveCount()
    //细胞周围有三个细胞，复活，模拟繁殖
    if (liveCount == 3) return true
    return false
  }
  private getLiveCount() {
    let liveCount = 0
    this.rounds.forEach((block) => {
      if (block?.getState()) liveCount++
    })
    return liveCount
  }
  setState(state: boolean) {
    this.state = state
  }
  changeState() {
    this.state = !this.state
  }
  /*
        0 1 2
        7 x 3
        6 5 4
  */
  addRounds(index: number, block: Block | null) {
    this.rounds[index] = block
  }
  getState() {
    return this.state
  }
  getPos() {
    return {
      x: this.pos[0],
      y: this.pos[1],
    }
  }
}
