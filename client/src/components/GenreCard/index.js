import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 30
  },
  pos: {
    marginBottom: 12
  }
};

class GenreCard extends React.Component {
  handleClick = () => {
    window.location = '/search?searchQuery=' + this.props.genre;
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={3}>
        <Card className={classes.card}>
          <CardActionArea onClick={this.handleClick}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom>
                {this.props.genre}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

GenreCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenreCard);