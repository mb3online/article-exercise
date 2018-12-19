module.exports = function createMatcher(pattern) {
  const keyRegexp = /\:[a-zA-Z]+/g;
  const keys = (pattern.match(keyRegexp) || []).map(key => key.substring(1));
  const regexp = pattern.replace(keyRegexp, '([a-zA-Z\-0-9]+)');

  return function match(route) {
    const m = route.match(new RegExp(`^${regexp}`));

    if (!m) return false;

    return m.reduce((params, match, index) => {
      if (index > 0 && keys[index - 1]) {
        params[keys[index - 1]] = match;
      }

      return params;
    }, {});
  }
}
