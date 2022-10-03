const assert = require('node:assert')

function* calculation(arg1, arg2) {
  yield arg1 + arg2
}

function *main() {
  yield 'hello'
  yield '-'
  yield 'world'
  yield* calculation(20, 10)
}

const generator = main()
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

assert.deepStrictEqual(generator.next(), { value: 'hello', done: false })
assert.deepStrictEqual(generator.next(), { value: '-', done: false })
assert.deepStrictEqual(generator.next(), { value: 'world', done: false })
assert.deepStrictEqual(generator.next(), { value: 30, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

assert.deepStrictEqual(Array.from(main()), [
  'hello',
  '-',
  'world',
  30
  ]
)

// async iterators
const { readFile, stat, readdir } = require('node:fs/promises')
function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('Hey Dude!')
}

async function* systemInfo() {
  const file = await readFile(__filename)
  yield {
    file: file.toString(),
  }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

// Promise.all([...promisified()]).then(result => console.log('promisified', result))

;(async () => {
  for await (const item of systemInfo()) {
    console.log('systemInfo', item)
  }
})()
