export default function setArrayAgrupar<T>(arr: T[]): [T, number][] {
    const countObj: { [key: string]: number } = {};

    for (const item of arr) {
        const key = JSON.stringify(item);
        countObj[key] = (countObj[key] || 0) + 1;
    }

    const result: [T, number][] = [];
    for (const key in countObj) {
        const item = JSON.parse(key);
        const count = countObj[key];
        result.push([item, count]);
    }

    const resultSort = result?.sort((a, b) => b[1] - a[1]);
    // console.log(result);

    return resultSort;
}