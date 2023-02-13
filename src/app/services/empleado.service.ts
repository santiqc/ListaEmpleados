import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private fb: AngularFirestore) {}

  public async addEmpleado(empleado: any): Promise<any> {
    return await this.fb.collection('empleados').add(empleado);
  }

  public async getEmpleados(): Promise<[]> {
    return new Promise((resolve, reject) => {
      this.fb
        .collection('empleados', (ref) => ref.orderBy('fechaCreacion', 'desc'))
        .snapshotChanges()
        .subscribe({
          next: (data: any) => {
            const returnData: any = [];
            data.forEach((element: any) => {
              returnData.push({
                id: element.payload.doc.id,
                ...element.payload.doc.data(),
              });
            });
            resolve(returnData);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  public async deleteEmpleado(id: string): Promise<any> {
    return await this.fb.collection('empleados').doc(id).delete();
  }

  // public getEmpleado(id: string): Observable<any> {
  //   return this.fb.collection('empleado').doc(id).snapshotChanges();
  // }
  public async getEmpleado(id: string): Promise<[]> {
    return new Promise((resolve, reject) => {
      this.fb
        .collection('empleados')
        .doc(id)
        .snapshotChanges()
        .subscribe({
          next: (data: any) => {
            const returnData: any = [];
            returnData.push({
              ...data.payload.data(),
            });
            resolve(returnData);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  public async updateEmpleado(id: string, empleado: any): Promise<any> {
    return await this.fb.collection('empleados').doc(id).update(empleado);
  }
}
