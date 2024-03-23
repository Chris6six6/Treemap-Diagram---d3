# Tree Map Visualization Project

This project is a tree map visualization displaying hierarchical data using rectangles to represent categories and subcategories. It fulfills the requirements set forth by FreeCodeCamp's Data Visualization curriculum.

## Project Description

The tree map displays hierarchical data using nested rectangles, where each rectangle represents a category or subcategory. It includes features such as a title, description, legend, and tooltip for interactive exploration of the data.

## User Stories

1. My tree map should have a title with a corresponding id="title".
2. My tree map should have a description with a corresponding id="description".
3. My tree map should have rect elements with a corresponding class="tile" that represent the data.
4. There should be at least 2 different fill colors used for the tiles.
5. Each tile should have the properties data-name, data-category, and data-value containing their corresponding name, category, and value.
6. The area of each tile should correspond to the data-value amount: tiles with a larger data-value should have a bigger area.
7. My tree map should have a legend with corresponding id="legend".
8. My legend should have rect elements with a corresponding class="legend-item".
9. The rect elements in the legend should use at least 2 different fill colors.
10. I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
11. My tooltip should have a data-value property that corresponds to the data-value of the active area.

## Datasets

You can use any of the following datasets for this project:
- [Kickstarter Pledges](https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json)
- [Movie Sales](https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json)
- [Video Game Sales](https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json)

## Technologies Used

- HTML
- CSS
- JavaScript
- D3.js (Data-Driven Documents)

## Project Structure

The project includes HTML, CSS, and JavaScript files. The HTML file contains the structure of the webpage, including DOM elements for the visualization. The CSS file styles the webpage elements for better presentation. The JavaScript file contains the logic to fetch the dataset, process the data, and create the tree map visualization using D3.js.

## Usage

To view the tree map visualization, simply open the HTML file in a web browser.

## Acknowledgments

- [FreeCodeCamp](https://www.freecodecamp.org/) for providing the project requirements and datasets.
- D3.js community for the powerful data visualization library.
- Developers contributing to open datasets for educational purposes.
