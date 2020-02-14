# Tutorial 3

The goals for this tutorial are:

- to introduce the data join lifecycle through [enter, update, and exit selections](https://github.com/d3/d3-selection/blob/v1.4.1/README.md#selection_join). 
- to introduce a new file structure ("boilerplate") that will allow us to incorporate application `state`.
- to learn basic [d3-transitions](https://github.com/d3/d3-transition), and leverage them to enhance understanding of the data.
- to learn to work with HTML UI elements, like [select](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) or [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), and basic event listeners.

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

## Week 3 Assignment:

- [ ] Implement your own scatterplot with a *different dataset* than the one used in our demo. 

- [ ] Implement a different transition than the one used in the demo (i.e., your dots should not move from left to center to right on transitions). Consider other visible properties that could change as an object is entering, exiting, etc. and what that change suggests about the state of that data point.

- [ ] Make intentional design decisions -- colors, sizes, axes, transitions, etc. should illustrate something interesting about or relevant to your data. 

- [ ] Post your [deployed](#Deploy) link to the Tutorial 3 post on the Commons.

**BONUS:**

- [ ] Add another UI element to your page. This means that the element should (1) update `state`, and just as the dropdown does, (2) call `draw()` on change, and (3) affect the data appropriately. Some ideas include another dropdown for another value, radio buttons, checkbox, an input field with a threshold value, etc. 

### Deploy

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the link to your deployed example as a comment to the appropriate post on the Commons. (Note: your link will look something like: `https://YOUR_USERNAME.github.io/Interactive-Data-Vis-Sp2020/TUTORIAL_PATH/`)

To receive full credit, you must post your stable path before the start of the next class.

## Resources:

[d3 scales](https://github.com/d3/d3-scale)

[d3 transitions](https://github.com/d3/d3/blob/master/API.md#transitions-d3-transition)

[d3 join]((https://github.com/d3/d3-selection/blob/v1.4.1/README.md#selection_join))

[MDN HTML input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
