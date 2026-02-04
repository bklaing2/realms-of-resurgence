function util(tp) {
  return {
    shouldIgnore,
    getFilesByProperties,
    pluralize,
  };

  function shouldIgnore(file) {
    return (
      file.path
        .split("/")
        .map((f) => f[0])
        .filter((f) => f === "_").length > 0
    );
  }

  function getFilesByProperties(filter) {
    return tp.app.vault.getMarkdownFiles().filter((file) => {
      if (tp.user.util(tp).shouldIgnore(file)) return false;

      const cache = tp.app.metadataCache.getFileCache(file);
      if (!cache?.frontmatter) return false;

      return filter(cache.frontmatter);
    });
  }

  function pluralize(number, singular, plural) {
    plural = plural === undefined ? singular + "s" : plural;
    return number == 1 ? singular : plural;
  }
}

module.exports = util;
