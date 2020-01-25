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

```sh
$ git fetch upstream
# pulls the upstream changes and stores them in `upstream/master`

```

```sh
$ git merge upstream/master
# merges the changes from upstream into your current branch
```

## 6. Push up and deploy your changes

When you are ready to push up your code, you can run:

```sh
$ git push
```

To deploy your site on [Github Pages](https://help.github.com/en/github/working-with-github-pages/creating-a-github-pages-site#creating-your-site) you can go to your repository's `Settings` tab and then scroll down to `GitHub Pages` section. Select `master branch` as source and then your site will be avallable.

![](./lib/assets/pages.png)
