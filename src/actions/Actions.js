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
      throw new Error("Cannot fetch employee data.");
    });
  };

  export async function onSubmitNewEmployee(formData) {
    return addDoc(employeesCollectionRef, formData).then(() => {
      return getEmployeeList();
    }).catch((error) => {
      console.error('An error occurred:', error);
      throw new Error("Cannot create new a employee.");
    });
  };

  export async function deleteEmployee(id) {
    const empDoc = doc(db, "employees", id);
    return deleteDoc(empDoc).then(() => {
      return getEmployeeList();
    }).catch((error) => {
      console.error('An error occurred:', error);
      throw new Error("Cannot delete an employee.");
    });
  };

  export async function updateEmployee(id, formData) {
    const empDoc = doc(db, "employees", id);
    return updateDoc(empDoc, formData).then(() => {
      return getEmployeeList();
    }).catch((error) => {
      console.error('An error occurred:', error);
      throw new Error("Cannot update an employee.");
    });
  };
  // ----------CATEGORY----------
  export async function getCategoryList() {
    return getDocs(categoryCollectionRef).then((result) => {
        return result.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
    }).catch((error) => {
      console.error('An error occurred:', error);
      throw new Error("Cannot fetch category data.");
    });
  };

  export async function onSubmitNewCategory(formData) {
    return addDoc(categoryCollectionRef, formData).then(() => {
      return getCategoryList();
    }).catch((error) => {
      console.error('An error occurred:', error);
      throw new Error("Cannot create a new category.");
    });
  };

  export async function deleteCategory(id) {
    const empDoc = doc(db, "category", id);
    return deleteDoc(empDoc).then((result) => {
      return getCategoryList();
    }).catch((error) => {
      console.error('An error occurred:', error);
      throw new Error("Cannot delete category.");
    });
  };

  export async function updateCategory(id, formData) {
    const empDoc = doc(db, "category", id);
    return updateDoc(empDoc, formData).then(() => {
      return getCategoryList();
    }).catch((error) => {
      console.error('An error occurred:', error);
      throw new Error("Cannot update category.");
    });
  };
  // -------------------------------------------------CRUD-------------------------------------------------