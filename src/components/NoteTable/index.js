import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'note_id', disablePadding: true, label: 'Note ID' },
  { id: 'type', disablePadding: false, label: 'Type' },
  { id: 'status', disablePadding: false, label: 'Status' },
  { id: 'position', disablePadding: false, label: 'Pos' },
  { id: 'borrower', disablePadding: false, label: 'Borrower' },
  { id: 'city', disablePadding: false, label: 'City' },
  { id: 'zip', disablePadding: false, label: 'Zip' },
  { id: 'state', disablePadding: false, label: 'State' },
  { id: 'total_upb', disablePadding: false, label: 'UPB', isRight: true },
];

function NoteTableHead(props) {
  const { order, orderBy, onRequestSort, classes } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classes.tableThRow}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            className={classes.tableThCell}
            align={headCell.isRight ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

NoteTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 600,
  },
  tableThRow: {
    opacity: 0.54,
  },
  tableThCell: {
    fontSize: 8.6,
    fontFamily: 'Lato',
    border: 0,
  },
  tableCell: {
    fontSize: 10,
    fontFamily: 'Lato',
    border: 0,
    paddingTop: 10,
    paddingBottom: 10,
  }
}));

function NoteTable({notes}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('type');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={'small'}
          aria-label="tape table"
        >
          <NoteTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(notes, getComparator(order, orderBy))
              .map((row, index) => {
                const labelId = `tape-table-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.note_id}
                  >
                    <TableCell className={classes.tableCell} component="th" id={labelId} scope="row" padding="none">
                      {row.note_id}
                    </TableCell>
                    <TableCell className={classes.tableCell}>{row.type}</TableCell>
                    <TableCell className={classes.tableCell}>{row.status}</TableCell>
                    <TableCell className={classes.tableCell}>{row.position}</TableCell>
                    <TableCell className={classes.tableCell}>{row.borrower}</TableCell>
                    <TableCell className={classes.tableCell}>{row.city}</TableCell>
                    <TableCell className={classes.tableCell}>{row.zip}</TableCell>
                    <TableCell className={classes.tableCell}>{row.state}</TableCell>
                    <TableCell className={classes.tableCell} align="right">{row.total_upb.formatted}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

NoteTable.propTypes = {
  notes: PropTypes.array.isRequired
};

export default NoteTable;