const Base62 = (x) => {
    let number = x;
    let reminder = [];
    let codes = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ];
    //console.log(codes[45])
    while (number >= 62) {
        reminder.push(number % 62);
        number = Math.floor(number / 62);
    }

    number = codes[number];
    while (reminder.length > 0) {
        number += codes[reminder.pop()]
    }
    return number;
}

console.log(Base62(3521614606207)); //ZZZZZZZ maximum 7 digit value expressed in 62 digit
