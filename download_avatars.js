var request = require('request');
var fs = require('fs');
require('dotenv').config();


const BASE_URL = 'https://'+ process.env.GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/';



console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {

  // Check if any of the parameter is empty
  if (!repoOwner || !repoName){


    cb(new Error('Please supply correct repoOwner and repoName.\nnode download_avatars.js <owner> <repo>'));

    // console.log('Please supply correct repoOwner and repoName.\nnode download_avatars.js <owner> <repo>');
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
      let o = JSON.parse(body);

      // Handling if repo has no contributor
      if (o && o.length){
        o.forEach((obj) => {
          // Build the filePath with login name
          var filePath = 'avatars/' + obj.login + '.jpg';
          cb(obj.avatar_url, filePath);
        });
      } else {
        console.log('No data in this repo.');
      }

    });
  }
}



function downloadImageByURL(err, url, filePath) {
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










