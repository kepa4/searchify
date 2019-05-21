import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from 'react-reveal/Fade';
import { NavLink } from 'react-router-dom';

const styles = {
  card: {
    backgroundColor: '#0091ea'
  },
  content: {
    minWidth: 175,
    minHeight: 175
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    marginTop: 70
  },
  pos: {
    marginBottom: 12
  }
};

class GenreCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={3}>
        <Fade>
          <Card className={classes.card}>
            <NavLink
              to={'/search?searchQuery=' + this.props.genre}
              style={{ textDecoration: 'none' }}>
              <CardActionArea>
                <CardContent className={classes.content}>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom>
                    {this.props.genre.charAt(0).toUpperCase() +
                      this.props.genre.slice(1)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </NavLink>
          </Card>
        </Fade>
      </Grid>
    );
  }
}

GenreCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenreCard);