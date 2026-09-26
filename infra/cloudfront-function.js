// CloudFront Function (viewer-request, runtime cloudfront-js-2.0)
// - Redirects www → apex
// - Maps /pricing and /pricing/ to /pricing/index.html (S3 REST origin + OAC has no index documents)
function handler(event) {
  var req = event.request;
  var host = req.headers.host && req.headers.host.value;

  if (host && host.indexOf('www.') === 0) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: 'https://' + host.slice(4) + req.uri } },
    };
  }

  var uri = req.uri;
  if (uri.endsWith('/')) {
    req.uri = uri + 'index.html';
  } else if (uri.lastIndexOf('.') < uri.lastIndexOf('/') + 1) {
    // No file extension: /pricing → /pricing/ (canonical, trailing slash)
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: uri + '/' } },
    };
  }
  return req;
}
