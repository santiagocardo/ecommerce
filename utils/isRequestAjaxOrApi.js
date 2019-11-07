function isRequestAjaxOrApi(req) {
  const comesFromApi = req.originalUrl.includes("/api/")
  return comesFromApi || req.xhr
}

module.exports = isRequestAjaxOrApi