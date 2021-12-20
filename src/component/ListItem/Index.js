import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Index = () => {
  const [gitData, setGitData] = useState([])
  const [count, setcount] = useState(1)
  const api = 'https://api.github.com/search/repositories?q=created:%3E2017-11-22&sort=stars&order=desc&page='

  const getData = ()=>{
    axios.get(`${api}+${count}`)
    .then(response => {

        setGitData(response.data.items)
        setcount(count+1)

    })
    .catch(err=>console.log("Error",err))
  }

  const Decr = ()=>{
      if(count > 1) {
        axios.get(`${api}+${count-1}`)
        .then(response => {

            setGitData(response.data.items)
            setcount(count+1)

        })
        .catch(err=>console.log("Error",err))
      }
    }

  useEffect(() => {
    getData()
  }, [])


    return (
        <>
          <div className="container">

            {
              gitData.map((item, index) => {
              return(

                <div className="row" key={index} id= {index}>

                  <div className="col-1">
                    <img src={item.owner.avatar_url} alt='user' style={{width:90, height: 90}}/>
                  </div>

                  <div className="col-9">
                      <strong>{item.name}</strong>
                      <p>{item.description}</p>
                      <p>Stars: {item.stargazers_count} Issues: {item.open_issues_count} Submitted 30 days ago by {item.owner.login} </p>
                  </div>

                </div>

              )
              })
            }

          <button onClick={Decr} className='btn btn-secondary' style={{marginRight: 10}}>precedent</button>
          <button onClick={getData} className='btn btn-primary'>suivant</button>

          </div>

        </>
    )
}

export default Index
