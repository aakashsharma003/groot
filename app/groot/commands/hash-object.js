const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const zlib = require("zlib");
class HashObjectCommand {
  constructor(flag, filePath) {
    this.flag = flag;
    this.filePath = filePath;
  }
  execute() {
    //    1. Make sure that file is there
    const filepath = path.resolve(this.filePath);
    if (!fs.existsSync(filepath))
      throw new Error(
        `fatal: could not open ${this.filePath} for reading: No such file or directory`
      );
    //    2. read the file
    const fileContent = fs.readFileSync(filepath);
    const fileLength = fileContent.length;
    //    3. create blob
    // blob <size>\0 <content>
    const header = `blob ${fileLength}\0`;
    const blob = Buffer.concat([Buffer.from(header), fileContent]);

    //    5. calculate hash
    const hash = crypto.createHash("sha1").update(blob).digest("hex");
    //   crypt:[Algo]:[kisko hash krna h]:[kis format mai wapas krna h]
    //    6.Perform Opration acc. to flag! is passed or not?
    //  (1). If -w flag appears in the command then write the hash of compressed content in hash[0...2]/hash[2...]

    if(this.flag && this.flag == '-w'){
        const folder = hash.slice(0,2);
        const file = hash.slice(2);

        const completeFolderPath = path.join(process.cwd(),'.groot', 'objects', folder);

        if (!fs.existsSync(completeFolderPath))
          fs.mkdirSync(completeFolderPath, {recursive:true});
         //  compress the content
        const compressedData = zlib.deflateSync(blob);
        fs.writeFileSync(path.join(completeFolderPath, file), compressedData);

    }

    //  (2). If flag does'nt appear then stdout the hash only
    process.stdout.write(hash);
  }
}

module.exports = HashObjectCommand;
