export const dateFunc = () => {
    const date = new Date();
    let month = date.getMonth() + 1;
    let monthString: string;
    if (month < 10) {
        monthString = "0" + month.toString();
    } else {
        monthString = month.toString();
    }
    let day = date.getDate();
    let dayString: string;
    if (day < 10) {
        dayString = "0" + day.toString();
    } else {
        dayString = day.toString();
    }
    const year = date.getFullYear();
    const fullDate = `${monthString}-${dayString}-${year}`;
    const numberDate: number = parseInt(year + monthString + dayString);
    return { fullDate, numberDate };
};