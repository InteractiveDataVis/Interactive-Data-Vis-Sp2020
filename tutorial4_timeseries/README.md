# Tutorial 4

The goals for this tutorial are:

- Introduce [d3 line](https://github.com/d3/d3-shape#lines) generators, and solidify how a function generator works differently than the appending and manipulating elements we've done so far.
- Reinforce the boilerplate logic, with some slight updates, to further understand the data lifecycle (both for javascript and d3.js enter, update, and exit).
- Practice [transitions](https://github.com/d3/d3-transition) on elements we know already, but also introduce new types of transitions on scales.

## How to setup, serve, and deploy:

From tutorial 1, you should have all the correct [installations](../README.md#setup), and have set up your [git flow](../GIT_SETUP.md) (forking, cloning, setting upstream, etc.).

For this tutorial, you will **still need** to get a [basic server](../BASIC_SERVER.md) up and running. Use your terminal (or git bash, on PC) to navigate to the _root directory_ of your fork. Your path may look different, but the command will be something like this:

```sh
$ cd Documents/My\ Repositories/Interactive-Data-Vis-Sp2020/
```

To pull down the latest code from our class repository to your local machine, use the following git commands:

```sh
# pulls the upstream changes and stores them in `upstream/master`
$ git fetch upstream
```

You should see the branches from our upstream repository in a list. Then run:

```sh
# merges the changes from upstream into your current branch
$ git merge upstream/master
```

If your bash sends you into a `vim` [screen](https://computers.tutsplus.com/tutorials/vim-for-beginners--cms-21118), exit the commit message by typing `:q`.

This will merge the demo folder, and the updated data, and any updates to the starter code into your local repository. Now you're ready to start coding.

From this level, (_not from the tutorial folder_), run:

```sh
$ serve
```

When you open `http://localhost:5000/`, you should see your repository's folder structure.

You can view your **tutorial site** at `http://localhost:5000/TUTORIAL_PATH/`.

You can view our class **demo site** at `http://localhost:5000/TUTORIAL_PATH/demo/`.

(note: make sure to change `TUTORIAL_PATH`).

As you're working on the assignment, you can always reference the [demo code](demo/).

## Week 4 Assignment:

- [ ] Implement your own line chart _with a different dataset_ than the one used in our demo.

- [ ] Turn this line chart into an [area chart](https://github.com/d3/d3-shape#areas). **Tip**: Think first about how that would be drawn on the screen. What are you creating on the svg? This requires referencing the d3 documention to understand the similarities and differences between the area function generator and the line function generator.

- [ ] Make intentional design decisions -- colors, sizes, axes, transitions, etc. should illustrate something interesting about or relevant to your data.

- [ ] Post your [deployed](#Deploy) link to the Tutorial 4 post on the Commons.

**BONUS:**

- [ ] Turn this single line chart into a multi-line chart, either with this data or with your own.

- [ ] Add hover activity to your path line or circles. Try doing this only with javascript `.on("mouseover", ...)`, before resorting to the css method, `:hover`. Consider adding text annotations on hover, or maybe to highlight key events.

### Deploy

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the link to your deployed example as a comment to the appropriate post on the Commons. (Note: your link will look something like: `https://YOUR_USERNAME.github.io/Interactive-Data-Vis-Sp2020/TUTORIAL_PATH/`)

To receive full credit, you must post your stable path before the start of the next class.

## Resources:

[d3 line](https://github.com/d3/d3-shape#lines)

[d3 area](https://github.com/d3/d3-shape#areas)

[d3 scales](https://github.com/d3/d3-scale)

[d3 transitions](https://github.com/d3/d3/blob/master/API.md#transitions-d3-transition)

[d3 join](<(https://github.com/d3/d3-selection/blob/v1.4.1/README.md#selection_join)>)

[MDN HTML selection](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
