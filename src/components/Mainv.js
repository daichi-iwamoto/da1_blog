import React from 'react'

class LoopText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let Texts = [];
        for (let i=0; i<this.props.count; i++ ) {
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
            <div className="mainv">
                <div className="wrapper">
                    <LoopText count={20} text="Da1_blog" />
                </div>
            </div>
        )
    }
}