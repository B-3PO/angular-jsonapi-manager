angular
  .module('jsonapiManager')
  .factory('dMLZString', LZStringService);




function LZStringService () {

  var service = {
    compressToUTF16: compressToUTF16,
    decompressFromUTF16: decompressFromUTF16,
  };
  return service;



  function compressToUTF16(input) {
    if (input === null) { return ''; }

    var c;
    var length;
    var i = 0;
    var output = '';
    var current = 0;
    var status = 0;

    input = compress(input);
    length = input.length;

    while (i < length) {
      c = input.charCodeAt(i);
      i++;

      switch (status) {
        case 0:
          output += String.fromCharCode((c >> 1) + 32);
          current = (c & 1) << 14;
          status++;
          break;

        case 14:
          output += String.fromCharCode((current + (c >> 15)) + 32, (c & 32767) + 32);
          status = 0;
          break;

        default:
          output += String.fromCharCode((current + (c >> (status + 1))) + 32);
          current = (c & ((2 << status) - 1)) << (14 - status);
          status++;
          break;
      }
    }

    return output + String.fromCharCode(current + 32);
  }


  function decompressFromUTF16(input) {
    if (input === null) { return ''; }

    var c;
    var i = 0;
    var output = '';
    var current = 0;
    var length = input.length;


    while (i < length) {
      c = input.charCodeAt(i) - 32;

      if ((i & 15) !== 0) {
        output += String.fromCharCode(current | (c >> (15 - (i & 15))));
      }

      current = (c & ((1 << (15 - (i & 15))) - 1)) << ((i+1) & 15);

      i++;
    }

    return decompress(output);
  }


  function writeBit(value, data) {
    data.val = (data.val << 1) | value;

    if (data.position == 15) {
      data.position = 0;
      data.string += String.fromCharCode(data.val);
      data.val = 0;
    } else {
      data.position++;
    }
  }

  function writeBits(numBits, value, data) {
    var i = 0;
    var length = numBits;

    if (typeof(value) == "string") { value = value.charCodeAt(0); }

    while (i < length) {
      i++;

      writeBit(value & 1, data);
      value = value >> 1;
    }
  }

  function produceW(context) {
    if (context.dictionaryToCreate[context.w]) {
      if (context.w.charCodeAt(0) < 256) {
        writeBits(context.numBits, 0, context.data);
        writeBits(8, context.w, context.data);
      } else {
        writeBits(context.numBits, 1, context.data);
        writeBits(16, context.w, context.data);
      }
      decrementEnlargeIn(context);
      delete context.dictionaryToCreate[context.w];
    } else {
      writeBits(context.numBits, context.dictionary[context.w], context.data);
    }
    decrementEnlargeIn(context);
  }

  function decrementEnlargeIn(context) {
    context.enlargeIn--;

    if (context.enlargeIn === 0) {
      context.enlargeIn = Math.pow(2, context.numBits);
      context.numBits++;
    }
  }

  function compress(uncompressed) {
    if (uncompressed === null || uncompressed === undefined) {
      return '';
    }

    var context = {
      dictionary: {},
      dictionaryToCreate: {},
      c: '',
      wc: '',
      w: '',
      enlargeIn: 2, // Compensate for the first entry which should not count
      dictSize: 3,
      numBits: 2,
      result: '',
      data: {string: '', val: 0, position: 0}
    };

    var i = 0;
    var length = uncompressed.length;

    while (i < length) {
      context.c = uncompressed.charAt(i);
      i++;

      if (!context.dictionary[context.c]) {
        context.dictionary[context.c] = context.dictSize++;
        context.dictionaryToCreate[context.c] = true;
      }

      context.wc = context.w + context.c;
      if (context.dictionary[context.wc]) {
        context.w = context.wc;
      } else {
        produceW(context);
        // Add wc to the dictionary.
        context.dictionary[context.wc] = context.dictSize++;
        context.w = String(context.c);
      }
    }

    // Output the code for w.
    if (context.w !== '') {
      produceW(context);
    }

    // Mark the end of the stream
    writeBits(context.numBits, 2, context.data);

    // Flush the last char
    while (true) {
      context.data.val = (context.data.val << 1);
      if (context.data.position == 15) {
        context.data.string += String.fromCharCode(context.data.val);
        break;
      }
      else context.data.position++;
    }

    return context.data.string;
  }

  function readBit(data) {
    var res = data.val & data.position;
    data.position >>= 1;
    if (data.position === 0) {
      data.position = 32768;
      data.val = data.string.charCodeAt(data.index++);
    }
    return res > 0 ? 1 : 0;
  }

  function readBits(numBits, data) {
    var res = 0;
    var maxpower = Math.pow(2, numBits);
    var power = 1;
    while (power != maxpower) {
      res |= readBit(data) * power;
      power <<= 1;
    }
    return res;
  }

  function decompress(compressed) {
    if (compressed === '') {
      return null;
    }

    if (compressed === null || compressed === undefined) {
      return '';
    }

    var next;
    var result;
    var w;
    var c;
    var i = 0;
    var dictionary = {};
    var enlargeIn = 4;
    var dictSize = 4;
    var numBits = 3;
    var entry = '';
    var errorCount = 0;
    var data = {string: compressed, val: compressed.charCodeAt(0), position: 32768, index: 1};

    while (i < 3) {
      dictionary[i] = i;
      i++;
    }

    next = readBits(2, data);
    switch (next) {
      case 0:
        c = String.fromCharCode(readBits(8, data));
        break;
      case 1:
        c = String.fromCharCode(readBits(16, data));
        break;
      case 2:
        return '';
    }

    dictionary[3] = c;
    w = result = c;
    while (true) {
      c = readBits(numBits, data);

      switch (c) {
        case 0:
          if (errorCount++ > 10000) return "Error";
          c = String.fromCharCode(readBits(8, data));
          dictionary[dictSize++] = c;
          c = dictSize - 1;
          enlargeIn--;
          break;
        case 1:
          c = String.fromCharCode(readBits(16, data));
          dictionary[dictSize++] = c;
          c = dictSize - 1;
          enlargeIn--;
          break;
        case 2:
          return result;
      }

      if (enlargeIn === 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }
      result += entry;

      // Add w+entry[0] to the dictionary.
      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;

      w = entry;

      if (enlargeIn === 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }
    }
  }

}
