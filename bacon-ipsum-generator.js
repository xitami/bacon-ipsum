/**
 * Bacon Ipsum Generator - JavaScript Implementation
 * Ported from PHP version by Pete Nelson (@GunGeekATX)
 * Version: 2.1
 */

class BaconIpsumGenerator {
    constructor() {
        this.meat = [
            'beef', 'chicken', 'pork', 'bacon', 'chuck', 'short loin',
            'sirloin', 'shank', 'flank', 'sausage', 'pork belly', 'shoulder',
            'cow', 'pig', 'ground round', 'hamburger', 'meatball', 'tenderloin',
            'strip steak', 't-bone', 'ribeye', 'shankle', 'tongue', 'tail',
            'pork chop', 'pastrami', 'corned beef', 'jerky', 'ham', 'fatback',
            'ham hock', 'pancetta', 'pork loin', 'short ribs', 'spare ribs',
            'beef ribs', 'drumstick', 'tri-tip', 'ball tip', 'venison',
            'turkey', 'biltong', 'rump', 'jowl', 'salami', 'bresaola',
            'meatloaf', 'brisket', 'boudin', 'andouille', 'capicola',
            'swine', 'kielbasa', 'frankfurter', 'prosciutto', 'filet mignon',
            'leberkas', 'turducken'
        ];

        this.filler = [
            'consectetur', 'adipisicing', 'elit', 'sed', 'do', 'eiusmod',
            'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna',
            'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis',
            'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut',
            'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute',
            'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate',
            'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
            'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
            'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt',
            'mollit', 'anim', 'id', 'est', 'laborum'
        ];
    }

    getWords(type) {
        let words;
        if (type === 'meat-and-filler') {
            words = [...this.meat, ...this.filler];
        } else {
            words = [...this.meat];
        }
        
        // Shuffle array
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j], words[i]];
        }
        
        return words;
    }

    makeASentence(type) {
        const length = Math.floor(Math.random() * 12) + 4; // 4-15 words
        const includeComma = length >= 7 && Math.floor(Math.random() * 3) > 0;
        const words = this.getWords(type);
        
        if (words.length === 0) return '';
        
        // Capitalize first word
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        
        let sentence = '';
        let commaAdded = false;
        
        for (let i = 0; i < length; i++) {
            if (i > 0) {
                if (i >= 3 && i !== length - 1 && includeComma && !commaAdded) {
                    if (Math.random() > 0.5) {
                        sentence = sentence.trim() + ', ';
                        commaAdded = true;
                    } else {
                        sentence += ' ';
                    }
                } else {
                    sentence += ' ';
                }
            }
            sentence += words[i];
        }
        
        return sentence.trim() + '.';
    }

    makeAParagraph(type) {
        const length = Math.floor(Math.random() * 4) + 4; // 4-7 sentences
        let para = '';
        
        for (let i = 0; i < length; i++) {
            para += this.makeASentence(type) + ' ';
        }
        
        return para.trim();
    }

    makeSomeMeatyFiller(type = 'meat-and-filler', numberOfParagraphs = 5, startWithLorem = true, numberOfSentences = 0) {
        const paragraphs = [];
        
        if (numberOfSentences > 0) {
            numberOfParagraphs = 1;
        }
        
        for (let i = 0; i < numberOfParagraphs; i++) {
            let words = '';
            
            if (numberOfSentences > 0) {
                for (let s = 0; s < numberOfSentences; s++) {
                    words += this.makeASentence(type) + ' ';
                }
            } else {
                words = this.makeAParagraph(type);
            }
            
            if (i === 0 && startWithLorem && words.length > 0) {
                words = words.charAt(0).toLowerCase() + words.slice(1);
                words = 'Bacon ipsum dolor sit amet ' + words;
            }
            
            paragraphs.push(words.trim());
        }
        
        return paragraphs;
    }
}

// Make it available globally
if (typeof window !== 'undefined') {
    window.BaconIpsumGenerator = BaconIpsumGenerator;
}
