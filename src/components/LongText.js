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
    return(
      <div className={this.props.className}>
        {
          this.props.text.length < this.props.maxLength
            || this.state.showMoreClicked
              ?
                <p>
                  {this.props.text}
                </p>
              :
                <div>
                  <p>
                    {this.props.text.slice(0, this.props.maxLength)}
                  </p>

                  <p onClick={this.onClick} className="show-more">
                    Show more...
                  </p>
                </div>
      }
    </div>
    )
  }
}



export default LongText;
