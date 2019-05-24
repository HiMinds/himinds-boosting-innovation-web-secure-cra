import React, { useState, useEffect, } from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
  Input,
  Segment,
  Divider,
} from 'semantic-ui-react'
import axios from 'axios';

function App() {

  const HACKER_NEWS_URL = 'http://hn.algolia.com/api/v1/search?query=';
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState(HACKER_NEWS_URL + "a%2Fbtesting");
  const [url, setUrl] = useState(HACKER_NEWS_URL + "a%2Fbtesting");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const style = {
    h1: {
      marginTop: '3em',
    },
    h2: {
      margin: '4em 0em 2em',
    },
    h3: {
      marginTop: '2em',
      padding: '2em 0em',
    },
    last: {
      marginBottom: '300px',
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await axios(url);
        setData(result.data);
      }
      catch (error) {
        console.log(error);
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <div>
      <Divider horizontal>
        <Header as='h2' style={style.h1}>
          <Icon name='newspaper outline' />
          Hacker News search
      </Header>
        <Header as='h3' textAlign='center' style={style.h3} content='Search for articles that sparks your interest' />
      </Divider>
      <Segment.Group>
        <Segment>
          <Input icon='search' loading={isLoading ? true : undefined} iconPosition='left' placeholder='Search article...' onChange={event => setQuery(event.target.value)}
            onKeyPress={(event) =>
              (event.key === 'Enter') ? setUrl(HACKER_NEWS_URL + encodeURIComponent(query)) : console.log("enter not pressed")
            } />
        </Segment>
        <Segment>
          <Button onClick={() => setUrl(HACKER_NEWS_URL + encodeURIComponent(query))} > Search </Button>
        </Segment>
      </Segment.Group>
      <Container>
        <Segment.Group>
          <Segment>
            {isError && <div>Something went wrong ...</div>}
            {isLoading ? <div>loading...</div> :
              <ul>
                {data.hits.map(item => (
                  item || item.title !== "" || item.title !== null ?
                    <li key={item.objectID}> <a href={item.url} target="_blank" rel="noopener noreferrer">  {item.title} </a></li> : ""
                ))}
              </ul>
            }
          </Segment>
        </Segment.Group>
        <Divider hidden />
      <Divider hidden />

      </Container>

    </div>
  );
}
export default App;
