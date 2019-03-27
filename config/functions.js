const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const four = [0, 0, 0, 0];

export const createTag = () =>
    four.reduce(a => (a += abc.charAt(Math.floor(Math.random() * 26))), '');
