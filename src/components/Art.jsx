import Nav from './Nav';

function Art() {
  return (
    <div>
      <Nav />
      <hr />
      <h1>Art</h1>
      <div className="artwork_container">
        <img className="titleImgContainer" src="/media/imgplaceholder.jpg" alt="Art 1" style={{ padding: '20px', margin: '10px' }} />
        <img className="titleImgContainer" src="/media/imgplaceholder.jpg" alt="Art 2" style={{ padding: '20px', margin: '10px' }} />
        <img className="titleImgContainer" src="/media/imgplaceholder.jpg" alt="Art 3" style={{ padding: '20px', margin: '10px' }} />
      </div>
      <div className="art_title_container">
        <h2 className="art_title">Title</h2>
        <h2 className="art_title">Title</h2>
        <h2 className="art_title">Title</h2>
      </div>
      <div className="artwork_container">
        <img className="titleImgContainer" src="/media/imgplaceholder.jpg" alt="Art 4" style={{ padding: '20px', margin: '10px' }} />
        <img className="titleImgContainer" src="/media/imgplaceholder.jpg" alt="Art 5" style={{ padding: '20px', margin: '10px' }} />
        <img className="titleImgContainer" src="/media/imgplaceholder.jpg" alt="Art 6" style={{ padding: '20px', margin: '10px' }} />
      </div>
      <div className="art_title_container">
        <h2 className="art_title">Title</h2>
        <h2 className="art_title">Title</h2>
        <h2 className="art_title">Title</h2>
      </div>
      <div className="artwork_container">
        <img className="titleImgContainer" src="/media/imgplaceholder.jpg" alt="Art 7" style={{ padding: '20px', margin: '10px' }} />
        <img className="titleImgContainer" src="/media/imgplaceholder.jpg" alt="Art 8" style={{ padding: '20px', margin: '10px' }} />
        <img className="titleImgContainer" src="/media/imgplaceholder.jpg" alt="Art 9" style={{ padding: '20px', margin: '10px' }} />
      </div>
      <div className="art_title_container">
        <h2 className="art_title">Title</h2>
        <h2 className="art_title">Title</h2>
        <h2 className="art_title">Title</h2>
      </div>
      <hr />
    </div>
  );
}

export default Art;