let request = require('request-promise-native');

let getLatestVersion = function(uri) {
  return request(uri)
  .then(function (body) {
    let manifest = JSON.parse(body);

    let module = manifest.modules.filter(function (module) {
      return module.id === 'google-cloud';
    })[0];

    return module.versions[0];
  });
};

Promise.all([
  getLatestVersion('https://googlecloudplatform.github.io/google-cloud-php/manifest.json'),
  getLatestVersion('https://raw.githubusercontent.com/GoogleCloudPlatform/google-cloud-php/gh-pages/manifest.json'),
]).then(function(res) {
  if (res[0] !== res[1]) {
    console.log('documentation site is out of date');
    process.exit(1);
  }
});
