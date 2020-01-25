# Github Setup

You can read more about this github flow [here](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).

## 1. On Gitub, go to [Class Repository](https://github.com/InteractiveDataVis/Interactive-Data-Vis-Sp2020).

## 2. Fork This repository into your own account

![](./lib/assets/fork.png)
You will now have a copy of the course repository on your own github account:
![](./lib/assets/forked.png)

## 3. On GitHub, navigate to **your fork** of the repository and clone it to your local computer.

```sh
# from Terminal:

# clone your fork to your local computer
$ git clone https://github.com/YOUR_USERNAME/Interactive-Data-Vis-Sp2020

# `cd` (change directory) into this repository
$ cd Interactive-Data-Vis-Sp2020
```

## 4. Set up your local repository so that it links back to the course repository.

see current remote branches

```sh
$ git remote -v
> origin	https://github.com/YOUR_USERNAME/Interactive-Data-Vis-Sp2020 (fetch)
> origin	https://github.com/YOUR_USERNAME/Interactive-Data-Vis-Sp2020 (push)
```

add an `upstream` remote branch so you can keep yours synced with the main class repository

```sh
$ git remote add upstream https://github.com/InteractiveDataVis/Interactive-Data-Vis-Sp2020.git
```

check remote branches again to ensure that the update worked

```sh
$ git remote -v
> origin	https://github.com/auchers/Interactive-Data-Vis-Sp2020 (fetch)
> origin	https://github.com/auchers/Interactive-Data-Vis-Sp2020 (push)
> upstream	https://github.com/InteractiveDataVis/Interactive-Data-Vis-Sp2020.git (fetch)
> upstream	https://github.com/InteractiveDataVis/Interactive-Data-Vis-Sp2020.git (push)

```

## 5. Keep your branch [synced](https://help.github.com/en/github/getting-started-with-github/fork-a-repo#keep-your-fork-synced)

## 6. Push up your changes
