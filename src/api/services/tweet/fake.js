class FakeTweet {
  static generate() {
    return {
      id: 1,
      image: 'https://picsum.photos/200',
      text: 'Hello there !',
      username: 'Obi-Wan Kenobi',
    }
  }
}

module.exports = FakeTweet
