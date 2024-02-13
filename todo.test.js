
const { canFetchData, getUrls, getData } = require('./Todo');


describe('canFetchData', () => {
    test('returns true for even id when constrainType is EVEN', () => {
        expect(canFetchData(2, 'even')).toBe(true);
    });

    test('returns false for even id when constrainType is ODD', () => {
        expect(canFetchData(2, 'odd')).toBe(false);
    });

    test('returns true for odd id when constrainType is ODD', () => {
        expect(canFetchData(3, 'odd')).toBe(true);
    });

    test('returns false for odd id when constrainType is EVEN', () => {
        expect(canFetchData(3, 'even')).toBe(false);
    });

    test('returns false for odd id when constrainType is something', () => {
        expect(canFetchData(3, 'something')).toBe(false);
    });
    test('returns false for even id when constrainType is something', () => {
        expect(canFetchData(2, 'something')).toBe(false);
    });
});

describe('getUrls', () => {
    test('returns an array of URLs for given limit and constrainType', () => {
        const urls = getUrls(5, 'even');
        expect(urls).toEqual([
            'https://jsonplaceholder.typicode.com/todos/2',
            'https://jsonplaceholder.typicode.com/todos/4'
        ]);
    });

    test('limits the number of URLs returned to MAX_ITER_LIMIT', () => {
        const urls = getUrls(300, 'even');
        expect(urls.length).toBe(100); // (MAX_ITER_LIMIT / 2) as test is even
    });

    test('returns an empty array if limit is less than or equal to 0', () => {
        const urls = getUrls(0, 'even');
        expect(urls).toEqual([]);
    });

    test('returns an empty array if constrainType is invalid', () => {
        const urls = getUrls(5, 'invalid');
        expect(urls).toEqual([]);
    });
});


describe("getData", () => {
    test("fetchData returns the correct data for the given urls for todos 1,3,5", () => {
        let urls = [
            'https://jsonplaceholder.typicode.com/todos/1',
            'https://jsonplaceholder.typicode.com/todos/3',
            'https://jsonplaceholder.typicode.com/todos/5'
        ]
         return expect(getData(urls)).resolves.toStrictEqual(
            [{ "completed": false, "id": 1, "title": "delectus aut autem", "userId": 1 }, { "completed": false, "id": 3, "title": "fugiat veniam minus", "userId": 1 }, { "completed": false, "id": 5, "title": "laboriosam mollitia et enim quasi adipisci quia provident illum", "userId": 1 }]
        );
    });

    test("fetchData returns the correct data for the given urls for todos 2,4,6,8,10", () => {
        let urls = [
            'https://jsonplaceholder.typicode.com/todos/2',
            'https://jsonplaceholder.typicode.com/todos/4',
            'https://jsonplaceholder.typicode.com/todos/6',
            'https://jsonplaceholder.typicode.com/todos/8',
            'https://jsonplaceholder.typicode.com/todos/10'
          ]
          return expect(getData(urls)).resolves.toStrictEqual(
            [{"completed": false, "id": 2, "title": "quis ut nam facilis et officia qui", "userId": 1}, {"completed": true, "id": 4, "title": "et porro tempora", "userId": 1}, {"completed": false, "id": 6, "title": "qui ullam ratione quibusdam voluptatem quia omnis", "userId": 1}, {"completed": true, "id": 8, "title": "quo adipisci enim quam ut ab", "userId": 1}, {"completed": true, "id": 10, "title": "illo est ratione doloremque quia maiores aut", "userId": 1}]
        );
    });

    test("fetchData returns [] for given empty list of urls", () => {
        let urls = [
            
          ]
          return expect(getData(urls)).resolves.toStrictEqual(
            []
        );
    });


});
