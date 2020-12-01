export class LifeGame {
  constructor(size=0, lifes=[]) {
    this._size = size
    this._lifes = lifes
  }
  get size() {return this._size}
  get lifes() {return this._lifes}

  /**
   * 八近傍の座標を求める
   * @private
   * @param {string} pos 中心座標 e.g. '3,2'
   * @return Array<Array<number>>
   */
  _neighbor(pos) {
    const [x, y] = pos.split(',').map(it=>parseInt(it))
    return [
      [x-1,y-1], [x,y-1], [x+1,y-1],
      [x-1,y],            [x+1,y],
      [x-1,y+1], [x,y+1], [x+1,y+1]
    ]
  }
  /**
   * 全体の活性数を求める
   * @private
   * @return {Map<string, number>} key:セル座標, value:活性数
   */
  _population() {
    return this.lifes.reduce((acm, pos) => {
      this._neighbor(pos).map(it => acm[it] = (acm[it]||0) + 1)
      return acm
    }, {})
  }
  /**
   * 活性、不活性の判定を行う
   * @private
   * @param {number} pop 活性数
   * @param {boolean} state 状態
   */
  _judge(pop, state) {
    if (pop === 3) return true
    if (pop === 2) return state
    return false
  }
  /**
   * 次世代の活性セルを求める
   * @public
   * @return {LifeGame} new LifeGame オブジェクト
   */
  nextLife() {
    return new LifeGame(
      this.size,
      Object.entries(this._population()).map(([pos, pop]) => 
        this._judge(pop, this.lifes.includes(pos))?pos:null
    ).filter(it=>it!==null))
  }
  /**
   * 指定座標の活性/不活性を求める
   * @public
   * @return {boolean} true:活性
   */
  isActive(x, y) {
    return this._lifes.includes(`${x},${y}`)
  }
  // Deprecated
  display() {
    for (let y=1; y<=this.size; y++) {
      const row = new Array(this.size).fill('□')
      for (let x=1; x<=this.size; x++) {
        if (this.lifes.includes(`${x},${y}`)) {
          row[x-1] = '■'
        }
      }
      console.log(row.join(''))
    }
  }
}
