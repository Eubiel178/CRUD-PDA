export class LocalStorage {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.value));
  }

  get() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  remove() {
    localStorage.removeItem(this.key);
  }
}
