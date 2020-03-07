# Tutorial 6

The goals for this tutorial are:

- To introduce [hierarchical](https://github.com/d3/d3-hierarchy) and nested data.
- To start exploring how d3-layout algorithms can help create complex views.
- To show how seemingly different views are in their nature structured very similarly (circle pack, icicle, treemap, dendrograms)

## How to setup, serve, and deploy:

[Please reference previous tutorials, we assume you know how to do this already]

## Week 6 Assignment:

- [ ] Implement your own version of the treemap we made in class using the [`flare.json`](../data/flare.json) dataset provided (or if you are up for the challenge create your own dataset).

- [ ] Turn this treemap into a [circle pack](https://github.com/d3/d3-hierarchy#pack) layout instead of the treemap (this will take using a different layout function, and mapping different graphical elements to data).

- [ ] Add mouseover behavior to each point, so its data updates state, and is displayed in our tooltip display. Move the tooltip to it's new position.

- [ ] Make intentional design decisions -- colors, sizes, axes, transitions, etc. should illustrate something interesting about or relevant to your data.

- [ ] Post your [deployed](#Deploy) link to the Tutorial 5 post on the Commons.

**BONUS:**

- [ ] Do all of this for your own data. For an example how to use your own (unested) dataset, you can reference the `main_advanced.js` file in the [`demo`](./demo/main_advanced.js) folder. This example takes a regular `.csv` of netflix titles and then groups them by shared properties and provides a more generalizable, though slightly more complex data mapping.

### Deploy

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the link to your deployed example as a comment to the appropriate post on the Commons. (Note: your link will look something like: `https://YOUR_USERNAME.github.io/Interactive-Data-Vis-Sp2020/TUTORIAL_PATH/`)

To receive full credit, you must post your stable path before the start of the next class.

## Resources:

[d3 hierarchy](https://github.com/d3/d3-hierarchy)

[d3 array](https://github.com/d3/d3-array#rollup)
