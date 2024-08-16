const fs = require("fs");
const path = require("path");

const { CatfileCommand, HashObjectCommand } = require("./groot/commands");
const GitClient = require("./groot/client");
// You can use print statements as follows for debugging, they'll be visible when running tests.
// console.log("Logs from your program will appear here!");

const grootClient = new GitClient();

// Uncomment this block to pass the first stage
const command = process.argv[2];
//
switch (command) {
  case "init":
    createGitDirectory();
    break;
  case "cat-file":
    handleCatFileCommand();
    break;
  case "hash-object":
   handleHashObjectCommand();
   break;
  default:
    throw new Error(`Unknown command ${command}`);
}
//
function createGitDirectory() {
  fs.mkdirSync(path.join(process.cwd(), ".groot"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), ".groot", "objects"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(process.cwd(), ".groot", "refs"), { recursive: true });

  fs.writeFileSync(
    path.join(process.cwd(), ".groot", "HEAD"),
    "ref: refs/heads/main\n"
  );
  console.log("Initialized groot directory");
}

function handleCatFileCommand() {
  const flag = process.argv[3];
  const commitSHA = process.argv[4];
  // we can verify via eg: ` node .\app\main.js groot cat-file -p <HASH> ` command
  //    console.log(`flag: ${flag} and commitSHA: ${commitSHA}`);
  const command = new CatfileCommand(flag, commitSHA);
  grootClient.run(command);
}

function handleHashObjectCommand(){
   let flag = process.argv[3];
  let filePath = process.argv[4];

  if (!filePath) {
    filePath = flag;
    flag = null;
  }

  // console.log({flag, filePath})

  const command = new HashObjectCommand(flag, filePath);
  grootClient.run(command);
}