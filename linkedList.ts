class node<T> {
  data: T
  next: node<T>
  constructor(data: T) {
    this.data = data
  }
}

class List<T> {
  private head: node<T>
  length: number

  constructor() {
    this.length = 0
  }

  private getCurrentAndPreviusNodes(): {current: node<T>, previus: node<T>} {
    let currentNode = this.head
    let previusNode = null
    while(currentNode.next) {
      previusNode = currentNode
      currentNode = currentNode.next
    }
    return {
      current: currentNode,
      previus: previusNode
    }
  }

  add(value: T) {
    if (!this.head) {
      this.head = new node(value)
      this.length++
      return
    }
    let { current } = this.getCurrentAndPreviusNodes()
    current.next = new node(value)
    this.length++
  }

  get last(): T | undefined {
    return this.getCurrentAndPreviusNodes().current.data
  }

  get first(): T | undefined {
    return this.head.data
  }

  pop() {
    let { previus, current } = this.getCurrentAndPreviusNodes()
    let data = current.data
    delete previus.next
    this.length--
    return data
  }

  forEach(callbackFN: (value: T) => any) {
    let current = this.head
    while(current) {
      callbackFN(current.data)
      current = current.next
    }
  }

  map(callbackFN: (value: T) => T | T[] | any) {
    let current = this.head
    const result = []
    while(current) {
      let returnData = callbackFN(current.data)
      if (returnData !== undefined) {
        result.push(returnData)
      }
      current = current.next
    }
    return result
  }
}

const myList = new List<string>()

myList.add('test1')
myList.add('test2')
myList.add('test3')

myList.forEach((v) => console.log(v))

const newArray = myList.map((v) => {
  return `${v} newArray`
})
console.log(newArray)

myList.pop()

console.log(myList.first) // test1
console.log(myList.last) // test2
console.log(myList.length) // 2