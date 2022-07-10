//pulls in data from function and identifies what the main word is


export default class WordParser {
    private wordArr : string[] = []
    pullMainWord(): string{
        //parse into an array 
        this.wordArr = [...this.wordList()]
        //this is word of the day to try and acheive 
        console.log(this.wordList)

        return this.findRandomWord(this.wordArr)
    }
    
    parseIntoWords(wordList: string) {
    
        //shave off ends 
        var wordArr = wordList.split(" ");
        for(var i = 0; i < 7; i++) wordArr.shift()
        wordArr.pop()
    
        return wordArr;
    }
    
    
    findRandomWord(wordArr: string[]) {
        var randomInt = Math.floor(Math.random() * wordArr.length);
        
        return wordArr[randomInt];
    }
    
    doesWordExist(word: string | undefined): boolean {
        this.wordArr = [...this.parseIntoWords(this.wordList().toString())]

  
        if(word)
        {
            return this.wordArr.includes((word).toLowerCase())
        }
        
        else return false 
    }

    wordList(): Array<string> {
        const words = [
            'cigar',
            'rebut',
            'sissy',
            'humph',
            'awake',
            'blush',
            'focal',
            'evade',
            'naval',
            'serve',
            'heath',
            'dwarf',
            'model',
            'karma',
            'stink',
            'grade',
            'quiet',
            'bench',
            'abate',
            'feign',
            'major',
            'death',
            'fresh',
            'crust',
            'stool',
            'colon',
            'abase',
            'marry',
            'react',
            'batty',
            'pride',
            'floss',
            'helix',
            'croak',
            'staff',
            'paper',
            'unfed',
            'whelp',
            'trawl',
            'outdo',
            'adobe',
            'crazy',
            'sower',
            'repay',
            'digit',
            'crate',
            'cluck',
            'spike',
            'mimic',
            'pound',
            'maxim',
            'linen',
            'unmet',
            'flesh',
            'booby',
            'forth',
        ]
         return words
    }
    

}









//last one is the word to try and achieve 
