function compare(password, hashPasswor) {
  return password === hashPasswor;
}

module.exports = { compare };
