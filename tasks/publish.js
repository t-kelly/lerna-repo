spawn = require('child_process').spawn;
tty = require('tty');

shell = function(cmd, opts, callback) {
   var p;
   process.stdin.pause();
  //  tty.ReadStream.setRawMode(false);

   p = spawn(cmd, opts, {
     stdio: 'inherit'
   });
   return p.on('exit', function(code) {
    //  tty.ReadStream.setRawMode(true);
     process.stdin.resume();
     return callback(code);
   });
};

shell('lerna', ['publish'], function(code) {
  console.log(code);
   return process.exit();
});