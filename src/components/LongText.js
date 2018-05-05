import React from 'react';


class LongText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreClicked: false
    }
  }

  onClick = () => {
    this.setState({ showMoreClicked: true })
  }

  render() {

    // is text length - 'Show more...' length higher than maximum length ?
    const totalLengthHigher = (this.props.text.length - 12) >= this.props.maxLength;

    if (totalLengthHigher && !this.state.showMoreClicked) {
      return (
        <div className={this.props.className}>
          <p>
            {this.props.text.slice(0, this.props.maxLength)}
          </p>

          <p onClick={this.onClick} className="show-more">
            Show more...
          </p>
        </div>
      )

    } else {
      return (
        <div className={this.props.className}>
          <p>
            {this.props.text}
          </p>
        </div>
      )
    }
  }
}


export default LongText;
