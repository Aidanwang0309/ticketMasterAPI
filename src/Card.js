import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  pLeft: {
    paddingLeft: 20
  }
});

class EventCard extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card style={{ maxWidth: 400, marginTop: 50 }}>
        <Grid item style={{ maxWidth: 345 }}>
          <CardHeader
            noWrap
            title={this.props.name}
            subheader={this.props.time}
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardMedia
            style={{ paddingTop: '56.25%' }}
            image={this.props.media}
          />

          <Typography
            style={{ paddingTop: 30 }}
            gutterBottom
            className={classes.pLeft}
            component="p"
            variant="subheading"
          >
            {this.props.distance} mile from you
          </Typography>

          {(() => {
            if (this.props.price === 0) {
              return (
                <Typography
                  className={classes.pLeft}
                  gutterBottom
                  component="p"
                  variant="subheading"
                >
                  Price: not provided;
                </Typography>
              );
            } else {
              return (
                <Typography
                  className={classes.pLeft}
                  gutterBottom
                  component="p"
                  variant="subheading"
                >
                  Price: ${this.props.price.min} - ${this.props.price.max}
                </Typography>
              );
            }
          })()}

          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <Typography
              className={classes.pLeft}
              gutterBottom
              component="p"
              variant="subheading"
            >
              Location : {this.props.locationname}
            </Typography>

            <Typography
              className={classes.pLeft}
              gutterBottom
              component="p"
              variant="subheading"
            >
              Address : {this.props.locationaddress}
            </Typography>
          </Collapse>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(EventCard);
