class UUID {
  constructor() {
    if (this instanceof UUID) {
      throw Error('A static class cannot be instantiated.')
    }
  }

  static generate() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }
}