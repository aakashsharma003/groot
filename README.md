
https://github.com/user-attachments/assets/231eb422-c286-4c29-a662-84bb778dd6fd


# Building `Groot`: A Version Control System like `Git`

This repository serves as a starting point for the open-source solution to the ["Build Your Own Git"](https://git-scm.com/).

In this project, I'm building "Groot," a lightweight version control system that mirrors the functionality of Git. Groot will be able to initialize a repository, create commits, and clone public repositories, just like Git. Through this, we'll explore the intricacies of version control systems, including the `.groot` directory, version control objects (blobs, commits, trees), and the transfer protocols that enable repository cloning and management.

## Testing Locally

To test locally, the `your_program.sh` script should operate on the `.git` folder inside the current working directory.

You can initialize a new Groot repository using the following command:

```sh
mkdir -p /tmp/testing && cd /tmp/testing
/path/to/your/repo/your_program.sh init


alias mygit=/path/to/your/repo/your_program.sh

mkdir -p /tmp/testing && cd /tmp/testing
mygit init
```
