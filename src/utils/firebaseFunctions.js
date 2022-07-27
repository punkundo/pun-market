import { collection, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore"
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

// Saving section data
export const saveSectionData = async (data, item) => {
    await setDoc(doc(firestore, "sectionData", `${Date.now()}`), data, {
        merge: true
    })
}

// get all section data
// export const getAllSectionData = async (user) => {
//     const items = await getDocs(
//         query(collection(firestore, "sectionData"), orderBy('itemId', 'desc'))
//     )

//     return items.docs.map((doc) => doc.data())
// }

export const getSectionDataFindId = async (id) => {
    console.log('id', id)
    const items = await getDocs(
        query(collection(firestore, "sectionData"))
    )

    return items.docs.map((doc) => doc.data())
}