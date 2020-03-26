# Tutorial 5

The goals for this tutorial are:

- To explore GeoJSON data, and how geographical features on our earth translate to projected shapes on an svg.
- To understand [projections](https://github.com/d3/d3-geo#projections), in conjunction with [d3.geo-path](https://github.com/d3/d3-geo#geoPath), transforms lattitude and longitude space into pixel space.
- To grasp that d3.js svg maps are as simple as lines and circles, and can be manipulated as such, with stroke, fill, etc.
- To be exposed to the concept of something updating with every mouse movement -- the early stages of what will later become a tooltip.

## How to setup, serve, and deploy:

(Please reference previous tutorials, we assume you know how to do this already)

## Week 5 Assignment:

- [ ] Implement your own version of the map, using the us state geojson data provided in the [data folder](../data/), or another geojson of your choice.

- [ ] Using your own lat/long dataset _OR_ the provided dataset for this exercise, [`usHeatExtremes.csv`](../data/usHeatExtremes.csv) (also in the [data folder](../data/)), add points to your map. _HINT:_ since we're still in svg, we can just add circles to the map, like we've done before, but you'll need to use your `projection` to translate from (long,lat) values to (x,y) values.

- [ ] Add mouseover behavior to each point, so its data updates state, and is displayed in our tooltip display.

- [ ] Make intentional design decisions -- colors, sizes, axes, transitions, etc. should illustrate something interesting about or relevant to your data.

- [ ] Post your [deployed](#Deploy) link to the Tutorial 5 post on the Commons.

**BONUS:**

- [ ] Add another data element to your map, such as using color or radius to represent a value, [like this](https://observablehq.com/@d3/bubble-map) or [this](https://observablehq.com/@d3/non-contiguous-cartogram?collection=@d3/d3-geo).

- [ ] Implement transitions on your points, so the map begins blank, then they appear in a thoughtful way.

### Deploy

Once you've completed the assignment, use the Github workflow to deploy your work to **your fork** of the course repository. Post the link to your deployed example as a comment to the appropriate post on the Commons. (Note: your link will look something like: `https://YOUR_USERNAME.github.io/Interactive-Data-Vis-Sp2020/TUTORIAL_PATH/`)

To receive full credit, you must post your stable path before the start of the next class.

## Resources:

[d3 geo](https://github.com/d3/d3-geo)
