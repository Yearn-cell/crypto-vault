import { defineStore } from 'pinia'

interface CryptoState {
  key: string
  algorithm: string
  fileData: ArrayBuffer | null
  fileName: string
  processed: boolean
  result: ArrayBuffer | null
}

export const useCryptoStore = defineStore('crypto', {
  state: (): CryptoState => ({
    key: '',
    algorithm: 'aes',
    fileData: null,
    fileName: '',
    processed: false,
    result: null
  }),
  actions: {
    setKey(key: string) {
      this.key = key
    },
    setAlgorithm(algorithm: string) {
      this.algorithm = algorithm
    },
    setFileData(data: ArrayBuffer, name: string) {
      this.fileData = data
      this.fileName = name
      this.processed = false
      this.result = null
    },
    setResult(data: ArrayBuffer) {
      this.result = data
      this.processed = true
    },
    reset() {
      this.$patch({
        key: '',
        algorithm: 'aes',
        fileData: null,
        fileName: '',
        processed: false,
        result: null
      })
    }
  }
}) 