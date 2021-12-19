import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Index = () => {

   const [gitData, setGitData] = useState([])
   const [count, setcount] = useState(1)
   const api = `https://api.github.com/search/repositories?q=created:%3E2021-12-18&sort=stars&order=desc&page=${count}`
   const api2 = `https://api.github.com/search/repositories?q=created:%3E2021-12-18&sort=stars&order=desc&page=${count-1}`

   const getData = ()=>{
    axios.get(api)
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

            <div className='container'>
            <table class="table">
                       <thead>
                         <tr>
                           <th scope="col">#</th>
                           <th scope="col">Nom_Depot</th>
                           <th scope="col">Description</th>
                           <th scope="col">Nombre_Etoile</th>
                           <th scope='col'>Nombre_Emission</th>
                           <th scope='col'>Nom_Utilisateur</th>
                           <th scope='col'>Avartar</th>

                         </tr>
                       </thead>
                       <tbody>
                {
                   gitData.map((item, index) => {
                       return (
                       //<h1 key={index} id= {index}>{item.id} </h1>
                         <>
                         <tr key={index} id= {index}>
                           <th scope="row">{item.id}</th>
                           <td>{item.name}</td>  
                           <td>{item.description}</td>
                           <td>{item.stargazers_count}</td>
                           <td>{item.open_issues_count}</td>
                           <td>{item.owner.login}</td>
                           <td><img src={item.owner.avatar_url} alt='user' style={{width:50, height: 50, borderRadius: 40}}/></td>
                         </tr>
                         </>
                        )
                   }
                   )

                }
                 </tbody>
                     </table>
                     <button onClick={Decr} className='btn btn-secondary' style={{marginRight: 10}}>precedent</button>
                     <button onClick={getData} className='btn btn-primary'>suivant</button>
            </div>
        </>
    )
}

export default Index
