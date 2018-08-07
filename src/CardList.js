import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import moment from 'moment';

class CardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      sort: '',
      lat: null,
      long: null
    };
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });

        let dateNow = moment().format('YYYY-MM-DDTHH:mm:ssZ');
        axios
          .get(
            `https://app.ticketmaster.com/discovery/v2/events.json?size=20&geoPoint=${
              this.state.lat
            },${
              this.state.long
            }&sort=distance,asc&startDateTime=${dateNow}
            &apikey=r0IzC89Utgdk69QfPEY9Gtpr0zK8drt0`
          )
          .then(res => {
            const events = res.data._embedded.events;
            console.log(events);
            this.setState({ events });
          })
          .catch(err => {
            console.log(err);
          });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    const cardComponent = this.state.events.map(event => {
      const price = typeof event.priceRanges !== 'undefined' ? event.priceRanges[0] : 0;
      const address = event._embedded.venues[0].address.line1 + event._embedded.venues[0].city.name
        + event._embedded.venues[0].state.stateCode
      return (
        <Card
          key={event.id}
          name={event.name}
          time={event.dates.start.localDate}
          distance={event.distance}
          price={price}
          locationname = {event._embedded.venues[0].name}
          locationaddress = {address}
        />
      );
    });

    return (
      <div>
        <ul>{cardComponent}</ul>
      </div>
    );
  }
}

export default CardList;
