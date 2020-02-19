function Command(name, desc, hand) {
    this.name = name;
    this.description = desc;
    this.handler = hand;
}

module.exports = Command