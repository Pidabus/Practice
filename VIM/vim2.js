import { EventEmitter } from 'events';
import crypto from 'crypto';

const CONFIG = {
  algorithm: 'sha256',
  encoding: 'hex',
  retryAttempts: 3,
  timeout: 5000
};

class DataProcessor extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = { ...CONFIG, ...options };
    this.store = new Map();
    this.status = 'idle';
  }

  async initialize() {
    this.status = 'active';
    this.emit('ready', { timestamp: Date.now() });
  }

  hashPayload(data) {
    if (!data) throw new Error('Data cannot be empty');
    return crypto
      .createHash(this.options.algorithm)
      .update(typeof data === 'string' ? data : JSON.stringify(data))
      .digest(this.options.encoding);
  }

  processItems(items) {
    return items
      .filter(item => item && item.id)
      .map(item => {
        const hash = this.hashPayload(item);
        return {
          ...item,
          checksum: hash,
          processedAt: new Date().toISOString()
        };
      });
  }

  save(key, value) {
    if (this.store.has(key)) {
      this.emit('warn', `Overwriting key: ${key}`);
    }
    this.store.set(key, value);
    return this.store.size;
  }

  retrieve(key) {
    if (!this.store.has(key)) {
      return null;
    }
    return this.store.get(key);
  }

  async executeTask(taskFn, args) {
    let attempt = 0;
    while (attempt < this.options.retryAttempts) {
      try {
        const result = await Promise.race([
          taskFn(...args),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), this.options.timeout)
          )
        ]);
        return result;
      } catch (error) {
        attempt++;
        this.emit('retry', { attempt, error: error.message });
        if (attempt >= this.options.retryAttempts) {
          this.status = 'error';
          this.emit('error', error);
          throw error;
        }
      }
    }
  }

  clear() {
    this.store.clear();
    this.status = 'idle';
  }
}

export function validateConfig(config) {
  const errors = [];
  const requiredFields = ['algorithm', 'encoding', 'timeout'];

  for (const field of requiredFields) {
    if (!(field in config)) {
      errors.push(`Missing field: ${field}`);
    }
  }

  if (typeof config.timeout !== 'number' || config.timeout <= 0) {
    errors.push('Timeout must be a positive number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export const utils = {
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => utils.deepClone(item));
    
    const cloned = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = utils.deepClone(obj[key]);
      }
    }
    return cloned;
  },

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
};

export default DataProcessor;
