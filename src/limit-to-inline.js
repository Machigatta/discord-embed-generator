export class LimitToInlineValueConverter {
    toView(array, isInline) {
        let temp = [];
        array.forEach(element => {  
            if (element.inline == isInline) {
                temp.push(element);
            }
        });
        return temp;
    }
}