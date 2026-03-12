import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";
function App() {

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      scale: 2,
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "github-profile.png";
    link.click();

  };

  const cardRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: cardRef,
  });

  const [query, setQuery] = useState("");
  //   console.log(query);
  
  const [userdata, setUserdata] = useState({});
  
  useEffect(() => {
  
    let fetchUserdata = async () => {
      let res = await fetch(`https://api.github.com/users/${query}`);
      let data = await res.json();
      console.log(data);
      setUserdata(data);
  
    };
  
    if (query) {
      fetchUserdata();
    }
  
  }, [query]);
  
  return (
  
  <div className="container mt-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <h2 className="text-center ">GitHub User Search</h2>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter GitHub username"
              id="username"
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                let name = document.getElementById("username").value;
                setQuery(name);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {userdata.login && (
        <div className="row justify-content-center ">
          <div className="col-md-6 ">
            <div className="card shadow-lg text-center p-4 card-wrapper" ref={cardRef}>
              <img
                src={userdata.avatar_url}
                alt="avatar"
                className="rounded-circle mx-auto mb-3 border"
                width="120"
              />

              <h3 className="fw-bold" id="name">
                Name:- {userdata.name}
              </h3>
              <p className="text-muted">Username:- {userdata.login}</p>

              <p>Bio:- {userdata.bio}</p>

              <div className="row text-center mt-3">
                <div className="col">
                  <h6>Repos</h6>
                  <p className="fw-bold">{userdata.public_repos}</p>
                </div>
                <div className="col">
                  <h6>Followers</h6>
                  <p className="fw-bold">{userdata.followers}</p>
                </div>
                <div className="col">
                  <h6>Following</h6>
                  <p className="fw-bold">{userdata.following}</p>
                </div>
              </div>

              <hr />

              <p>
                <strong>Company:</strong> {userdata.company || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {userdata.email || "N/A"}
              </p>
              <p>
                <strong>Joined:</strong> {userdata.created_at?.slice(0, 10)}
              </p>

              <div className="d-flex justify-content-center gap-3 mt-3">
                <a
                  href={userdata.blog}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Linkdin
                </a>

                <a
                  href={userdata.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-dark btn-sm"
                >
                  GitHub Profile
                </a>
              </div>
            </div>

            {/* <div className="text-center mt-4">
              <button className="btn btn-success px-4" onClick={handlePrint}>Download</button>
            </div> */}
            <div className="text-center mt-4 d-flex gap-3 justify-content-center">
              <button className="btn btn-success" onClick={handleDownload}>
                Download Image
              </button>

              <button className="btn btn-primary" onClick={handlePrint}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
