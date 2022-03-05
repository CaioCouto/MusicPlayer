function capitalize(wordInput) {
    const word = wordInput.trim();
    const innerWords = word.split(' ');
    const trimmedWords = []
    innerWords.forEach(word => {
        if(word) trimmedWords.push(word);
    });
    const capitalizedWords = trimmedWords.map(element => {
        const firstLetter = element.slice(0, 1).toUpperCase();
        const otherLetters = element.slice(1).toLowerCase();
        return firstLetter + otherLetters;
    });
    return capitalizedWords.join(' ');
}

// rafael@rogalabs.com

// djalmajr@rogalabs.com

module.exports = {
    capitalize
}

