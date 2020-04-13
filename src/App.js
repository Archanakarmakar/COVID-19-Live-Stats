import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
//import CardColumns from 'react-bootstrap/CardColumns';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Columns from "react-columns"; 
import Form from 'react-bootstrap/Form';



function App() {

  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState(""); 
  

useEffect(() => {
  // Make a request for a user with a given ID
axios
   .all([
  axios.get("https://corona.lmao.ninja/all"),
  axios.get("https://corona.lmao.ninja/countries")
   ])
  .then(responseArr => {
    // handle success
    setLatest(responseArr[0].data);
    setResults(responseArr[1].data);
  })
  .catch(err => {
    // handle error
    console.log(err);
  });
  },[]);

const date = new Date(parseInt(latest.updated));
const lastUpadated = date.toString();
/*const lastUpadated = date.toLocaleDateString();*/

const filterCountry = results.filter(item => { 
  return searchCountry !== "" ? item.country.includes (searchCountry) : item;
})

const countries = filterCountry.map((data, i) => {
  return(
<Card
  key={i}
  bg="light"
  text="dark"
  className="text-center"
  style={{margin: "20px"}}
  >
    <Card.Img variant="top" src={data.countryInfo.flag}/>
      <Card.Body>
      <Card.Title>{data.country}</Card.Title>
      <Card.Text>Cases {data.cases}</Card.Text>
      <Card.Text>Deaths {data.deaths}</Card.Text>
      <Card.Text>Recovered {data.recovered}</Card.Text>
      <Card.Text>Today's Cases {data.todayCases}</Card.Text>
      <Card.Text>Today's death {data.todayDeaths}</Card.Text>
      <Card.Text>Active {data.active}</Card.Text>
      <Card.Text>Critical {data.critical}</Card.Text>
    </Card.Body>
    </Card>
  );
});

var queries = [{
 columns: 2,
 query: 'min-width: 500px' 
}, {
  columns: 7,
  query: 'min-width: 1000px'
}];



  return (
    <div>
      <br/>
      <h2 style={{ textAlign:"center"}}>Covid-19 Live Stats</h2>
      <br/>
        <CardDeck>
  <Card
  bg="secondary"
  text="white"
  className="text-center"
  style={{margin: "20px"}}
  >
      <Card.Body>
      <Card.Title>Number of Cases</Card.Title>
      <Card.Text style={{ fontSize:"50px"}}> 
        {latest.cases}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpadated}</small>
    </Card.Footer>
  </Card>
  <Card
    bg="danger"
    text="white"
    className="text-center"
    style={{margin: "20px"}}
  >
      <Card.Body>
      <Card.Title>Number of Deaths</Card.Title>
      <Card.Text style={{ fontSize:"50px"}}> 
      {latest.deaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpadated}</small>
    </Card.Footer>
  </Card>
  <Card
    bg="success"
    text="white"
    className="text-center"
    style={{margin: "20px"}}
  >
      <Card.Body>
      <Card.Title>Recovered Cases</Card.Title>
      <Card.Text style={{ fontSize:"50px"}}> 
      {latest.recovered}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpadated}</small>
    </Card.Footer>
  </Card>

<Card
    bg="warning"
    text="Black"
    className="text-center"
    style={{margin: "20px"}}
  >
      <Card.Body>
      <Card.Title>Affected Countries</Card.Title>
      <Card.Text style={{ fontSize:"50px"}}> 
      {latest.affectedCountries}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpadated}</small>
    </Card.Footer>
  </Card>

  <Card
    bg="info"
    text="Black"
    className="text-center"
    style={{margin: "20px"}}
  >
      <Card.Body>
      <Card.Title>Todays Death</Card.Title>
      <Card.Text style={{ fontSize:"50px"}}> 
      {latest.todayDeaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpadated}</small>
    </Card.Footer>
  </Card>


</CardDeck>
<Form>



  <Form.Group controlId="formGroupSearch">
    <Form.Control type="text" placeholder="Search a Country" onChange={e => setSearchCountry(e.target.value)} />
  </Form.Group>


</Form>
<Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
