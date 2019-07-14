import React from 'react';
import { makeStyles, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import Title from './../Title';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import FlatIconLogo from '../../../assets/images/flatIcon.jpg'
import PngTreeLogo from '../../../assets/images/pngTree.jpg'


const useStyles = makeStyles({
  root: {
    backgroundColor: '#eee'
  },
  wrapper: {
    display: 'grid',
    gridTemplateRows: 'repeat(4, min-content)'
  },
  attributions: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridRowGap: '1rem',
    justifyItems: 'start',
    padding: '0 2rem'
  },
  subHeader: {
    fontSize: '1.7rem',
  },
  list: {
    width: '100%'
  },
  elements: {
    fontSize: '1.2rem'
  },
  avatar: {
    margin: '3px',
    width: '32px',
    height: '32px',
  },
})

const Attribution = props => {
  const classes = useStyles();
  const icons = [{ icon: 'Toilet', url: 'https://www.flaticon.com/free-icon/toilet_93156' }, { icon: 'Footbath', url: 'https://www.flaticon.com/free-icon/footprints_22746' }, { icon: 'Shower', url: 'https://www.flaticon.com/free-icon/beach-shower_74610' }, { icon: 'Bin', url: 'https://www.flaticon.com/free-icon/trash_98116' }, { icon: 'Cleaning service', url: 'https://www.flaticon.com/free-icon/vacuum-cleaner_291367' }, { icon: 'Tourist office', url: 'https://www.flaticon.com/free-icon/info-button_64494' }, { icon: 'Telephone', url: 'https://www.flaticon.com/free-icon/telephone-handle-silhouette_25453' }, { icon: 'Beach bar', url: 'https://www.flaticon.com/free-icon/bar_1857406' }, { icon: 'Drink stand', url: 'https://www.flaticon.com/free-icon/refreshing-cold-drink_66641' }, { icon: 'Sunbed rental', url: 'https://www.flaticon.com/free-icon/deck-chair-under-the-sun_67866' }, { icon: 'Beach umbrella rental', url: 'https://www.flaticon.com/free-icon/umbrella_1244404' }, { icon: 'Nautics rental', url: 'https://www.flaticon.com/free-icon/sailboat_785' }, { icon: 'Nautics club', url: 'https://www.flaticon.com/free-icon/boat_1034882' }, { icon: 'Diving area', url: 'https://www.flaticon.com/free-icon/diving_1653907' }, { icon: 'Surfing area', url: 'https://www.flaticon.com/free-icon/surfing_157797' }, { icon: 'Childrens area', url: 'https://www.flaticon.com/free-icon/swing_86558' }, { icon: 'Sports zone', url: 'https://www.flaticon.com/free-icon/football-player-attempting-to-kick-ball_27221' }];
  const images = [{ image: 'Background I beach details view', url: 'https://pngtree.com/freebackground/beautiful-beach-background_712637.html' }, { image: 'Background II beach details view', url:'https://pngtree.com/freebackground/seaside-summer-summer-solstice-solar-terms_912758.html'}];

  return (
    <section className={classes.root}>

      <Fade duration={600} right>
        <Title title="Attributions" color="#000" lineLength="10rem" />
      </Fade>
      <div className={classes.wrapper}>
        <div className={classes.attributions}>
          <div className={classes.subHeader}>
            <div>Images:</div>
          </div>
          <List component="nav"
            className={classes.list}
            aria-label="image list list">
            {
              images.map((imageItem, index) =>
                <React.Fragment key={index}>
                  <ListItem button component="a" href={imageItem.url} target="_blank">
                    <ListItemAvatar>
                      <Avatar src={PngTreeLogo} alt="Pngtree logo" className={classes.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={imageItem.image} secondary={imageItem.url} />
                  </ListItem>
                  {index !== images.length - 1 ? <Divider /> : null
                  }
                </React.Fragment>
              )
            }
          </List>
          <div className={classes.subHeader}>
            <div>Icons:</div>
          </div>
          <List
            component="nav"
            className={classes.list}
            aria-label="icon list">
            {
              icons.map((iconItem, index) => 
                  <React.Fragment key={index}>
                  <ListItem button component="a" href={iconItem.url} target="_blank">
                      <ListItemAvatar>
                        <Avatar src={FlatIconLogo} alt="Flat icon logo" className={classes.avatar} />
                      </ListItemAvatar>
                      <ListItemText primary={iconItem.icon} secondary={iconItem.url} />
                    </ListItem>
                    {index !== icons.length -1 ?  <Divider /> : null
                    }
                    {/*  */}
                  </React.Fragment>
              )
            }
            
          </List>
        </div>
          
      </div>
    </section>
  );
}

export default Attribution;