const fs = require('fs');
const request = require('request');


//read data from console
//save url into url variable, save path to path variable
//request a connection to the url
//save body of reply into data variable
//write data into file at path
//once completed should print message "Downloaded and saved ${n} bytes to ${path}"

const url = process.argv[2];
const localPath = process.argv[3];

const fetchAndSave = (url, localpath) => {
  
  request(url, (error, response, body) => {

    if (error) {
      console.log("Error! Request to connect to", url, " failed see details below.\n", error);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Error Issues Connecting! Status Code: ${response.statusCode}`;
      localpath(Error(msg), null);
      return;
    }

    fs.writeFile(localpath, body, (error) => {
      if (error) {
        console.log("Error saving! Details below.\n", error);
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${localpath}`);
      }
    });

  });
};

if (!url || !localPath) {
  console.log("Two valid parameters are required.");
} else {
  fetchAndSave(url, localPath);
}
