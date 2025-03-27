import CryptoJS from 'crypto-js'

class Enc {
  static async fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as ArrayBuffer)
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
  }

  static isTextFile(filename: string): boolean {
    const textExtensions = [
      '.txt', '.csv', '.json', '.xml', '.html', '.htm', '.css', '.js', '.ts', 
      '.jsx', '.tsx', '.md', '.log', '.ini', '.conf', '.yml', '.yaml', '.vue'
    ]
    const lowerFilename = filename.toLowerCase()
    return textExtensions.some(ext => lowerFilename.endsWith(ext))
  }

  static bufferToWordArray(buffer: ArrayBuffer): CryptoJS.lib.WordArray {
    const bytes = new Uint8Array(buffer);
    const words: number[] = [];
    
    for (let i = 0; i < bytes.length; i += 4) {
      words.push(
        (bytes[i] << 24) |
        ((i + 1 < bytes.length ? bytes[i + 1] : 0) << 16) |
        ((i + 2 < bytes.length ? bytes[i + 2] : 0) << 8) |
        (i + 3 < bytes.length ? bytes[i + 3] : 0)
      );
    }
    
    return CryptoJS.lib.WordArray.create(words, bytes.length);
  }

  static wordArrayToBuffer(wordArray: CryptoJS.lib.WordArray): ArrayBuffer {
    const words = wordArray.words;
    const sigBytes = wordArray.sigBytes;
    
    const u8 = new Uint8Array(sigBytes);
    let byte = 0;
    
    for (let i = 0; i < sigBytes; i++) {
      const wordIndex = Math.floor(i / 4);
      const bytePosition = 3 - (i % 4);
      byte = (words[wordIndex] >> (bytePosition * 8)) & 0xff;
      u8[i] = byte;
    }
    
    return u8.buffer;
  }

  static encryptText(text: string, key: string, alg = 'aes'): string {
    const keyWA = CryptoJS.enc.Utf8.parse(key);
    const cryptConfig = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    };
    
    let encrypted;
    switch (alg) {
      case 'des':
        encrypted = CryptoJS.DES.encrypt(text, keyWA, cryptConfig);
        break;
      case '3des':
        encrypted = CryptoJS.TripleDES.encrypt(text, keyWA, cryptConfig);
        break;
      default:
        encrypted = CryptoJS.AES.encrypt(text, keyWA, cryptConfig);
    }
    
    return encrypted.toString();
  }

  static decryptText(ciphertext: string, key: string, alg = 'aes'): string {
    const keyWA = CryptoJS.enc.Utf8.parse(key);
    const cryptConfig = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    };
    
    let decrypted;
    switch (alg) {
      case 'des':
        decrypted = CryptoJS.DES.decrypt(ciphertext, keyWA, cryptConfig);
        break;
      case '3des':
        decrypted = CryptoJS.TripleDES.decrypt(ciphertext, keyWA, cryptConfig);
        break;
      default:
        decrypted = CryptoJS.AES.decrypt(ciphertext, keyWA, cryptConfig);
    }
    
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  static isTextContent(buffer: ArrayBuffer): boolean {
    const uint8Array = new Uint8Array(buffer)
    const bytesToCheck = Math.min(1000, uint8Array.length)
    
    let textCharCount = 0;
    let binaryCharCount = 0;
    
    for (let i = 0; i < bytesToCheck; i++) {
      const byte = uint8Array[i]
      if ((byte >= 32 && byte <= 126) || byte === 9 || byte === 10 || byte === 13) {
        textCharCount++;
      } else {
        binaryCharCount++;
      }
    }
    
    return (textCharCount / bytesToCheck) > 0.9;
  }

  static async createBlobFromDecryptedData(buffer: ArrayBuffer, fileName: string): Promise<Blob> {
    try {
      const bytes = new Uint8Array(buffer);
      const headerBytes = bytes.slice(0, Math.min(16, bytes.length));
      let mimeType = 'application/octet-stream';
      
      if (headerBytes[0] === 0xFF && headerBytes[1] === 0xD8 && headerBytes[2] === 0xFF) {
        mimeType = 'image/jpeg';
      } 
      else if (headerBytes[0] === 0x89 && headerBytes[1] === 0x50 && headerBytes[2] === 0x4E && 
               headerBytes[3] === 0x47 && headerBytes[4] === 0x0D && headerBytes[5] === 0x0A) {
        mimeType = 'image/png';
      }
      else if (headerBytes[0] === 0x47 && headerBytes[1] === 0x49 && headerBytes[2] === 0x46 && 
               headerBytes[3] === 0x38) {
        mimeType = 'image/gif';
      }
      else if (headerBytes[0] === 0x25 && headerBytes[1] === 0x50 && headerBytes[2] === 0x44 && 
               headerBytes[3] === 0x46) {
        mimeType = 'application/pdf';
      }
      else if (headerBytes[0] === 0x50 && headerBytes[1] === 0x4B) {
        const extension = fileName.split('.').pop()?.toLowerCase();
        if (extension === 'docx') {
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        } else if (extension === 'xlsx') {
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        } else if (extension === 'pptx') {
          mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        } else {
          mimeType = 'application/zip';
        }
      }
      else {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (ext) {
          const mimeMap: Record<string, string> = {
            'txt': 'text/plain',
            'html': 'text/html',
            'css': 'text/css',
            'js': 'text/javascript',
            'json': 'application/json',
            'pdf': 'application/pdf',
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'svg': 'image/svg+xml',
            'mp3': 'audio/mpeg',
            'mp4': 'video/mp4',
            'wav': 'audio/wav',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'zip': 'application/zip',
            'rar': 'application/x-rar-compressed'
          };
          
          if (mimeMap[ext]) {
            mimeType = mimeMap[ext];
          }
        }
      }
      
      if (this.isTextFile(fileName) || mimeType.startsWith('text/')) {
        try {
          const textDecoder = new TextDecoder('utf-8');
          const text = textDecoder.decode(buffer);
          if (text && text.length > 0 && this.isTextContent(buffer)) {
            return new Blob([text], { type: mimeType });
          }
        } catch (e) {
          console.warn('文本解码失败，使用二进制模式', e);
        }
      }
      
      return new Blob([buffer], { type: mimeType });
    } catch (error) {
      console.error('创建Blob对象失败:', error);
      return new Blob([buffer], { type: 'application/octet-stream' });
    }
  }

  static detectOldEncryptFormat(buffer: ArrayBuffer): boolean {
    const headerBytes = new Uint8Array(buffer.slice(0, 4));
    
    return false;
  }

  static async encrypt(data: ArrayBuffer, key: string, alg = 'aes'): Promise<ArrayBuffer> {
    try {
      const wordArray = CryptoJS.lib.WordArray.create(
        new Uint32Array(data.slice(0, Math.floor(data.byteLength / 4) * 4))
      );
      
      if (data.byteLength % 4 !== 0) {
        const remaining = new Uint8Array(data.slice(Math.floor(data.byteLength / 4) * 4));
        let word = 0;
        for (let i = 0; i < remaining.length; i++) {
          word |= remaining[i] << (8 * (3 - i));
        }
        wordArray.words.push(word);
        wordArray.sigBytes += remaining.length;
      }
      
      const keyWA = CryptoJS.SHA256(key);
      
      const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
      
      const cryptConfig = {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      };
      
      let encrypted;
      switch (alg) {
        case 'des':
          encrypted = CryptoJS.DES.encrypt(wordArray, keyWA, cryptConfig);
          break;
        case '3des':
          encrypted = CryptoJS.TripleDES.encrypt(wordArray, keyWA, cryptConfig);
          break;
        default:
          encrypted = CryptoJS.AES.encrypt(wordArray, keyWA, cryptConfig);
      }
      
      const ciphertext = encrypted.ciphertext;
      const resultArray = new Uint8Array(1 + iv.sigBytes + ciphertext.sigBytes);
      
      resultArray[0] = iv.sigBytes;
      
      for (let i = 0; i < iv.sigBytes; i++) {
        resultArray[i + 1] = (iv.words[Math.floor(i / 4)] >>> (24 - 8 * (i % 4))) & 0xff;
      }
      
      for (let i = 0; i < ciphertext.sigBytes; i++) {
        resultArray[i + 1 + iv.sigBytes] = 
          (ciphertext.words[Math.floor(i / 4)] >>> (24 - 8 * (i % 4))) & 0xff;
      }
      
      return resultArray.buffer;
    } catch (error) {
      console.error('加密过程中出错:', error);
      throw new Error(`加密失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  static async decrypt(data: ArrayBuffer, key: string, alg = 'aes'): Promise<ArrayBuffer> {
    try {
      const dataBytes = new Uint8Array(data);
      
      if (dataBytes.length < 2) {
        throw new Error('加密数据格式无效，至少需要2字节');
      }
      
      const ivLength = dataBytes[0];
      if (dataBytes.length < 1 + ivLength) {
        throw new Error('加密数据格式无效，IV长度不正确');
      }
      
      const ivBytes = dataBytes.slice(1, 1 + ivLength);
      const iv = CryptoJS.lib.WordArray.create();
      for (let i = 0; i < ivLength; i += 4) {
        let word = 0;
        for (let j = 0; j < 4 && i + j < ivLength; j++) {
          word |= ivBytes[i + j] << (24 - 8 * j);
        }
        iv.words.push(word);
      }
      iv.sigBytes = ivLength;
      
      const ciphertextBytes = dataBytes.slice(1 + ivLength);
      const ciphertext = CryptoJS.lib.WordArray.create();
      for (let i = 0; i < ciphertextBytes.length; i += 4) {
        let word = 0;
        for (let j = 0; j < 4 && i + j < ciphertextBytes.length; j++) {
          word |= ciphertextBytes[i + j] << (24 - 8 * j);
        }
        ciphertext.words.push(word);
      }
      ciphertext.sigBytes = ciphertextBytes.length;
      
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: ciphertext,
        iv: iv
      });
      
      const keyWA = CryptoJS.SHA256(key);
      
      const cryptConfig = {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      };
      
      let decrypted;
      switch (alg) {
        case 'des':
          decrypted = CryptoJS.DES.decrypt(cipherParams, keyWA, cryptConfig);
          break;
        case '3des':
          decrypted = CryptoJS.TripleDES.decrypt(cipherParams, keyWA, cryptConfig);
          break;
        default:
          decrypted = CryptoJS.AES.decrypt(cipherParams, keyWA, cryptConfig);
      }
      
      if (decrypted.sigBytes <= 0) {
        throw new Error('解密失败，可能是密钥错误或数据已损坏');
      }
      
      const resultArray = new Uint8Array(decrypted.sigBytes);
      for (let i = 0; i < decrypted.sigBytes; i++) {
        resultArray[i] = (decrypted.words[Math.floor(i / 4)] >>> (24 - 8 * (i % 4))) & 0xff;
      }
      
      return resultArray.buffer;
    } catch (error) {
      console.error('解密过程中出错:', error);
      throw new Error(`解密失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

export default Enc; 
