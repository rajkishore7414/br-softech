import { Constant } from "./Constant.js";

/**
 * Here is all the utility methods
 * Basically for code reuse purpose i've created this
 * to decease the line of code
 */
class Utils {
  constructor() { }
  /**
   * @param {target object} _target
   * @param {integer} _destinationX
   * @param {integer} _destinationY
   */
  MovementTween(_target1, _target2, _destinationX, _destinationY) {
    const game = Constant.game.scene.scenes[1];
    game.tweens.add({
      targets: [_target1, _target2],
      ease: "Linear",
      duration: 200,
      x: _destinationX,
      y: _destinationY,
      onComplete: () => {
        setTimeout(() => {
          _target1.destroy();
          _target2.destroy();
        }, 50);
      },
    });
  }
  MovementTween1(_target1, _target2, _destinationX, _destinationY) {
    const game = Constant.game.scene.scenes[1];
    game.tweens.add({
      targets: [_target1, _target2],
      ease: "Linear",
      duration: 200,
      x: _destinationX,
      y: _destinationY,
      onComplete: () => { },
    });
  }
  /**
   *
   * @param {integer} _min value
   * @param {integer} _max value
   * @returns random value between this range
   */
  RandomNumberGenerator(_min, _max) {
    return Math.floor(Math.random() * (_max - _min)) + _min;
  }

  /**
   *
   * @param {start value of a range} start
   * @param {end value} end
   * @param {number of values you want} count
   * @param {except which value that number} exclude
   * @returns array
   */
  getNonRepeatingNumbersInRangeWithExclusion(start, end, count, exclude) {
    // Create an array of numbers in the specified range
    let numbers = [];
    for (let i = start; i <= end; i++) {
      if (i !== exclude) {
        numbers.push(i);
      }
    }

    // Shuffle the array
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Return the specified number of elements
    return numbers.slice(0, count);
  }

  /**
   *
   * @param {min bet amount} _min
   * @param {Max bet amount} _max
   * @returns array of a range of numbers
   */
  BetRangecalculation(_min, _max) {
    let rangePeakArr = [0.1, 0.2, 0.5, 0.7, 0.8, 1.0];
    let betAmtRangeArray = [];
    betAmtRangeArray.push(_min);
    for (let i = 0; i < rangePeakArr.length; i++) {
      let calculatedValue = parseInt(_max * rangePeakArr[i]);
      if (calculatedValue < 1000) {
        betAmtRangeArray.push(calculatedValue);
      } else {
        betAmtRangeArray.push(`${calculatedValue / 1000}K`);
      }
    }
    return betAmtRangeArray;
  }
  /**
   * Getting parameters from url
   * @param {String} name
   * @param {String} url
   * @returns
   */
  getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  /**
   * Data Encrypted
   * @param {text} plainData
   * @returns
   */
  DataEncryption(plainData) {
    let key = CryptoJS.enc.Utf8.parse("81A3565AE4A94EBEB80467EE47083CA7");
    let iv = CryptoJS.enc.Utf8.parse("");
    let methodEncryptedData = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(plainData),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return methodEncryptedData.toString();
  }
  /**
   * Data decryption
   * @param {text} encryptedData
   * @returns
   */
  DataDecryption(encryptedData) {
    let key = CryptoJS.enc.Utf8.parse("81A3565AE4A94EBEB80467EE47083CA7");
    let iv = CryptoJS.enc.Utf8.parse("");
    let methodDecryptedData = CryptoJS.AES.decrypt(encryptedData, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return methodDecryptedData.toString(CryptoJS.enc.Utf8);
  }

  TimeGapBetweenEndAndStart(_start, _end) {
    return (
      parseInt(Date.parse(_end) / 1000) - parseInt(Date.parse(_start) / 1000)
    );
  }

  //convert 2k into 2000 , 3k into 30000
  convertKToNumber(str) {
    if (typeof str !== "string") {
      // throw new Error('Input must be a string');
      return str;
    }
    const match = str.match(/^(\d+)(K)$/i);
    if (!match) {
      return Number(str);
    } else {
      const numberPart = Number(match[1]);
      const multiplier = match[2].toLowerCase() === "k" ? 1000 : 1;
      return numberPart * multiplier;
    }
  }

  convertToK(number) {
    if (number > 999) {
      // Divide the number by 1000 and round to 1 decimal place
      const result = number / 1000; //.toFixed(1);

      // Append 'K' to the result and return as a string
      return result + "K";
    } else {
      // If the number is less than 1000, return it as is
      return number;
    }
  }

  BetUpdate(a, b, op) {
    const s = 1e12;

    const A = Math.round(a * s);
    const B = Math.round(b * s);

    switch (op) {
      case '+': return (A + B) / s;
      case '-': return (A - B) / s;
      case '*': return (A * B) / (s * s);
      case '/': return A / B;
      default: throw new Error("Invalid operator");
    }


  }
  // convertStringToArray(inputString) {
  //   if (inputString != undefined) {
  //     const inputArray = inputString.split(",");
  //     return inputArray.map((value) => {
  //       const num = parseInt(value, 10);

  //       if (num < 1000) {
  //         return num;
  //       } else if (num < 1000000) {
  //         return num / 1000 + "K";
  //       } else {
  //         return num / 1000000 + "M";
  //       }
  //     });
  //   }
  // }
  ConvertToKArray(values) {
    const formattedValues = values.map((value) => {
      const num = parseFloat(value); // Convert string to number

      if (num >= 1000) {
        // Convert large numbers to 'k' format
        return num / 1000 + "K";
      } else {
        // Return the number without decimals
        return Number(num);
      }
    });

    return formattedValues; // Return the formatted array
  }
}

let utils = new Utils();
export { utils as Utils };
