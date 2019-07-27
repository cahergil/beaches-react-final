import React from 'react';
import { makeStyles } from '@material-ui/core';
import ReactWeather from 'react-open-weather';
// I left the module as an example of convert sass into jss
// color palette for secondary color generated with http://mcg.mbitson.com/#!?mcgpalette0=%23fabc3d
// import  './Weather.module.scss';
const useStyles = makeStyles({
  root: {
    '& .rw-main': {
      background: props => props.isBlueFlag ? 'linear-gradient(to bottom right, #0181C2, #04A7F9, #4BC4F7)' : 'linear-gradient(to bottom right, #F9AD2F,  #FABC3D,  #FCD077)',
      color: '#fff',
      width: '100%',
      height: '100%',
      display: 'flex',
      '& h2': {
        margin: '0 0 10px 0',
        fontWeight: '300',
        fontSize: 'x-large',
        letterSpacing: '2px'
      },
      '& .hr': {
        width: '100%',
        height: '0',
        borderBottom: 'solid 1px #fff',
        opacity: '0.4',
        margin: '10px 0'
      },
      '& p': {
        margin: '0'
      },
      '&.type-today':{
        borderRadius: '7px'
      },
      '&.type-5days': {
        // borderRadius: '7px 7px 0 0'
      },
      '& .rw-box-left': {
        padding: '2.5rem',
        width: '60%'
      },
      '& .rw-box-right': {
        backgroundColor: ' rgba(0,0,0,0.1)',
        borderRadius: '0 7px 7px 0',
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& i': {
          fontSize: '10rem'
        }
      },
      '& .rw-today': {
        '& .date': {
          color: props => props.isBlueFlag ? '#B5DEF4' :'#976703'
        },
        '& .current': {
          fontSize: '4.5rem',

        },
        '& .range': {
          color: props => props.isBlueFlag ? '#B5DEF4' : '#976703',
          fontSize: '1.2rem',
          margin: '0 0 5px 2px'

        },
        '& .desc': {
          color: props => props.isBlueFlag ? '#B5DEF4' : '#976703',
          fontSize: '1.6rem',
          '& i': {
            fontSize: '2rem',
            color: props => props.isBlueFlag ? '#B5DEF4' : '#976703'

          }
        },
        '& .info': {
          color: props => props.isBlueFlag ? '#B5DEF4' : '#976703',
          '& div': {
            marginBottom: '5px'
          }

        }

      }
    },
    '& .rw-box': {
      fontFamily: 'Roboto',
      fontSize: '1.3rem'
    },
    '& .rw-box-days': {
      clear: 'both',
      display: 'flex',
      borderLeft: 'solid 1px #ddd',
      borderRight: 'solid 1px #ddd',
      borderBottom: 'solid 1px #ddd',
      borderRadius: '0 0 7px 7px',
      fontSize: '1.1rem',
      backgroundColor: '#fff',
      '& .rw-day': {
        width: 'calc(100% / 4)',
        textAlign: 'center',
        margin: '10px'

      },
      '& .rw-day:not(:first-child)': {
        borderLeft: 'solid 1px #ddd'
      },
      '& .rw-date': {
        fontSize: '1.1rem',
        fontWeight: 'bold'
      },
      '& .rw-desc': {
        margin: '10px 0 10px 0',
        fontSize: '12px'
      },
      '& .rw-range': {
        fontSize: '1.1rem'
      },
      '& .rw-info': {
        marginTop: '10px',
        fontSize: '1.2rem'
      },
      '& .wicon': {
        marginTop: '15px',
        fontSize: '35px',
        color: props => props.isBlueFlag ? '#4BC4F7' : '#FABC3D'
      }
    }
  }
});

const Weather = props => {
  const { city } = props
  const classes = useStyles(props);
  // classes.root = weatherStyles;
  return (
    <div className={classes.root}>
    {/* // <div className={cl}> */}
      <ReactWeather
        forecast="5days"
        apikey="6cccf08fe6b547f0a6184407192707"
        type="city"
        city={city}
      />
    </div>
  );
}

export default Weather;