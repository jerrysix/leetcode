function LinkedList() {

  function Node(data) {
    this.data = data
    this.next = null
  }

  this.head = null
  this.length = 0;

  LinkedList.prototype.append = function(element) {
    var node = new Node(element)

    if (this.length === 0) {
      this.head = node
    }
    else {
      var current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }

    this.length += 1

    return element
  }

  LinkedList.prototype.insert = function(position, element) {
    // 1、对position进行越界判断
    // 注：position不能等于this.length，否则无法append最后一位
    if (position < 0 || position > this.length) return false;

    // 2、根据data创建newNode
    var newNode = new Node(element)

    // 3、判断插入的位置是否为第一个
    if (position === 0) {
      newNode.next = this.head
      this.head = newNode
    }
    else {
      var current = this.head;
      var previous = null
      for (var i=0; i<position; i++) {
        previous = current
        current = current.next
      }

      newNode.next = current
      previous.next = newNode
    }

    this.length += 1

    return true
  }

  LinkedList.prototype.get = function(position) {

    // 1、对position进行越界判断
    if (position < 0 || position >= this.length) return;

    var current = this.head;
    for (var i=0; i<position; i++) {
      current = current.next
    }
    return current.data
  }

  LinkedList.prototype.indexOf = function(data) {
    var current = this.head;
    if (!current) {
      return -1;
    }

    var index = 0;
    while (current) {
      if (current.data === data) {
        return index
      }
      else {
        current = current.next
        index += 1
      }
    }
    return -1;
  }

  LinkedList.prototype.update = function(position, data) {
    // 越界判断
    if (position < 0 || position >= this.length) return false;

    let current = this.head
    for (let i=0; i<position; i++) {
      current = current.next
    }
    current.data = data
    return true
  }

  LinkedList.prototype.removeAt = function(position) {
    // 越界判断
    if (position < 0 || position >= this.length) return false

    let current = this.head;
    if (position === 0) {
      this.head = this.head.next;
    }
    else {
      let previous = null;
      for (let i=0; i<position; i++) {
        previous = current
        current = current.next
      }

      previous.next = current.next
    }

    this.length -= 1

    return current.data
  }

  LinkedList.prototype.remove = function(data) {

    // 方案1：手写
    /*
    let current = this.head
    if (this.head.data === data) {
      this.head = this.head.next
    }
    else {
      let exsisted = false;
      let previous = null
      while (current) {
        if (current.data === data) {
          previous.next = current.next
          exsisted = true
          break;
        }
        else {
          previous = current
          current = current.next
        }
      }

      if (!exsisted) {
        return false
      }

      this.length -= 1
    }

    return current.data;
    */

    // 方案2：借用removeAt
    const position = this.indexOf(data)

    return this.removeAt(position)
  }

  // 2、获取对应位置对数据
  LinkedList.prototype.toString = function() {
    var listString = ''
    var current = this.head

    while (current) {
      listString += current.data + ' '
      current = current.next
    }

    return listString
  }

  LinkedList.prototype.isEmpty = function() {
    return this.length === 0
  }

  LinkedList.prototype.size = function() {
    return this.length
  }

}
