/**
 * Created by bear on 2018/3/6.
 */

export const contactIndexFilter = (arr) => {
    return arr.reduce((prev, current) => {
        let index = -1;
        prev.some((user, i) => {
            if (user.data[0].firstLetter === current.firstLetter) {
                index = i;
                return true;
            }
        });
        if (index > -1) {
            prev[index].data.push(current);
        } else {
            prev.push({
                key: current.firstLetter,
                data: [current]
            });
        }
        return prev;
    }, [])
};

export const sectionListArr = (arr) => {
    return arr.map(i => i.key)

}