import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { db } from "./firebase"; 
import { ChatTemplate } from "@/types";

const COLLECTION_NAME = "chatdosen";


export const getAllTemplates = async (): Promise<ChatTemplate[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ChatTemplate[];
  } catch (error) {
    console.error("Error fetching templates:", error);
    return [];
  }
};

export const getTemplateBySlug = async (slug: string): Promise<ChatTemplate | null> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as ChatTemplate;
  } catch (error) {
    console.error("Error fetching template by slug:", error);
    return null;
  }
};


export const saveTemplate = async (template: ChatTemplate) => {
  try {
    const docId = template.id || template.slug; 
    const docRef = doc(db, COLLECTION_NAME, docId);
    
    const dataToSave = {
      ...template,
      updatedAt: Date.now(),
      createdAt: template.createdAt || Date.now() 
    };

    await setDoc(docRef, dataToSave, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving template:", error);
    throw error; 
  }
};

export const deleteTemplate = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return true;
  } catch (error) {
    console.error("Error deleting template:", error);
    return false;
  }
};