function PriorityQueue() {

  function QueueElement(element, priority) {
    this.element = element
    this.priority = priority
  }

  this.items = []

  PriorityQueue.prototype.enqueue = function(element, priority) {
    var queueElement = new QueueElement(element, priority)

    if (this.items.length === 0) {
      this.items.push(queueElement)
    }
    else {
      var added = false
      for (let i=0; i<this.items.length; i++) {
        if (priority < this.items[i].priority) {
          this.items.splice(i, 0, queueElement)
          added = true
          break;
        }
      }
      if (!added) {
        this.items.push(queueElement)
      }
    }
    return queueElement
  }

  PriorityQueue.prototype.dequeue = function() {
    return this.items.shift()
  }

  PriorityQueue.prototype.front = function() {
    return this.items[0]
  }

  PriorityQueue.prototype.isEmpty = function() {
    return this.items.length === 0
  }

  PriorityQueue.prototype.size = function() {
    return this.items.length
  }

  PriorityQueue.prototype.toString = function() {
    let resultString = ''
    for (let i of this.items) {
      resultString += `${i.element}-${i.priority} `
    }
    return resultString
  }
}
