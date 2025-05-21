// better time shown
export const dateOne = (e) => {
    let d = new Date(e);
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    let D = d.getDate();

    if (D < 10) {  // 补零
        D = '0' + D;
    }

    if (m < 10) {
        m = '0' + m;
    }

    let dates = y + '.' + m + '.' + D;
    return dates;
} 