/**
 * Sýnilausn á verkefni 8 í Vefforritun 1, 2024.
 * Byggir á sýnilausn á verkefni 7.
 * Notar jsdoc til að skrifa lýsingu á föllum, inntaki og úttaki.
 * Kveikið á `Check JS` í Visual Studio Code til að sjá mögulegar villur.
 * Notar `console.assert` til að athuga hvort föll virki rétt.
 */

import { isString, splitOnWhitespace } from './lib/helpers.js';

const test = isString('hæ');
console.log('test er strengur?', test);

const stringWithWhitespace = `halló
\theimur
hæ`;
const split = splitOnWhitespace(stringWithWhitespace);
console.log(split);
// Hjálparföll

/**
 * Athuga hvort óþekkt gildi sé strengur eða ekki.
 * @param {unknown} str Óþekkt gildi sem athuga á hvort sé strengur.
 * @returns `true` ef `str` er strengur, annars `false`.
 */
// Function sem höndlar gögnin úr forminu
document.querySelector('.string-form').addEventListener('submit', function(event) {
  event.preventDefault(); // leyfir Form ekki að vera submitted venjulega

  const inputText = document.getElementById('string').value;

  if (isString(inputText)) {
    const longestWord = longest(inputText);
    const shortestWord = shortest(inputText);
    const reversedString = reverse(inputText);
    const vowelCount = vowels(inputText);
    const consonantCount = consonants(inputText);
    const isPalindromic = palindrome(inputText);

    // Updatear .output field childin svo þau verða viðeigandi 
    // output frá functionunum
    document.querySelector('.output .input').textContent = inputText;
    document.querySelector('.output .longest').textContent = longestWord;
    document.querySelector('.output .shortest').textContent = shortestWord;
    document.querySelector('.output .vowels').textContent = vowelCount;
    document.querySelector('.output .consonants').textContent = consonantCount;
    document.querySelector('.output .palindrome').textContent = isPalindromic ? 'samhverfur' : 'ekki samhverfur';
    document.querySelector('.output .reversed').textContent = reversedString;

    // fjarlægir hidden taggið svo .output fieldið er sýnilegt
    document.querySelector('.output').classList.remove('hidden');
  }
});
// Function sem eyðir úr output fieldunum þegar notað er "Hreinsa" takkan
document.getElementById('clear-button').addEventListener('click', function() {
    // eyðir úr inntaks fieldinu
    document.getElementById('string').value = ''; 
    // setur output fieldið aftur til hidden
    document.querySelector('.output').classList.add('hidden'); 
    //setur öll sér output börnin sem '' (aka blank)
    document.querySelector('.output .input').textContent = '';
    document.querySelector('.output .longest').textContent = '';
    document.querySelector('.output .shortest').textContent = '';
    document.querySelector('.output .vowels').textContent = '';
    document.querySelector('.output .consonants').textContent = '';
    document.querySelector('.output .palindrome').textContent = '';
    document.querySelector('.output .reversed').textContent = '';
});
// Prófum fallið
console.assert(isString('hi') === true, 'isString: skilar `true` fyrir streng');
console.assert(isString(42) === false, 'isString: skilar `false` fyrir tölu');
console.assert(isString(null) === false, 'isString: skilar `false` fyrir null');
// longest prufa
console.assert(longest("hæ ég er staerdsta") === 'staerdsta', "longest: skilar strengnum 'stærðsta' fyrir inntak");
console.assert(longest("i balt i kol") === "balt", "longest: skilar strengnum 'balt' fyrir inntak");
// shortest prufa
console.assert(shortest("hæ minnsta") === "hæ", "shortest: skilar strengnum 'hæ' fyrir inntak");
console.assert(shortest("eg er minnsta") === 'eg', "shortest: skilar strengnum 'ég' fyrir inntak því það er fyrsta minnsta orðið");
// reverse prufa
console.assert(reverse("hæ ég er stærðsta") === "atsðræts re gé æh", "reverse: skilar strengnum 'atsðræts re gé æh' fyrir inntak");
console.assert(reverse(" ég er stærðsta") === "atsðræts re gé ", "reverse: skilar strengnum 'atsðræts re gé ' fyrir inntak");
// palindrome prufa
console.assert(palindrome("tacocat") === true, "reverse: skilar 'true' fyrir palindrome");
console.assert(palindrome("ekki palindrome") === false, "reverse: skilar 'false' fyrir  streng sem er ekki palindrome");
// vowels prufa
console.assert(vowels("aaaabb") === 4, "reverse: skilar '4' fyrir inntak");
console.assert(vowels("bb") === 0, "reverse: skilar '0' fyrir inntak");
// consonants prufa
console.assert(consonants("bb") === 2, "reverse: skilar '2' fyrir inntak");
console.assert(consonants("aaaaaaébbd") === 3, "reverse: skilar '3' fyrir inntak");
/**
 * Öruggt fall sem skilar fylki af strengjum úr gefnum streng, skipt upp með
 * gefnum afmkarkara (separator).
 * @param {string} str Hugsanlegur strengur sem skal skipta.
 * @returns {string[]} Fylki af strengjum eða tóma fylkið ef afmarkari kom
 * ekki fram.
 */

//------------------------------------------------------------------------------
// Grunnföll sem skilgreina á

function longest(str) {
  // Útfæra
  // þarf að vera strengur
  if(isString(str)){
    // splitar strenginn með regex
    str = str.match(/[a-zA-Z0-9]+/gi);
    // tómur strengur til að geyma stærðsta orðið
    let largest = "";
    // fer í gegnum splittaða strenginn 
    for (let i = 0; i < str.length; i++) {
      
      // ef str[i] er stærra en lengdinn á stærðsta strengnum 
      // breytir það stærðsta yfir í hvaða orð sem str[i] er
      if (str[i].length > largest.length) {
          largest = str[i];
      }
    }
    //skilar stærðsta
    return largest;
  }
  else{
    return null;
  }
}

function shortest(str) {
  // Útfæra
  // þarf að vera strengur
  if(isString(str)){
    // splitar strenginn við hvert bil
    
    var words = str.split(' ');
    // skoðar öll splituðu orðinn  og athugar hvort ordidN(orðið sem er núna í setninguni)
    // og gáir hvort það sé minna en nuverandi styðsta orðið
    var minnsta = words.reduce((stydst, ordidN) => {
      return ordidN.length < stydst.length ? ordidN : stydst;
    }, words[0]);
    //skilar minnsta
    return minnsta;
    
  }
  else{
    return null;
  }
}

function reverse(str) {
  // Útfæra
  if(isString(str)){
    // splitar strenginn í fylki t.d hallo = ["H","a","l","l","o"]
    var splitString = str.split("");
    // reversear arrayið með reverse();
    var reverseArray = splitString.reverse();
    // sameinar síðan reverseaða fylkinu aftur í streng
    var joinArray = reverseArray.join("");

    // skilar reverseaða strengnum
    return joinArray;
  }
  else{
    return null;
  }
}

function palindrome(str) {
  // Útfæra
  // Þarf að vera string (aftur)
  if(isString(str)){
    // Setjum strenginn í lowercase svo léttara að vinna með
    str = str.toLowerCase();
    // splita strengnum í karaktera
    var strSplit = str.split("");
    // förum í gegnum lengdina á arrayinu sem fengið er með split
    for (let i = 0; i < strSplit.length; i++) {
      // skoðum hvort char[i] sé einns fram og afturábak og chari[i+1 líka]
      if(strSplit[i] === strSplit.reverse()[i] && strSplit[i+1] === strSplit.reverse()[i+1]){
        //skilar true ef svo er
        return true
      }else{
        //annars skilar false
        return false
    }
  }
  }
  else{
    return false;
  }

}

function vowels(str) {
  // Útfæra
  // þarf að vera strengur
  if(isString(str)){
    //gerir streng lowercase svo léttara er að kíkja
    str = str.toLowerCase();
    // allir íslensku samhljóðar splitaðir með regex aðferð
    const VOWELS = /[aeiouyáéýúíóöæ]/gi;
    // notum .match til að sjá hversu margir samhlóðar eru í setninguni
    // t.d. .match skilar frá sér nyjan streng af öllum hlutum sem eru sameigninlegir
    // þar með ef strengur er t.d "aaaabb" mun það gefa "aaaa" útaf þeim fyrirmælum sem
    // gefnar eru til þess 
    const strMatches = str.match(VOWELS);
    if (strMatches) {
        // skilar lengdini af þeim þeim samhljóðum sem voru í strengnum
        return strMatches.length;
    }else {
      // annars skilar það núll ef engir samhljóðar voru í streng
      return 0; 
    }
    }
    else{
      return null;
    }
}

function consonants(str) {
  // Útfæra
  // þarf að vera strengur
  if(isString(str)){
    //gerir streng lowercase svo léttara er að kíkja
    str = str.toLowerCase();
    // allir íslensku sérhljómar splitaðir með regex aðferð
    const CONSONANTS = /[bcdfghjklmnpqrstvwxz]/gi;
    // notum .match til að sjá hversu margir sérhljómar eru í setninguni
    // t.d. .match skilar frá sér nyjan streng af öllum hlutum sem eru sameigninlegir
    // þar með ef strengur er t.d "aaaabb" mun það gefa "bb" útaf þeim fyrirmælum sem
    // gefnar eru til þess 
    const strMatches = str.match(CONSONANTS);
    if (strMatches) {
        // skilar lengdini af þeim þeim sérhljómum sem voru í strengnum
        return strMatches.length;
    }else {
      // annars skilar það núll ef engir sérhljomar voru í streng
      return "0"; 
    }
    }
    else{
      return null;
    }
}

//------------------------------------------------------------------------------
// Leiðbeint ferli

function start() {
  // Útfæra
  alert("Leiðbeiningar: Lesið er inn strengur frá notenda sem er síðan unnin af missmunadi föllum"+ "\n" + "t.d til að finna stærðsta orðið í setninguni");
  let inntak = prompt("Settu in streng")
  if(inntak === null){
    return;
  }
  else{
    alert(longest(inntak) + "\n" + shortest(inntak) + "\n" + 
    reverse(inntak) + "\n" + vowels(inntak)+ "\n" + consonants(inntak) + "\n" +
    palindrome(inntak))
    
  }
}
