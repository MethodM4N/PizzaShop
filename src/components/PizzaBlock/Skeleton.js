import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={464}
    viewBox="0 0 280 464"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="135" cy="124" r="124" />
    <rect x="4" y="276" rx="10" ry="10" width="270" height="27" />
    <rect x="4" y="316" rx="10" ry="10" width="270" height="88" />
    <rect x="9" y="420" rx="0" ry="0" width="93" height="26" />
    <rect x="139" y="443" rx="0" ry="0" width="1" height="0" />
    <rect x="144" y="413" rx="20" ry="20" width="124" height="44" />
  </ContentLoader>
);

export default Skeleton;
