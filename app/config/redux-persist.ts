import immutablePersistenceTransform from "../services/storage/immutable-persistence-transform"
import  AsyncStorage  from "@react-native-community/async-storage"


const REDUX_PERSIST = {
  active: true,
  reducerVersion: "3.0",
  storeConfig: {
    key: "primary",
    storage: AsyncStorage,
    timeout: 0,
    // Reducer keys that you do NOT want stored to persistence here.
    blacklist: ["startup", "nav"],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers' -> infinitered/ignite#409
    // whitelist: [],
    transforms: [immutablePersistenceTransform],
  },
}

export default REDUX_PERSIST
