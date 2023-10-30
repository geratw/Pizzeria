import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton:React.FC = () => (

    <div className="pizza-block-wrapper">
      <ContentLoader
        speed={2}
        width={280}
        height={490}
        viewBox="0 0 280 490"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <circle cx="142" cy="131" r="130" />
        <rect x="0" y="270" rx="0" ry="0" width="280" height="55" />
        <rect x="2" y="336" rx="0" ry="0" width="280" height="88" />
        <rect x="116" y="440" rx="0" ry="0" width="158" height="45" />
        <rect x="66" y="162" rx="0" ry="0" width="16" height="13" />
        <rect x="5" y="447" rx="0" ry="0" width="90" height="27" />
      </ContentLoader>
    </div>

);

export default Skeleton;
