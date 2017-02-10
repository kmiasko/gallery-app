import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { changePage } from '../../actions/PaginationActions';
import './Pagination.css';

const PAGE_RANGE = 5;
const MARGINS_PAGE_DISPLAYED = 2;

const Pagination = (props) => {
  const pageCount = Math.ceil(props.itemsCount / props.perPage);
  return (
    <div className='Pagination'>
      <ReactPaginate previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={<a href="">...</a>}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={MARGINS_PAGE_DISPLAYED}
        pageRangeDisplayed={PAGE_RANGE}
        onPageChange={props.changePage}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} />
    </div>
  );
};

Pagination.propTypes = {
  perPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  perPage: parseInt(state.layout.perPage, 10),
  itemsCount: state.movies.length,
  changePage: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  changePage,
})(Pagination);
