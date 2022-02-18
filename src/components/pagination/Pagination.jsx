import React from 'react'
import "./pagination.css"

const Pagination = ({totalPages, page, changePage}) => {
    const pages = []

    for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1)
    }

    const prevPage =()=>{
        if((page-1)<1) {
            return
        }
        changePage(page-1)
    }
    const nextPage =()=>{
        if((page+1)>totalPages) {
            return
        }
        changePage(page+1)
    }
  return (
    <div className="pagination">
        <span className={page !==1 ? "pagination-arrow" : "pagination-arrow page-noactive"} onClick={prevPage}>&lt;</span>
        {pages.map(p =>
            <span 
                onClick={()=> changePage(p)}
                key={p} 
                className={page === p ? 'pagination-page page-active' :'pagination-page'}
                >{p}
            </span>
            )}
        <span className={page!==totalPages ? "pagination-arrow" : "pagination-arrow page-noactive"} onClick={nextPage}>&gt;</span>
    </div>
  )
}

export default Pagination