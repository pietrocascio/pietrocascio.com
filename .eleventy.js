module.exports = function(eleventyConfig) {
  // Tell 11ty to copy your image to the final build
  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};