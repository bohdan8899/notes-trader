import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import css from './index.module.css';

const dropdownStyles = makeStyles(() => ({
  root: {
    width: 235,
    padding: '0 15px',
    borderRadius: 4,
    border: 'solid 1px #acabc9',
    background: '#f3f3f7',
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 1.75,
    color: '#acabc9',
    textTransform: 'capitalize',
  }
}));

function ActionDropdown({items, onSelect}) {
  const dropdownClasses = dropdownStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        variant="outlined"
        onClick={handleToggle}
        classes={dropdownClasses}
        endIcon={<ArrowDropDownIcon/>}
      >
        Select Action
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ width: 235, borderRadius: 7, border: 'solid 1px #acabc9', background: '#fff' }}
          >
            <div className={css.menuContainer}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  {items.map(item => <MenuItem key={item.id} onClick={(e) => {onSelect && onSelect(item); handleClose(e);}}><div>{item.text}</div></MenuItem>)}
                </MenuList>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

ActionDropdown.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
};

export default ActionDropdown;