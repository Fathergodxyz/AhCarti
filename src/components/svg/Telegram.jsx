import PropTypes from "prop-types";
const Telegram = ({ className = "" }) => {
  return (
    <div className={`relative isolate ${className}`}>

      <svg height="50" viewBox="0 0 50 50" width="50" xmlns="http://www.w3.org/2000/svg"><path d="m46.137 6.552c-.75-.636-1.928-.727-3.146-.238h-.002c-1.281.514-36.261 15.518-37.685 16.131-.259.09-2.521.934-2.288 2.814.208 1.695 2.026 2.397 2.248 2.478l8.893 3.045c.59 1.964 2.765 9.21 3.246 10.758.3.965.789 2.233 1.646 2.494.752.29 1.5.025 1.984-.355l5.437-5.043 8.777 6.845.209.125c.596.264 1.167.396 1.712.396.421 0 .825-.079 1.211-.237 1.315-.54 1.841-1.793 1.896-1.935l6.556-34.077c.4-1.82-.156-2.746-.694-3.201zm-24.137 25.448-3 8-3-10 23-17z"/></svg>
    </div>
  );
};

Telegram.propTypes = {
  className: PropTypes.string,
};

export default Telegram;
