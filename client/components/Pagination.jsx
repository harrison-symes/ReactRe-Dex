import React from 'react'

export default function Pagination ({page, pages, changePage}) {
  return <div className="pagination is-centered">
    <div className="pagination-list">
      <div className="level">
        {/* <div className="level-left is-multiline">
          {new  Array(Math.round(entries / 30)).fill(0).map((e, i) => i==page
            ? <a className="pagination-link" aria-current="page">{i}</a>
            : <a className="pagination-link">{i}</a>)
          }
        </div> */}
        <div className="level-right">
          {page != 0
            ? <a className="pagination-previous" onClick={() => changePage(-1)}>Previous</a>
            : <a className="pagination-previous" disabled>Previous</a>
          }
          <p className="tag is-large">{page}</p>
          {page == pages
            ? <a className="pagination-next" disabled >Next Page</a>
            : <a className="pagination-next" onClick={() => changePage(1)}>Next Page</a>
          }
        </div>
      </div>
    </div>
  </div>
}
