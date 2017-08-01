var shell, spawn, tty;
spawn = require('child_process').spawn;
tty = require('tty');

shell = function(cmd, opts) {
  var p;
  process.stdin.pause();
  p = spawn(cmd, opts, {
    customFds: [0, 1, 2]
  });
  return p.on('exit', function() {
    process.stdin.resume();
    return process.stdin.write("\x04");
  });
};

shell('lerna', ['publish']);