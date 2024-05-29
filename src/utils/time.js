const timeChange = (time) => {
    if (time == null) return '';
    return time.slice(0, 10) + ' ' + time.slice(11, 19);
};

export default timeChange;
