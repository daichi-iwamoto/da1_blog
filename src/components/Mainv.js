import React from 'react'

class LoopText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let Texts = [];
    for (let i = 0; i < this.props.count; i++) {
      Texts.push(<div className="text-wrapper"><p>{this.props.text}</p></div>)
    }

    return (
      <div className="wrapper">
        {Texts}
        <div className="text-wrapper placeholder">
          <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default class Mainv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  render() {
    return (
      <section className="mainv">
        <div className="rotate-box">
          <LoopText count={20} text="Da1　" />
          <LoopText count={20} text="　Blog" />
        </div>
        <div className="description">
          <h2>web fr<span>o</span>nt engineer <span>&amp;</span> Japanese <span>o</span>taku bl<span>o</span>g</h2>
          <p>
            Mainly write technical articles for web front end.<br></br>
            I can't speak english. Google Translator cheers&#x1f37b;
          </p>
        </div>
      </section>
    )
  }
}