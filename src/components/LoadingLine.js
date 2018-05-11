import React from 'react';


const constParams = {
  height: '0.25em',
  backgroundColor: 'rgba(230, 8, 54, 0.9)',
  borderRadius: '10px'
}


class LoadingLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      marginLeft: 0,
    }
    this.loadingIntervalStarted = false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // loading
    if (!this.loadingIntervalStarted && this.props.loading) {
      let rightMove = true;

      this.loadingIntervalStarted = true;

      this.loadingInterval = setInterval(() => {

        if (this.state.width > 20) {
          // decrease width to 20%
          this.setState({ width: this.state.width - 1 });

        } else {
          if (rightMove) {
            // move line to right
            this.setState({ marginLeft: this.state.marginLeft + 1 });
            if (this.state.marginLeft === 80) {
              rightMove = false
            }
          } else {
            // move line to left
            this.setState({ marginLeft: this.state.marginLeft - 1 })
            if (this.state.marginLeft === 0) {
              rightMove = true
            }
          }
        }
      }, 12);
    }

    // data loaded (or error). give the line default position and width
    if (this.props.error || (this.loadingIntervalStarted && this.props.loaded)) {
      clearInterval(this.loadingInterval);
      this.loadingIntervalStarted = false;

      this.loadedInterval = setInterval(() => {

        // return line to default position (margin: 0)
        // and then increase width to default value (100%)
        if (this.state.marginLeft < 1) {
          if (this.state.width === 100) {
            clearInterval(this.loadedInterval);
          } else {
            this.setState({ width: this.state.width + 1 });
          }
        } else {
          this.setState({ marginLeft: this.state.marginLeft - 1 })
        }
      }, 12);
    }
  }


  render() {
    const style = {
      width: this.state.width + '%',
      marginLeft: this.state.marginLeft + '%'
    }

    return (
      <div
        style={{ ...constParams, ...style }}
      />
    )
  }
}


export default LoadingLine;
