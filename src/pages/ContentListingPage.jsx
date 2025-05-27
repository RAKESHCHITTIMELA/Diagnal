import React, { useState, useCallback, useEffect, useRef } from 'react';
import Grid from '../components/Grid';
import SearchBar from '../components/SearchBar';
import { fetchPageData } from '../services/api';

const ContentListingPage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const pageRef = useRef(1);
  const initialLoadedRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loading || (totalCount !== null && data.length >= totalCount)) return;

    setLoading(true);
    try {
      const currentPage = pageRef.current;
      const res = await fetchPageData(currentPage);
      setData(prev => [...prev, ...res.items]);
      setTotalCount(res.total);
      pageRef.current = currentPage + 1;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loading, data.length, totalCount]);

  useEffect(() => {
    if (!initialLoadedRef.current) {
      loadMore();
      initialLoadedRef.current = true;
    }
  }, [loadMore]);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        loadMore();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadMore]);

  const filteredData = data.filter(item =>
    item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header fixed">
        <img src="https://test.create.diagnal.com/images/Back.png" alt="Back" className="icon" />
        <h1 className="title">Romantic Comedy</h1>
        <div className="search-container">
          <div className={`search-bar-inline ${showSearch ? 'visible' : ''}`}>
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
          <i
            className={`fas ${showSearch ? 'fa-times' : 'fa-search'} icon search-toggle`}
            onClick={() => {
              setShowSearch(prev => !prev);
              if (showSearch) setSearchQuery('');
            }}
          ></i>
        </div>
      </div>
      <div className='content'>
      <Grid data={filteredData} />
      {loading && <div className="loader">Loading...</div>}
      </div>
    </div>
  );
};

export default ContentListingPage;