
 function longestCommonPrefix(strs) {
    
    let prefix = '';
    
    if (strs.length === 1) return strs[0];
    
    for (let i = 0; i < strs[0].length; i++) {
        let currentChar = strs[0][i];
        if (currentChar && strs.every((s) => s[i] == currentChar)) {
            prefix += currentChar;
        } else {
            return prefix;
        }
    }
    
    return prefix;
};


console.log(longestCommonPrefix( 'dog', 'racecar', 'car' ));
