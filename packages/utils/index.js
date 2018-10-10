module.exports.fsString = s =>
  s && s.replace(/[^a-z0-9\.\-\@]/gi, "_").toLowerCase();
