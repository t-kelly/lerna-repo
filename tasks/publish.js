spawn = require('child_process').spawn;
tty = require('tty');

shell = function(cmd, opts, callback) {
   var p;
   process.stdin.pause();
   tty.setRawMode(false);


   p = spawn(cmd, opts, {
     customFds: [0, 1, 2]
   });
   return p.on('exit', function() {
     tty.setRawMode(true);
     process.stdin.resume();
     return callback();
   });
};
shell('lerna', ['publish'], function() {
   return process.exit();
});