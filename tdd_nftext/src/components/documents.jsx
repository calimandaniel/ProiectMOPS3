import { useEffect, useState } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAssets } from "./../client/assets";
import "./documents.css";

function Documents() {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const res = await getAssets();

      if (!res.ok) return setError("Couldn't retrieve assets ! Try again !");

      setAssets(res.data);
      setFilteredAssets(res.data);
    })();
  }, []);

  useEffect(() => {
    if (searchQuery == "") return setFilteredAssets(assets);
    setFilteredAssets(assets.filter((asset) => asset.name.toLowerCase() === searchQuery.toLowerCase()));
  }, [searchQuery]);

  const changeHandler = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="text-white documents">
      <div className="div-title-documents">
        <p className="title-documents">Documents</p>
      </div>
      <input type="text" id="search" name="query" onChange={changeHandler} value={searchQuery} />
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="d-flex flex-row justify-content-evenly flex-wrap">
          {filteredAssets.map((asset, index) => (
            <div key={index} className="text-black">
              <CardGroup>
                <Card className="documentsCards" style={{ width: "25rem", height: "30rem" }}>
                  <Card.Header style={{ color: "grey" }}>{asset.name}</Card.Header>
                  <Card.Body bg="light">
                    <Card.Title as="h3" className="cardsTitle">
                      {asset.title}
                    </Card.Title>

                    <Card.Text className="cardsDescription">{asset.description}</Card.Text>
                    <Card.Text className="cardContent">{asset.text}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="primary"
                      className="cardsButton"
                      onClick={() => {
                        navigate("/documents/" + asset.scan_id);
                      }}
                    >
                      See more
                    </Button>
                  </Card.Footer>
                </Card>
              </CardGroup>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Documents;
