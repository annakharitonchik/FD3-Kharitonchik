import React from "react";
function withRainbowFrame(colors) {
  return function (Comp) {
    class withRainbowFrameComp extends React.Component {
      render() {
        let readyLayer = <Comp {...this.props} />;
        colors.forEach((color) => {
          readyLayer = (
            <div
              style={{
                border: ` solid 10px ${color}`,
                margin: `10px`,
                display: "inline-block",
              }}
            >
              {readyLayer}
            </div>
          );
        });
        return <div style={{ textAlign: "center", border:1}}>{readyLayer}</div>;
      }
    }
    return withRainbowFrameComp;
  };
}
export default withRainbowFrame;
