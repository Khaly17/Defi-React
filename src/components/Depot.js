import React from "react"

const dateSubmitted = (date1, date2) => {
  const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const day = 1000*60*60*24;
  return(date2utc - date1utc)/day
}

const Depot = ({item: { name, owner, description, created_at, stargazers_count, open_issues_count,  }}) => {
    const dayNumber = dateSubmitted(new Date("2017-10-22"), new Date(created_at))

    return (
      <div className="repo">
        <div className="image">
            <img src={owner.avatar_url} alt='user' style={{width:90, height: 90, border: 'solid'}}/>
        </div>
        <div className="content">
          <strong>{name}</strong>
          <p>{description}</p>
          <p>
            <span style={{border: 'solid'}}> 
                {stargazers_count}
                </span>
                <span style={{border: 'solid', marginLeft: 5, marginRight: 5}}>
                  {open_issues_count} 
                </span>
                 Submitted {dayNumber} days ago by 
                 {owner.login} 
          </p>
        </div>
      </div>
    )
}

export default Depot
