import DOMPurify from "dompurify";

const sanitizeField = (input) =>
  DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "li", "ol"],
  });

export default sanitizeField;