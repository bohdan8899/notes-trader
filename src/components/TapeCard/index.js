import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PieChart, Pie, Cell, } from 'recharts';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import OfferItem from '../OfferItem';
import ActionDropdown from '../ActionDropdown';
import NoteTable from '../NoteTable';
import css from './index.module.css';

const iconButtonStyles = makeStyles(() => ({
  root: {
    color: '#3f37d7',
    padding: 0,
    marginRight: 20
  },
}));

const COLORS = ['#6d4dd1', '#aed2ff', '#74dabd', '#c9bafa', '#2075bc', '#75cbac'];
const RADIAN = Math.PI / 180;

function TapeCard({className, tape}) {
  const iconButtonClasses = iconButtonStyles();

  const chartData = Object.keys(tape.notes_breakdown).map(_key => {
    return {
      name: _key,
      value: tape.notes_breakdown[_key]
    };
  });

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {chartData[index].name}
      </text>
    );
  };

  return (
    <div className={`${css.root} ${className}`}>
      <div className={css.head}>
        <h1>Tape: {tape.name} <span className={css.idText}>(ID: {tape.tape_id})</span></h1>
        <div className={css.actions}>
          <IconButton aria-label="mail" size="small" classes={iconButtonClasses}>
            <MailOutlineIcon/>
          </IconButton>
          <IconButton aria-label="monetization" size="small" classes={iconButtonClasses}>
            <MonetizationOnOutlinedIcon/>
          </IconButton>
          <IconButton aria-label="attach-file" size="small" classes={iconButtonClasses}>
            <AttachFileOutlinedIcon/>
          </IconButton>
          <ActionDropdown />
        </div>
      </div>
      <div className={css.chartSummary}>
        <PieChart width={164} height={164}>
          <Pie
            data={chartData}
            cx={78}
            cy={78}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={74}
            dataKey="value"
          >
            {
              chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
        <div className={css.summary}>
          <div className={css.row}>
            <div className={css.summaryItem}>
              <label>Status</label>
              <span className={css.value}>{tape.status}</span>
            </div>
            <div className={css.summaryItem}>
              <label>Type</label>
              <span className={css.value}>{tape.type}</span>
            </div>
            <div className={css.summaryItem}>
              <label>Position</label>
              <span className={css.value}>{tape.position}</span>
            </div>
            <div className={css.summaryItem}>
              <label>Created</label>
              <span className={css.value}>{moment(tape.created_at).format('MM/DD/YY')}</span>
            </div>
            <div className={css.summaryItem}>
              <label>Expires</label>
              <span className={css.value}>{moment(tape.expires_at).format('MM/DD/YY')}</span>
            </div>
          </div>
          <div className={css.row}>
            <div className={css.summaryItem}>
              <label>Total UPB</label>
              <span className={css.value}>{tape.total_upb.formatted}</span>
            </div>
            <div className={css.summaryItem}>
              <label>Asking Price</label>
              <span className={css.value}>{tape.asking_price.formatted}</span>
            </div>
            <div className={css.summaryItem}>
              <label>#of Notes</label>
              <span className={css.blueValue}>{tape.note_count}</span>
            </div>
            <div className={css.summaryItem}>
              <label>Invitees</label>
              <span className={css.blueValue}>{tape.invitee_count}</span>
            </div>
            <div className={css.summaryItem}>
              <label>Offers</label>
              <span className={css.blueValue}>{tape.offers_count}</span>
            </div>
          </div>
        </div>
      </div>
      <NoteTable notes={tape.notes}/>
      <hr className={css.divider}/>
      <div className={css.offersHead}>
        <h2>Offers</h2>
        <a href="/">View Tape Details</a>
      </div>
      <div className={css.bottomRow}>
        <div className={css.offerItems}>
          <OfferItem/>
          <OfferItem/>
          <OfferItem/>
          <a href="/">More &gt;</a>
        </div>
        <a href="/">View Accepted Offer &gt;</a>
      </div>
    </div>
  );
}

TapeCard.propTypes = {
  className: PropTypes.string,
  tape: PropTypes.object.isRequired
};

export default TapeCard;