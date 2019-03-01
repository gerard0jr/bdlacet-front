import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes, results, searched, filterSubmitted = {} } = this.props;
    const { rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, results.length - page * rowsPerPage);
    const filtered = results.filter(el => filterSubmitted ?
      (filterSubmitted.distribution ? el.custom2.toLowerCase().includes(filterSubmitted.distribution.toLowerCase()) : true) &&
                (filterSubmitted.lifeForms ?  el.custom4.toLowerCase().includes(filterSubmitted.lifeForms.toLowerCase()) : true) &&
                (filterSubmitted.references ?  el.custom1.toLowerCase().includes(filterSubmitted.references.toLowerCase()) : true) &&
                (filterSubmitted.others ?  el.custom5.toLowerCase().includes(filterSubmitted.others.toLowerCase()) : true) &&
                (filterSubmitted.ambient ?  el.custom3.toLowerCase().includes(filterSubmitted.ambient.toLowerCase()) : true) &&
                (filterSubmitted.taxonomic ?  el.misc1.toLowerCase().includes(filterSubmitted.taxonomic.toLowerCase()) : true) : el)
    return (<>
    {searched ? <div className="transition-test" style={{margin:"1rem 0 3rem 0"}}>
        {results ?
            <div className="results-quantity">
                 {Object.keys(filterSubmitted).length > 0 ? results.filter(el =>
                (filterSubmitted.distribution ? el.custom2.toLowerCase().includes(filterSubmitted.distribution.toLowerCase()) : true) &&
                (filterSubmitted.lifeForms ?  el.custom4.toLowerCase().includes(filterSubmitted.lifeForms.toLowerCase()) : true) &&
                (filterSubmitted.references ?  el.custom1.toLowerCase().includes(filterSubmitted.references.toLowerCase()) : true) &&
                (filterSubmitted.others ?  el.custom5.toLowerCase().includes(filterSubmitted.others.toLowerCase()) : true) &&
                (filterSubmitted.ambient ?  el.custom3.toLowerCase().includes(filterSubmitted.ambient.toLowerCase()) : true) &&
                (filterSubmitted.taxonomic ?  el.misc1.toLowerCase().includes(filterSubmitted.taxonomic.toLowerCase()) : true)
                ).length : results.length} resultados
            </div> : ''}
        <div className={classes.tableWrapper}>
          <Table>
            <TableBody>
              {Object.keys(filterSubmitted).length > 0 ?
              results.filter(el =>
                (filterSubmitted.distribution ? el.custom2.toLowerCase().includes(filterSubmitted.distribution.toLowerCase()) : true) &&
                (filterSubmitted.lifeForms ?  el.custom4.toLowerCase().includes(filterSubmitted.lifeForms.toLowerCase()) : true) &&
                (filterSubmitted.references ?  el.custom1.toLowerCase().includes(filterSubmitted.references.toLowerCase()) : true) &&
                (filterSubmitted.others ?  el.custom5.toLowerCase().includes(filterSubmitted.others.toLowerCase()) : true) &&
                (filterSubmitted.ambient ?  el.custom3.toLowerCase().includes(filterSubmitted.ambient.toLowerCase()) : true) &&
                (filterSubmitted.taxonomic ?  el.misc1.toLowerCase().includes(filterSubmitted.taxonomic.toLowerCase()) : true)
                ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(result => (
                  <TableRow key={result.title}>
                    <ExpansionPanel className="panel-responsive">
                      <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />}>
                          <Typography><b>{result ? result.title.slice(1,-1) : ''}</b></Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails style={{backgroundColor:"#f7f7f7"}}>
                          <Typography style={{textAlign:"left"}}>
                              <p><b>Nombre de la especie:</b> {result.title.slice(1,-1)}</p> 
                              <p><b>División, Orden:</b> {result.notes.slice(1,-1)}</p> 
                              <p><b>Comentarios taxonómicos:</b> {result.misc1.slice(1,-1)}</p> 
                              <p><b>Selección:</b> {result.misc2.slice(1,-1)}</p> 
                              <p><b>Descripción:</b> {result.misc3.slice(1,-1)}</p> 
                              <p><b>Referencias:</b>{result.custom1.slice(1,-1)}</p> 
                              <p><b>Distribución, Localidades:</b> {result.custom2.slice(1,-1)}</p> 
                              <p><b>Ambientes:</b> {result.custom3.slice(1,-1)}</p> 
                              <p><b>Formas de vida:</b> {result.custom4.slice(1,-1)}</p> 
                              <p><b>Otros registros:</b> {result.custom5.slice(1,-1)}</p> 
                          </Typography>
                      </ExpansionPanelDetails>
                  </ExpansionPanel>
                  </TableRow>
                )) :
                results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(result => (
                <TableRow key={result.title}>
                  <ExpansionPanel className="panel-responsive">
                    <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />}>
                        <Typography><b>{result ? result.title.slice(1,-1) : ''}</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{backgroundColor:"#f7f7f7"}}>
                        <Typography style={{textAlign:"left"}}>
                            <p><b>Nombre de la especie:</b> {result.title.slice(1,-1)}</p> 
                            <p><b>División, Orden:</b> {result.notes.slice(1,-1)}</p> 
                            <p><b>Comentarios taxonómicos:</b> {result.misc1.slice(1,-1)}</p> 
                            <p><b>Selección:</b> {result.misc2.slice(1,-1)}</p> 
                            <p><b>Descripción:</b> {result.misc3.slice(1,-1)}</p> 
                            <p><b>Referencias:</b>{result.custom1.slice(1,-1)}</p> 
                            <p><b>Distribución, Localidades:</b> {result.custom2.slice(1,-1)}</p> 
                            <p><b>Ambientes:</b> {result.custom3.slice(1,-1)}</p> 
                            <p><b>Formas de vida:</b> {result.custom4.slice(1,-1)}</p> 
                            <p><b>Otros registros:</b> {result.custom5.slice(1,-1)}</p> 
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  className="pagination"
                  rowsPerPageOptions={[5, 10, 25]}
                  count={Object.keys(filterSubmitted).length > 0 ? filtered.length : results.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                  labelRowsPerPage="Resultados por página:"
                  labelDisplayedRows={() => 
                    `${page*rowsPerPage+1}-${Object.keys(filterSubmitted).length > 0 ? (page * rowsPerPage + parseInt(rowsPerPage) < filtered.length ? page * rowsPerPage + parseInt(rowsPerPage) : filtered.length ) : (page * rowsPerPage + parseInt(rowsPerPage) < results.length ? page * rowsPerPage + parseInt(rowsPerPage) : results.length )} de ${Object.keys(filterSubmitted).length > 0 ? filtered.length : results.length}`}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div> : ''}
    </>);
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);