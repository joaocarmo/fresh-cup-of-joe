const faker = require('faker')

class FakeTweet {
  static lastId = 0

  static generate() {
    this.lastId += 1

    return {
      id: this.lastId,
      image: faker.internet.avatar(),
      text: faker.lorem.sentences(),
      username: faker.internet.userName(),
    }
  }
}

module.exports = FakeTweet
