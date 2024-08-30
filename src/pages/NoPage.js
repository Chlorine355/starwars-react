import deathstar from '../death-star.png'


const NoPage = () => {
  return (
    <div className="wrapper-404">
      <div className="centered-404">
        <h1 className="huge-404">4 4</h1>
        <img className='img-404' src={deathstar}/>
      </div>
      <a className="button green" href="/Characters">Back</a>
    </div>
  );
};

export default NoPage;
