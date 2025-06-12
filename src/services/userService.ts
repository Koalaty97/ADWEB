import User from '../models/User';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { collectionUsers, db } from '../firebase';

export async function AddUser(user: User) 
{
    await addDoc(collection(db, collectionUsers), user);
};