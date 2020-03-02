const workboxBuild = require('workbox-build');
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js', // this is your sw template file
    swDest: 'build/sw.js', // this will be created in the build step
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{js,css,html,png}',
    ]
  }).then((response) => {
    console.log('response from injectManifest ', response)
    // Optionally, log any warnings and details.
    response.warnings.forEach(console.warn);
    console.log(`${response.count} files will be precached, totaling ${response.size} bytes.`);
  });
}
buildSW();