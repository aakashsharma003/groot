[![progress-banner](https://backend.codecrafters.io/progress/git/4cf025bd-885f-4546-ac5a-c78a1bb8270e)](https://app.codecrafters.io/users/codecrafters-bot?r=2qF)

This is a starting point for Open Source solutions to the
["Build Your Own Git"](https://codecrafters.io/challenges/git).

In this challenge, you'll build a small Git implementation that's capable of
initializing a repository, creating commits and cloning a public repository.
Along the way we'll learn about the `.git` directory, Git objects (blobs,
commits, trees etc.), Git's transfer protocols and more.

# Testing locally

The `your_program.sh` script is expected to operate on the `.git` folder inside
the current working directory. 

```sh
mkdir -p /tmp/testing && cd /tmp/testing
/path/to/your/repo/your_program.sh init
```

To make this easier to type out, you could add a
[shell alias](https://shapeshed.com/unix-alias/):

```sh
alias mygit=/path/to/your/repo/your_program.sh

mkdir -p /tmp/testing && cd /tmp/testing
mygit init
```
