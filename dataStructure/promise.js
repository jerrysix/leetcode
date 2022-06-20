class Promise {
  constructor(executor) {
    this.PromiseState = 'pending'
    this.PromiseResult = null

    this.callback = []

    const self = this

    function resolve(data) {
      if (self.PromiseState !== 'pending') return;

      self.PromiseState = 'fulfilled'
      self.PromiseResult = data

      setTimeout(() => {
        if (self.callback.length > 0) {
          self.callback.forEach(callback => {
            if (callback.onResolved) {
              callback.onResolved(self.PromiseResult)
            }
          })
        }
      })
    }

    function reject(data) {
      if (self.PromiseState !== 'pending') return;

      self.PromiseState = 'rejected'
      self.PromiseResult = data

      setTimeout(() => {
        if (self.callback.length > 0) {
          self.callback.forEach(callback => {
            if (callback.onRejected) {
              callback.onRejected(self.PromiseResult)
            }
          })
        }
      })
    }

    try {
      executor(resolve, reject)
    }
    catch (e) {
      reject(e)
    }
  }

  then(onResolved, onRejected) {
    const self = this;

    if (typeof onResolved !== 'function') {
      onResolved = value => value
    }

    if (typeof onRejected !== 'function') {
      onRejected = reason => {
        throw reason
      }
    }

    return new Promise((resolve, reject) => {

      function callback(type) {
        try {
          const result = type(self.PromiseResult)
          if (result instanceof Promise) {
            result.then(value => resolve(value), reason => reject(reason))
          }
          else {
            resolve(result)
          }
        }
        catch (e) {
          reject(e)
        }
      }

      if (onResolved) {
        if (this.PromiseState === 'fulfilled') {
          setTimeout(() => {
            callback(onResolved)
          })
        }
      }

      if (onRejected) {
        if (this.PromiseState === 'rejected') {
          setTimeout(() => {
            callback(onRejected)
          })
        }
      }

      if (this.PromiseState === 'pending') {
        this.callback.push({
          onResolved: function() {
            callback(onResolved)
          },
          onRejected: function() {
            callback(onRejected)
          }
        })
      }
    })
  }

  catch(onRejected) {
    this.then(undefined, onRejected)
  }

  static resolve(data) {
    return new Promise((resolve, reject) => {
      if (data instanceof Promise) {
        data.then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      }
      else {
        resolve(data)
      }
    })
  }

  static all(array) {
    return new Promise((resolve, reject) => {
      const result = []

      array.forEach((promise, index) => {
        promise.then(value => {
          result[index] = value
          if (result.length === array.length) {
            resolve(result)
          }
        }, reason => {
          reject(reason)
        })
      })
    })
  }

  static race(array) {
    return new Promise((resolve, reject) => {
      array.forEach(promise => {
        promise.then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      })
    })
  }
}


