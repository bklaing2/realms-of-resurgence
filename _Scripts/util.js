function util(tp) {
  return {
    pluralize,
  };

  function pluralize(number, singular, plural) {
    plural = plural === undefined ? singular + "s" : plural;
    return number == 1 ? singular : plural;
  }
}

module.exports = util;
