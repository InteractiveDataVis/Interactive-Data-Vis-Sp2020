# Tutorial 5

The goals for this tutorial are:

- To explore geojson data, and how geographical features on our earth translate to projected shapes on an svg. 
- To understand [projections](https://github.com/d3/d3-geo#projections), in conjunction with [d3.geo-path](https://github.com/d3/d3-geo#geoPath), transforms lattitude and longitude space into pixel space.
- To grasp that d3.js svg maps are as simple as lines and circles, and can be manipulated as such, with stroke, fill, etc. 

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

## Week 5 Assignment:

- [ ] Implement your own version of the map, using the us state geojson data provided in the [data folder](../data/).

- [ ] Using your own lat/long dataset _OR_ the provided dataset for this exercise, [`usHeatExtremes.csv`](../data/usHeatExtremes.csv) (also in the [data folder](../data/)), add points to your map. *HINT:* since we're still in svg, we can just add circles to the map, like we've done before, but you'll need to [invert your projection](https://github.com/d3/d3-geo#projection_invert) to place them. 

- [ ] Make intentional design decisions -- colors, sizes, axes, transitions, etc. should illustrate something interesting about or relevant to your data.

- [ ] Post your [deployed](#Deploy) link to the Tutorial 5 post on the Commons.

**BONUS:**

- [ ] Add another data element to your map, such as using color or radius to represent a value, [like this](https://observablehq.com/@d3/bubble-map). 

- [ ] Implement transitions on your points, so the map begins blank, then they appear in a thoughtful way. 

### Deploy

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the link to your deployed example as a comment to the appropriate post on the Commons. (Note: your link will look something like: `https://YOUR_USERNAME.github.io/Interactive-Data-Vis-Sp2020/TUTORIAL_PATH/`)

To receive full credit, you must post your stable path before the start of the next class.

## Resources:

[d3 geo](https://github.com/d3/d3-geo)

[d3 scales](https://github.com/d3/d3-scale)

[d3 transitions](https://github.com/d3/d3/blob/master/API.md#transitions-d3-transition)

[d3 join](<(https://github.com/d3/d3-selection/blob/v1.4.1/README.md#selection_join)>)

[MDN HTML selection](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
