import React from 'react'
import {connect} from 'react-redux'

function Pagination ({page, pages, changePage}) {
  return <div className="pagination is-centered">
    <div className="pagination-list columns">
      <div className="level">
        {page != 0
          ? <a className="pagination-link" onClick={() => changePage(0)}>First</a>
          : <a className="pagination-link" disabled>First</a>
        }
        {page != 0
          ? <a className="pagination-link" onClick={() => changePage(page-1)}>Previous</a>
          : <a className="pagination-link" disabled>Previous</a>
        }
        <p className="tag is-large">{page}</p>
        {page == pages
          ? <a className="pagination-link" disabled >Next Page</a>
          : <a className="pagination-link" onClick={() => changePage(page+1)}>Next Page</a>
        }
        {page != pages
          ? <a className="pagination-link" onClick={() => changePage(pages)}>Last</a>
          : <a className="pagination-link" disabled>Last</a>
        }
      </div>
    </div>
  </div>
}

const mapStateToProps = ({page}) => {
  return {
    page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => dispatch({type: 'CHANGE_PAGE', page})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
