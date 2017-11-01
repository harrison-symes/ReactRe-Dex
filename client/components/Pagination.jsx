import React from 'react'

export default function Pagination ({page, pages, changePage}) {
  return <div className="pagination is-centered">
    <div className="pagination-list">
      <div className="level">
        {page != 0 && <a className="pagination-link" onClick={() => changePage(0)}>First</a>}
        {page != 0
          ? <a className="pagination-link" onClick={() => changePage(page-1)}>Previous</a>
          : <a className="pagination-link" disabled>Previous</a>
        }
        <p className="tag is-large">{page}</p>
        {page == pages
          ? <a className="pagination-link" disabled >Next Page</a>
          : <a className="pagination-link" onClick={() => changePage(page+1)}>Next Page</a>
        }
        {page != pages && <a className="pagination-link" onClick={() => changePage(pages)}>Last</a>}
      </div>
    </div>
  </div>
}
