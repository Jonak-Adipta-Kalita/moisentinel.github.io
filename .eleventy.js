const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);
    
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<-->"
      });
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/media");

    eleventyConfig.addFilter("formatDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });     

    let markdownOptions = {
        html: true,
        breaks: true,
        linkify: true
    };
    let markdownLib = new markdownIt(markdownOptions);

    //Add div around tables
    markdownLib.renderer.rules.table_open = () => '<div class="table-wrapper">\n<table>\n',
    markdownLib.renderer.rules.table_close = () => '</table>\n</div>',

    eleventyConfig.setLibrary("md", markdownLib);

    return {
        dir: {
          input: 'src',
          includes: '_includes',
          data: '_data'
        }
    };  
};