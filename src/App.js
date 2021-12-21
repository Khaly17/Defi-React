import "./App.css";

import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Depot from "./components/Depot";
import Loader from "./components/Loader";
import EndMsg from "./components/EndMsg";

import NavBar from "./components/NavBar"

function App() {
  const [items, setItems] = useState([]);

  const [hasMore, sethasMore] = useState(true);

  const [page, setpage] = useState(2);

  const api = 'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page='
  
  useEffect(() => {
    const getDepot = async () => {
      const res = await fetch(`${api}+1`);
      const data = await res.json();
      setItems(data.items);
    };

    getDepot();
  }, []);

  const fetchDepot = async () => {
    const res = await fetch(`${api}+${page}`);
    const data = await res.json();
    return data.items;
  };

  const fetchData = async () => {
    const newDepots = await fetchDepot();

    setItems([...items, ...newDepots]);
    if (newDepots.length === 0 || newDepots.length < 20) {
      sethasMore(false);
    }
    setpage(page + 1);
  };
  return (
    <>
    <NavBar/>
      <InfiniteScroll
        dataLength={items.length}   
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<EndMsg />}
      >
        <div className="container flex-direction">
          {items.map((item, index) => {
              return <Depot key={index} item={item} />;
            })
          }
        </div>
      </InfiniteScroll>
    </>
  );
}

export default App;
