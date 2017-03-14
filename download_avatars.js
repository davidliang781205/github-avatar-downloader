var request = require('request');
var fs = require('fs');

const GITHUB_USER = "davidliang781205";
const GITHUB_TOKEN = "32916607b43c4dfa5d5ef8d8c950114eb5219956";
const BASE_URL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/';



console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {

  // Check if any of the parameter is empty
  if (!repoOwner || !repoName){
    console.log('Please supply correct repoOwner and repoName.\nnode download_avatars.js <owner> <repo>');
  } else {
    var options = {
      url: BASE_URL + repoOwner + '/' + repoName + '/contributors',
      headers: {
        'User-Agent': 'GitHub Avatar Downloader - Student Project'
      }
    };

    request(options, function(err, response, body) {
      if (err) throw err;
      // Parsing output to Object
      var o = JSON.parse(body);
      o.forEach((obj) => {
        // Build the filePath with login name
        var filePath = 'avatars/' + obj.login + '.jpg';
        cb(obj.avatar_url, filePath);
      });
    });
  }
}



function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)
      .on('error', function (err) {
        throw err;
      })
      .on('response', function (response) {
     })
      // Print message upon successful download
      .on('end', (end) => console.log('Download completed!'))
      .pipe(fs.createWriteStream(filePath))
}



getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);










