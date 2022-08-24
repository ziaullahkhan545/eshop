import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { collectionShopItems } from "../../redux/collection/collection-selector";
import Collection from '../collection/collection'

function CollectionPreview({ items }) {
  console.log(items)
  return (
    <>
      {items.map((element) => (
        <Collection
          key={element.id}
          title={element.title}
          items={element.items}
        />
      ))}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  items: collectionShopItems,
});

export default connect(mapStateToProps)(CollectionPreview);
