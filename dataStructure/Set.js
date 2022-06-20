function Set() {
  this.items = {}

  Set.prototype.add = function(data) {
    if (this.has(data)) return false

    this.items[data] = data

    return true
  }

  Set.prototype.has = function(data) {
    // 粗糙写法
    // return Object.keys(this.items).includes(data)

    // 标准写法
    return this.items.hasOwnProperty(data)
  }

  Set.prototype.remove = function(data) {
    if (!this.items.has(data)) return false

    delete this.items[data]

    return true
  }

  Set.prototype.clear = function() {
    this.items = {}
  }

  Set.prototype.size = function() {
    return Object.keys(this.items).length
  }

  Set.prototype.values = function() {
    return Object.keys(this.items)
  }

  // 集合间的操作
  Set.prototype.union = function(otherSet) {
    const unionSet = new Set()
    for (let value of this.values()) {
      unionSet.add(value)
    }

    for (let value of otherSet.values()) {
      unionSet.add(value)
    }

    return unionSet
  }
}
