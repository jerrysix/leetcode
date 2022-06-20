function DoublyLinkedList() {

  function Node(data) {
    this.data = data
    this.prev = null
    this.next = null
  }

  this.head = null
  this.tail = null
  this.length = 0

  DoublyLinkedList.prototype.append = function(data) {
    const newNode = new Node(data)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    }
    else{
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }

    this.length += 1;

    return true
  }

  DoublyLinkedList.prototype.insert = function(position, data) {
    // 越界判断
    if (position < 0 || position > this.length) return false

    const newNode = new Node(data)

    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    }
    else {
      if (position === 0) {
        newNode.next = this.head
        this.head.prev = newNode
        this.head = newNode
      }
      else if (position === this.length) {
        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode
      }
      else {
        let current = this.head
        for (let i=0; i<position; i++) {
          current = current.next
        }

        newNode.next = current
        newNode.prev = current.prev
        current.prev.next = newNode
        current.prev = newNode
      }
    }

    this.length += 1

    return true
  }

  DoublyLinkedList.prototype.get = function(position) {
    // 越界判断
    if (position < 0 || position >= this.length) return false

    if (position < (this.length / 2)) { // 从头向尾遍历
      let current = this.head
      for (let i=0; i<position; i++) {
        console.log('111')
        current = current.next
      }
      return current.data
    }
    else { // 从尾向头遍历
      let current = this.tail
      for (let i=this.length-1; i>position ; i--) {
        console.log('222')
        current = current.prev
      }
      return current.data
    }
  }

  DoublyLinkedList.prototype.indexOf = function(data) {
    let current = this.head;

    let index = 0;
    while (current) {
      if (current.data === data) {
        return index
      }
      current = current.next
      index += 1;
    }
    return -1
  }

  DoublyLinkedList.prototype.update = function(position, data) {
    // 越界判断
    if (position < 0 || position >= this.length) return false

    let current = this.head
    for (let i=0; i < position; i++){
      current = current.next
    }

    current.data = data

    return true
  }

  DoublyLinkedList.prototype.removeAt = function(position) {
    // 越界判断
    if (position < 0 || position >= this.length) return null

    let current = this.head

    if (this.length === 1) {
      this.head = null
      this.tail = null
    }
    else {
      if (position === 0) {
        this.head.next.prev = null
        this.head = this.head.next
      }
      else if (position === this.length-1) {
        current = this.tail

        this.tail.prev.next = null
        this.tail = this.tail.prev
      }
      else {
        for (let i=0; i<position; i++) {
          current = current.next
        }
        current.prev.next = current.next
        current.next.prev = current.prev
      }
    }

    this.length -= 1

    return current.data
  }

  DoublyLinkedList.prototype.remove = function(data) {

    // 借用indexOf和removeAt
    const index = this.indexOf(data)

    return this.removeAt(index)

    // 原始方法
    /*
      if (this.length === 0) {
        return false
      }
      else if (this.length === 1 && this.head.data === data) {
        this.head = null
        this.tail = null
        return true
      }
      else if (this.head.data === data) {
        this.head = this.head.next
        return true
      }
      else if (this.tail.data === data) {
        this.tail.prev.next = null
        this.tail = this.tail.prev
        return true
      }
      else {
        let current = this.head
        while (current) {
          if (current.data === data) {
            current.prev.next = current.next
            current.next.prev = current.prev
            return true
          }
          current = current.next
        }
      }
      return false
    */

  }

  DoublyLinkedList.prototype.toString = function() {
    return this.backwordString()
  }

  DoublyLinkedList.prototype.backwordString = function() {
    let current = this.head
    let resultString = ''

    while (current) {
      resultString += current.data + ' '
      current = current.next
    }

    return resultString
  }

  DoublyLinkedList.prototype.forwardString = function() {
    let current = this.tail
    let resultString = ''

    while (current) {
      resultString += current.data + ' '
      current = current.prev
    }

    return resultString
  }

  DoublyLinkedList.prototype.isEmpty = function() {
    return this.length === 0
  }

  DoublyLinkedList.prototype.size = function() {
    return this.length
  }

  DoublyLinkedList.prototype.getHead = function() {
    return this.head.data
  }

  DoublyLinkedList.prototype.getTail = function() {
    return this.tail.data
  }
}
