import React, { Component }from 'react';

class Card extends Component {

    render() {

        return(
            <li className='bg-light-green dib br3 pa3 ma2 dim fl w-30'>
                <h3>{ this.props.name} </h3>
                <p>Time: { this.props.time} </p>
                <p>Distance : { this.props.distance} mile </p>

                {(() => {
                    if(this.props.price === 0){
                            return (<p>Price Not Provided</p>);
                        } else {
                            return (<p>Price: ${ this.props.price.min } - ${ this.props.price.max }</p>)
                        }

                        })()}
                <p> Location : { this.props.locationname}</p>
                <p> Address :  {this.props.locationaddress} </p>
            </li>
        );
    }
}

export default Card;