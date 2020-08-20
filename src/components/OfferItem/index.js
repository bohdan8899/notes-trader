import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import css from './index.module.css';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 14,
    borderRadius: 7,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#746df6',
  },
}))(LinearProgress);

export default function OfferItem() {

  return (
    <div className={css.root}>
      <h1>Michelle Zang</h1>
      <div className={css.value}>$4,950,000</div>
      <BorderLinearProgress variant="determinate" value={50} />
      <div className={css.status}>Accepted</div>
    </div>
  );
}
