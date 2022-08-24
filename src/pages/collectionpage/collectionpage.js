import React from "react";
import "./collectionpage.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import selectCollectionItems from "../../redux/collection/collection-selector";
import CollectionItem from "../../components/collection-item/collection-item";

function CollectionPage({ items }) {

  const params = useParams();
  const { collectionID } = params;
  const collectionItem = items[collectionID];

  return (
    <div className="container-fluid">
      <div className="container center">
        <h1 className="collection-page-title">{collectionItem.title}</h1>
        <div className="collection-page">
          {collectionItem.items.map((ele) => {
            return <CollectionItem key={ele.id} item={ele} />;
          })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  items: selectCollectionItems,
});

export default connect(mapStateToProps)(CollectionPage);
