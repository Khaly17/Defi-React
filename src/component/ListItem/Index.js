import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Index = () => {
   const [gitData, setGitData] = useState([])
   const [count, setcount] = useState(1)
   const api1 = `https://api.github.com/search/repositories?q=created:%3E2017-11-22&sort=stars&order=desc&page=${count}`
   const api2 = `https://api.github.com/search/repositories?q=created:%3E2017-11-22&sort=stars&order=desc&page=${count-1}`

   const getData = ()=>{
    axios.get(api1)
    .then(response => {
        console.log('response: ',response.data)
        setGitData(response.data.items)
        setcount(count+1)
    })
    .catch(err=>console.log("Error",err))
   }

   const Decr = ()=>{
      if(count > 1) {
        axios.get(api2)
        .then(response => {
            console.log('response: ',response.data)
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
                    <img src={item.owner.avatar_url} alt='user' style={{width:50, height: 50}}/>                
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

          </div>
          <button onClick={Decr} className='btn btn-secondary' style={{marginRight: 10}}>precedent</button>
          <button onClick={getData} className='btn btn-primary'>suivant</button>
        </>
    )
}

export default Index
