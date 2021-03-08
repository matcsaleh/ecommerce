import Head from 'next/head'
import Header from './components/Header'
import CardView from './components/CardView'
import { Grid } from '@material-ui/core'
import { useState, useContext } from 'react'
import { EcomerceContext } from './context/EcommerceContext'


export default function Home() {

  const [data, setData] = useState(require('../products.json'))
  const { type, searchText } = useContext(EcomerceContext);
  const sort = type === 'price' ? 'des' : 'asc'
  const sortJsonArray = require('sort-json-array');


  console.log(searchText.length)
  return (
    <div>
      <Head>
        <title>Loja de Games</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Header />
      <Grid
        container
        style={{ marginTop: '5rem' }}
        spacing={2}>
        {searchText.length > 0 ? data.map((item, i) => {
          if (item.name.toLowerCase().includes(searchText.toLowerCase()))
            return (<CardView name={item.name} price={item.price} score={item.score} image={item.image} id={item.id} key={i} />)
        })
          :
          sortJsonArray(data, `${type}`, sort).map((item, i) => {
            return (<CardView name={item.name} price={item.price} score={item.score} image={item.image} id={item.id} key={i} />)
          })}
      </Grid>
    </div>
  )
}
