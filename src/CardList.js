import React, { Component } from 'react';
import axios from 'axios';
import EventCard from './Card';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';

class CardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      error: '',
      lat: null,
      long: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      // get the position of the client
      position => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });

        let dateNow = moment().format('YYYY-MM-DDTHH:mm:ssZ');
        // format the date as ticketmaster required
        axios
          .get(
            // format the api based on client's position to get the distance API
            `https://app.ticketmaster.com/discovery/v2/events.json?size=20&geoPoint=${
              this.state.lat
            },${this.state.long}&sort=distance,asc&startDateTime=${dateNow}
            &apikey=r0IzC89Utgdk69QfPEY9Gtpr0zK8drt0`
          )
          .then(res => {
            // get the top 20 events based on the distance asc order
            const events = res.data._embedded.events;
            console.log(events);
            this.setState({ events });
          })
          .catch(err => {
            console.log(err);
          });
      },
      error => this.setState({ error: error.message })
    );
  }

  render() {
    const cardComponent = this.state.events.map(event => {
      const price =
        typeof event.priceRanges !== 'undefined' ? event.priceRanges[0] : 0;
      //check if the price range is provided: if true then return priceRanges or pass 0 as props
      const venue = event._embedded.venues[0];
      const address =
        //for mate the address as street, city, state
        venue.address.line1 + venue.city.name + venue.state.stateCode;

      return (
        <EventCard
          style={{ marginTop: 50 }}
          key={event.id}
          name={event.name}
          time={event.dates.start.localDate}
          distance={event.distance}
          price={price}
          locationname={venue.name}
          locationaddress={address}
          media={event.images[0].url}
        />
      );
    });

    return (
      <div>
        <Grid
          container
          spacing={24}
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          {cardComponent}
        </Grid>
      </div>
    );
  }
}

export default CardList;
