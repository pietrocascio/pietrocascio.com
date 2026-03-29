module.exports = function(eleventyConfig) {
  // Tell 11ty to copy your image to the final build
  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};