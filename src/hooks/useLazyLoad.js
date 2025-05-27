import { useEffect } from 'react';

const useLazyLoad = (callback) => {
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100) {
        callback();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [callback]);
};

export default useLazyLoad;