function sleep(time) {
    return new Promise(resolve => setTimeout(() => resolve('ok'), time))
}

async function test() {
    console.log('1')
    await sleep(2000)
    console.log('2')
}
// test()

const arr = [1, 2, 3, 3, 4, 4, 6, 6, 12, 12, 3, 4, 8, 6, 7, 7]

const tem = [1]
for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < tem.length; j++) {
        if (tem[j] === arr[i]) { break }
        if (j == tem.length - 1) {
            tem.push(arr[i])
        }
    }
}

console.log(tem)