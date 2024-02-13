const axios = require('axios');

const printMetadata = [

    {
        key: 'id',
        title: 'id : '
    },
    {
        key: 'title',
        title: 'Todo title : '
    },
    {
        key: 'completed',
        title: 'Completed : '
    },

]

const constrainTypes = {
    ODD: 'odd',
    EVEN: 'even'
}



const printTodo = (data) => {
    console.log("x-x-x-x-x--x-x-x-x--x-x-x-x-x-x--x-x-x-x-")
    for (let metadata of printMetadata) {
        console.log(metadata.title, data[metadata.key])
    }
    console.log("-----------------------------------------")
}

const printTodos = (todoList) =>{
    todoList.forEach(todo=>{
        printTodo(todo)
    })
}



const canFetchData = (id, constrainType) => {

    switch (constrainType) {
        case constrainTypes.EVEN: {
            if (id % 2 === 0)
                return true
            else
                return false

        }
        case constrainTypes.ODD: {
            if (id % 2 !== 0)
                return true
            else
                return false
        }
        default: return false

    }
}

const getUrls = (limit, constrainType) => {

    const url = `https://jsonplaceholder.typicode.com/todos/`
    let MAX_ITER_LIMIT = 200 // todos api supprt only 200 todos
    let urls = []

    if (MAX_ITER_LIMIT < limit) {
        limit = MAX_ITER_LIMIT
    }

    for (let i = 1; i <= limit; i++) {
        if (canFetchData(i, constrainType))
            urls.push(url + i)

    }
    return urls
}


const getData = async (urls) => {

    let totalUrls = urls.length
    let batchLength = 3 // How many batches to split
    let batchSize = Math.floor(totalUrls / batchLength) // no of urls in each batch
    let batchNo = 0
    let urlNo = 0
    let results = []

    while (batchNo <= batchLength) {
        if (batchLength == batchNo) {
            if ((totalUrls % batchLength) == 0) {
                break
            }
            batchSize = totalUrls % batchLength
        }

        let promises = []
        for (let item = 0; item < batchSize; item++) {
            promises.push(axios({ method: 'get', url: urls[urlNo++], }))
        }

        let values = await Promise.allSettled(promises)
        values.forEach(item => {
            if (item.value !== undefined) {
                results.push(item.value.data);
            }
            else {
                console.log("error")
            }
        });

        batchNo++
    }
    return results;
}


const run = async()=>{
    let urlList = getUrls(100,constrainTypes.EVEN);
    let todoList = await  getData(urlList)
    printTodos(todoList)
}


module.exports={
    printMetadata : printMetadata,
    constrainTypes : constrainTypes,
    printTodos : printTodos,
    canFetchData : canFetchData,
    getUrls : getUrls,
    getData : getData,
    run : run
}