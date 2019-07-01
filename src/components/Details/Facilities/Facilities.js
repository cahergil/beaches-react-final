import React from 'react';
import { makeStyles } from '@material-ui/core';
import SectionTitle from './Section/SectionTitle';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(50rem, 1fr))',
    gridColumnGap: '2rem',
    gridRowGap: '2rem'
  },
  sectionRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(2, min-content)',
    boxShadow: '2px 1px 5px #ccc',
    // borderRadius: '5px',
    overflow: 'hidden'
  },
  subsectionRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridColumnGap: '2rem',
    gridRowGap: '2rem',
    justifyItems: 'left',
    padding: '1rem',
    fontSize: '1.5rem'
    
  },
  label: {
    opacity: '0.87'
  },
  text: {
    opacity: '0.6'
  }
})

const Facilities = props => {
  const { beach } = props;
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <div className={classes.sectionRoot}>
        <SectionTitle name="1. Kind of beach" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Composition:</div>
          <div className={classes.text}>Composicion</div>
          <div className={classes.label}>Type of sand:</div>
          <div className={classes.text}>Tipo arena</div>
          <div className={classes.label}>Bathing conditions:</div>
          <div className={classes.text}>Condiciones bano</div>
          <div className={classes.label}>Anchoring Area:</div>
          <div className={classes.text}>Zona fondeo</div>
          <div className={classes.label}>Nudism:</div>
          <div className={classes.text}>Nudismo</div>

        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="2. Environmental aspects" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Vegetation:</div>
          <div className={classes.text}>vegetation</div>
          <div className={classes.label}>Nature reserve:</div>
          <div className={classes.text}>espacio protegido</div>
          <div className={classes.label}>Actions:</div>
          <div className={classes.text}>actuaciones</div>
          <div className={classes.label}>Blue flag:</div>
          <div className={classes.text}>blue flag</div>
         

        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="3. Nearest hospital" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Name of hospital:</div>
          <div className={classes.text}>name</div>
          <div className={classes.label}>Address:</div>
          <div className={classes.text}>address</div>
          <div className={classes.label}>Telephone:</div>
          <div className={classes.text}>phone</div>
          <div className={classes.label}>Distance to beach:</div>
          <div className={classes.text}>distance to beach</div>
        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="4. Access" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Type of access:</div>
          <div className={classes.text}>access</div>
          <div className={classes.label}>Access signage:</div>
          <div className={classes.text}>senalizacion</div>
          <div className={classes.label}>Access to disabled persons:</div>
          <div className={classes.text}>disabled</div>
          <div className={classes.label}>Coordinates:</div>
          <div className={classes.text}>coordinates</div>
          <div className={classes.label}>UTM coordinates:</div>
          <div className={classes.text}>UTM</div>

        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="5. Security" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Danger markers:</div>
          <div className={classes.text}>danger</div>
          <div className={classes.label}>Help and rescue:</div>
          <div className={classes.text}>salvamento</div>
         
        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="6. Transport" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Nearby road:</div>
          <div className={classes.text}>road</div>
          <div className={classes.label}>Bus:</div>
          <div className={classes.text}>bus</div>
          <div className={classes.label}>Parking:</div>
          <div className={classes.text}>parking</div>
         

        </div>
      </div>

      <div className={classes.sectionRoot}>
        <SectionTitle name="7. Pleasure harbour" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Harbour's name:</div>
          <div className={classes.text}>name</div>
          <div className={classes.label}>Distance to beach:</div>
          <div className={classes.text}>distance</div>
          
        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="8. Observations" />
        <div style={{display: 'grid', gridTemplateColumns: '1fr', padding: '1rem', fontSize: '1.5rem', justifyItems: 'left'}} >
          <div className={classes.text}>observacionesadfadfdsfadffadfdfdf</div>
                  
        </div>
      </div>
    </section>
  );
}

export default Facilities;