const topics = require("./src/_data/topics.json");

module.exports = function(eleventyConfig) {
  // Tell 11ty to copy your image to the final build
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");

  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  });

  // Link badges for the tags that are known topics (src/_data/topics.json).
  // A shortcode rather than an include because article Markdown is pre-processed with Liquid.
  eleventyConfig.addShortcode("topicBadges", (tags) => {
    return [].concat(tags || [])
      .filter((tag) => topics[tag])
      .map((tag) => `<span class="text-gray-300">•</span>` +
        `<a href="/topics/${tag}/" class="relative z-10 inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-black transition-colors">${topics[tag].name}</a>`)
      .join("");
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};