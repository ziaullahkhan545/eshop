
import { createSelector } from 'reselect';

const selectCollection = state => state.collection;

const selectCollectionItems = createSelector(
    [selectCollection],
    collection => collection.collections
)

export const collectionShopItems = createSelector(
    [selectCollection],
    collection => Object.values(collection.collections)
)

export default selectCollectionItems;