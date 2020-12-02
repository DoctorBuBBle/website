import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./technologyRadar.scss";

const RadarWaveContext = React.createContext();

class RadarSignal extends React.PureComponent {
  static contextType = RadarWaveContext;

  render() {
    const { radian, hypotenuse, label, title } = this.props;
    const x = this.context.x + RadarSignal.calcX(radian, hypotenuse);
    const y = this.context.y - RadarSignal.calcY(radian, hypotenuse);
    const titleComp = title === undefined ? undefined : <title>{title}</title>;

    return (
      <g
        className="technology-radar-signal"
        data-title={title}
        data-label={label}
        onClick={this.context.onSignalClick}
        onMouseEnter={this.context.onSignalMouseEnter}
        onMouseLeave={this.context.onSignalMouseLeave}
      >
        <circle cx={x} cy={y} r={this.context.signalsWidth / 2}>
          {titleComp}
        </circle>
        <text x={x} y={y} dominantBaseline="middle" textAnchor="middle">
          {label}
          {titleComp}
        </text>
      </g>
    );
  }

  static calcY(radian, hypotenuse) {
    return Math.sin(radian) * hypotenuse;
  }

  static calcX(radian, hypotenuse) {
    return Math.cos(radian) * hypotenuse;
  }

  static propTypes = {
    radian: PropTypes.number.isRequired,
    hypotenuse: PropTypes.number.isRequired,
  };
}

const getAvailableRadians = (hypotenuse, oppositeSide) => {
  const alpha = Math.asin(oppositeSide / hypotenuse);
  // Remove alpha from 1xPI Radians = 360 deg
  return Math.PI - alpha * 2;
};

const LineOfRadarSignals = ({ lineRadius, signals }) => {
  const { signalsWidth } = useContext(RadarWaveContext);
  const availableRadians = getAvailableRadians(lineRadius, signalsWidth / 4);
  const radianPerSignal = availableRadians / signals.length;

  return signals.map((signal, index) => {
    const radian =
      radianPerSignal * (index + 1) -
      radianPerSignal / 2 +
      (Math.PI - availableRadians) / 2 +
      Math.PI / 2;

    return (
      <RadarSignal
        key={radian}
        radian={radian}
        hypotenuse={lineRadius}
        label={signal.label}
        title={signal.title}
      />
    );
  });
};

const LinesOfRadarSignals = () => {
  const radarWaveContext = useContext(RadarWaveContext);
  const { r, width, signals, signalsWidth } = radarWaveContext;
  const availableWidthForSignals = width - signalsWidth;
  const numberOfSignalsLines = Math.floor(
    availableWidthForSignals / signalsWidth
  );
  const signalsPerLine = Math.round(signals.length / numberOfSignalsLines);

  return Array.from({ length: numberOfSignalsLines }).map((place, index) => {
    const indexOfFirstSignal = index * signalsPerLine;
    const indexOfLastSignal = signalsPerLine + indexOfFirstSignal + 1;
    return (
      <LineOfRadarSignals
        key={indexOfFirstSignal + "," + indexOfLastSignal}
        lineRadius={
          r - numberOfSignalsLines * availableWidthForSignals + signalsWidth / 2
        }
        signals={signals.slice(indexOfFirstSignal, indexOfLastSignal)}
      />
    );
  });
};

const RadarWave = (props) => {
  const { x, y, index, width, title } = props;
  const waveRadius = index * width;

  return (
    <g>
      <circle className="technology-radar-wave" cx={x} cy={y} r={waveRadius}>
        <title>{title}</title>
      </circle>
      <RadarWaveContext.Provider value={{ r: waveRadius, ...props }}>
        <LinesOfRadarSignals />
      </RadarWaveContext.Provider>
    </g>
  );
};

RadarWave.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  signals: PropTypes.arrayOf(PropTypes.object),
  signalsWidth: PropTypes.number.isRequired,
  radians: PropTypes.number.isRequired,
  title: PropTypes.string,
};

RadarWave.defaultProps = {
  radians: Math.PI,
  signalsWidth: 40,
};

export default function TechnologyRadar({
  technologies,
  waves,
  size,
  onSignalClick,
  onSignalMouseEnter,
  onSignalMouseLeave,
}) {
  const halfWidth = size / 2;
  const waveWidth = halfWidth / waves.length;

  return (
    <div className="technology-radar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${halfWidth} ${size}`}
      >
        <defs>
          <radialGradient id="technology-radar-circle-gradient">
            <stop offset="0.3" stopColor="#0071BB" />
            <stop offset="1" stopColor="#29AAE1" />
          </radialGradient>
        </defs>
        {waves.reverse().map((wave, index) => (
          <RadarWave
            key={wave}
            x={halfWidth}
            y={halfWidth}
            index={waves.length - index}
            width={waveWidth}
            signals={technologies.filter((tech) => tech.wave === wave)}
            title={wave}
            onSignalClick={onSignalClick}
            onSignalMouseEnter={onSignalMouseEnter}
            onSignalMouseLeave={onSignalMouseLeave}
          />
        ))}
      </svg>
    </div>
  );
}

TechnologyRadar.propTypes = {
  technologies: PropTypes.array.isRequired,
  waves: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.number,
  onSignalClick: PropTypes.func,
  onSignalMouseEnter: PropTypes.func,
  onSignalMouseLeave: PropTypes.func,
};

TechnologyRadar.defaultProps = {
  size: 1000,
};
