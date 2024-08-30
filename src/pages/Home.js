import Banner from '../Banner'


const Home = () => {
  return (
    <div className="homepage">
      <div className="homepage-left">
        <div className="home-title">
          Find all your favourite characters
        </div>

        <div className="home-subtitle">
          You can find out all the information about your favorite characters
        </div>

        <a className="button yellow" href="/Characters" >See more...</a>
      </div>
      <div className="svg-wrapper">
        <Banner/>
      </div>
    </div>
  );
};

export default Home;
