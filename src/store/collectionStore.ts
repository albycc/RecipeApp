import { ICollection } from "../models/ICollection";
import AsyncStorage from "@react-native-async-storage/async-storage";

const collectionKey = "@collections";

export const CollectionStore = {
  setCollection: async (collection: ICollection) => {
    try {
      let collections: ICollection[] = await AsyncStorage.getItem(
        collectionKey
      ).then((json) => {
        if (json !== null) return JSON.parse(json);
      });
      if (!collections) {
        collections = [];
      }

      collections.push(collection);
      await AsyncStorage.setItem(collectionKey, JSON.stringify(collections));
      return "success";
    } catch (error) {
      return error;
    }
  },
  getCollection: async (id: string): Promise<ICollection | null> => {
    const data: ICollection[] = await AsyncStorage.getItem(collectionKey).then(
      (json) => {
        if (json !== null) {
          return JSON.parse(json);
        }
      }
    );
    const collection = data.find((coll) => coll.id === id);
    return collection ?? null;
  },
  getAllCollections: async (): Promise<ICollection[]> => {
    const data: ICollection[] = await AsyncStorage.getItem(collectionKey).then(
      (json) => {
        if (json !== null) {
          return JSON.parse(json);
        } else {
          return [];
        }
      }
    );
    return data;
  },
  setRecipes: async (
    collectionId: string,
    recipeIds: string[]
  ): Promise<string> => {
    const collections: ICollection[] = await AsyncStorage.getItem(
      collectionKey
    ).then((json) => {
      if (json !== null) {
        return JSON.parse(json);
      } else {
        return [];
      }
    });
    const index = collections.findIndex(
      (collection) => collection.id === collectionId
    );
    if (index !== -1) {
      collections[index].recipes = recipeIds;
      await AsyncStorage.setItem(collectionKey, JSON.stringify(collections));
      return "success";
    } else return "fail";
  },
  editCollection: async (collectionToEdit: ICollection): Promise<string> => {
    const collections: ICollection[] = await AsyncStorage.getItem(
      collectionKey
    ).then((json) => {
      if (json !== null) {
        return JSON.parse(json);
      } else {
        return [];
      }
    });
    const index = collections.findIndex(
      (collection) => collection.id === collectionToEdit.id
    );
    if (index !== -1) {
      collections[index] = collectionToEdit;
      await AsyncStorage.setItem(collectionKey, JSON.stringify(collections));
      return "success";
    } else return "fail";
  },
};
