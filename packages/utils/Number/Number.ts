export const parseFloat = (num: number, parseLength: number) => {
    const numToString = num.toString();
    return Number(numToString.slice(0, (numToString.indexOf('.')) + parseLength + 1));
};
export const convertToBytes = (num: number) => (Math.floor(num) * Math.pow(1024, 2));

export const formatBytes = (megabytes: number, showSize?: false | boolean) => {
    const bytes = convertToBytes(megabytes);
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    if (showSize)
        return parseFloat((Math.floor(bytes) / Math.pow(1024, i)) * 1, 2) + ' ' + sizes[i];
    else
        return parseFloat((Math.floor(bytes) / Math.pow(1024, i)) * 1, 2);
};

export const getFixedTwoDecimals = (num: any) => {
    const n = Number(num);

    if (!isNaN(n)) {
        const x = n.toFixed(2).replace(/\.?0+$/, '');
        return x;
    }

    return num;
};

