const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
class CatfileCommand{
    constructor(flag, commitSHA){
       this.flag = flag;
       this.commitSHA = commitSHA;
    }
    execute(){
        // Navigate to .groot/objects/commitSHA[0..2]
        // Read the commit object via navigating to file .groot/objects/commitSHA[0..2]/commitSHA[2..]
        // de-compress 
        // output 

        const flag = this.flag;
        const commitSHA = this.commitSHA;

        switch(flag){
            case '-p':{
              const folder = commitSHA.slice(0, 2);
              const file = commitSHA.slice(2);

              const completePath = path.resolve(
                process.cwd(),
                ".groot",
                "objects",
                folder,
                file
              );
              //    edge: Is this SHA exists?
              if (!fs.existsSync(completePath))
                throw new Error(`fatal: Not a valid object name ${commitSHA}`);

              const fileContent = fs.readFileSync(completePath);
              //   decompresses the file
              const outputBuffer = zlib.inflateSync(fileContent);
              //The output of cat-file must not contain a newline at the end inorder to remove that we used `split("\x00")[1]` which removes the new line
              const output = outputBuffer.toString().split("\x00")[1];

              process.stdout.write(output);
            }
            break;
        }
    }
}
module.exports = {CatfileCommand};