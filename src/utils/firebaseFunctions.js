import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../components/firebase.config"

// Saving new item
export const saveItems = async (data) => {
    await setDoc(doc(firestore, "marketItems", `${Date.now()}`), data, {
        merge: true
    })
}

// get all items
export const getAllItems = async () => {
    const items = await getDocs(
        query(collection(firestore, "marketItems"), orderBy('id', 'desc'))
    )

    return items.docs.map((doc) => doc.data())
}