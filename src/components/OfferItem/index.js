import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import css from './index.module.css';

function OfferItem({offer, barColor}) {
  const BorderLinearProgress = withStyles(() => ({
    root: {
      height: 14,
      borderRadius: 7,
    },
    colorPrimary: {
      backgroundColor: '#f3f3f7',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: barColor || '#746df6',
    },
  }))(LinearProgress);

  return (
    <div className={css.root}>
      <h1>{offer.offeror}</h1>
      <div className={css.value}>{offer.total_upb.formatted}</div>
      <BorderLinearProgress variant="determinate" value={80}/>
      <div className={css.status}>{offer.status}</div>
    </div>
  );
}

OfferItem.propTypes = {
  offer: PropTypes.object.isRequired,
  barColor: PropTypes.string,
};

export default OfferItem;
