import { db } from "../util/firebase";

export const getAllData = async (CollectionID) => {
  return await db.collection(CollectionID).get();
};

export const getSingleData = async (CollectionID, DocumentID) => {
  return await db.collection(CollectionID).doc(DocumentID).get();
};

export const updateData = async (CollectionID, DocumentID, NewData) => {
  return await db
    .collection(CollectionID)
    .doc(DocumentID)
    .update({
      ...NewData,
    });
};
