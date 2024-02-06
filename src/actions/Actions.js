import { db } from '../firebase/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const employeesCollectionRef = collection(db, "employees");
const categoryCollectionRef = collection(db, "category");
// -------------------------------------------------CRUD-------------------------------------------------
  // ----------EMPLOYEE----------
  export async function getEmployeeList() {
    return getDocs(employeesCollectionRef).then((result) => {
      return result.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  export async function onSubmitNewEmployee(formData) {
    return addDoc(employeesCollectionRef, formData).then(() => {
      return getEmployeeList();
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  export async function deleteEmployee(id) {
    const empDoc = doc(db, "employees", id);
    return deleteDoc(empDoc).then(() => {
      return getEmployeeList();
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  export async function updateEmployee(id, formData) {
    const empDoc = doc(db, "employees", id);
    return updateDoc(empDoc, formData).then(() => {
      return getEmployeeList();
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };
  // ----------CATEGORY----------
  export async function getCategoryList() {
    return getDocs(categoryCollectionRef).then((result) => {
        return result.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  export async function onSubmitNewCategory(formData) {
    return addDoc(categoryCollectionRef, formData).then(() => {
      return getCategoryList();
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  export async function deleteCategory(id) {
    const empDoc = doc(db, "category", id);
    return deleteDoc(empDoc).then((result) => {
      return getCategoryList();
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };

  export async function updateCategory(id, formData) {
    const empDoc = doc(db, "category", id);
    return updateDoc(empDoc, formData).then(() => {
      return getCategoryList();
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  };
  // -------------------------------------------------CRUD-------------------------------------------------